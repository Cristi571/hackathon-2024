import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import os

# Définir le dossier de sauvegarde des images
output_dir = "output_images"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Charger les données des utilisateurs depuis le fichier CSV
users_df = pd.read_csv('data_user.csv')

# Charger les données des connexions utilisateur depuis le fichier CSV
user_connections_df = pd.read_csv('data_connections.csv')

# Convertir les colonnes de dates en objets datetime
users_df['createdAt'] = pd.to_datetime(users_df['createdAt'])
users_df['updatedAt'] = pd.to_datetime(users_df['updatedAt'])
user_connections_df['connectedAt'] = pd.to_datetime(user_connections_df['connectedAt'])

# Convertir les ObjectId en chaîne de caractères pour la jointure
users_df['_id'] = users_df['_id'].apply(lambda x: x.split('(')[-1].strip(')')).astype(str)
user_connections_df['user'] = user_connections_df['user'].apply(lambda x: x.split('(')[-1].strip(')')).astype(str)

# Afficher les premières lignes des DataFrames pour vérifier les formats
print("Premières lignes de users_df:")
print(users_df.head())

print("\nPremières lignes de user_connections_df:")
print(user_connections_df.head())

# Faire la jointure entre les deux DataFrames
merged_df = pd.merge(user_connections_df, users_df, left_on='user', right_on='_id', how='left')

# Afficher les résultats de la jointure
print("\nRésultats de la jointure:")
print(merged_df.head())

# Vérifier les valeurs NaN après la jointure
print("\nValeurs manquantes après la jointure:")
print(merged_df.isna().sum())

# Fonction pour extraire des informations spécifiques du payload
def extract_info(payload, key):
    try:
        return eval(payload)[key]
    except:
        return None

# Extraire le rôle et le nom de l'utilisateur
merged_df['role'] = merged_df['payload'].apply(lambda x: extract_info(x, 'role'))
merged_df['name'] = merged_df['payload'].apply(lambda x: extract_info(x, 'name'))

# Analyse 1: Distribution des utilisateurs par rôle
role_distribution = merged_df['role'].value_counts()
print("\nDistribution des utilisateurs par rôle:")
print(role_distribution)

plt.figure(figsize=(10, 6))
role_distribution.plot(kind='bar')
plt.title('Distribution des utilisateurs par rôle')
plt.xlabel('Rôle')
plt.ylabel('Nombre d\'utilisateurs')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'role_distribution.png'))
plt.show()

# Analyse 2: Nombre de connexions par utilisateur (avec nom)
user_connection_counts = merged_df.groupby('name')['nfc_id'].count()
print("\nNombre de connexions par utilisateur:")
print(user_connection_counts)

plt.figure(figsize=(10, 6))
user_connection_counts.plot(kind='bar')
plt.title('Nombre de connexions par utilisateur')
plt.xlabel('Utilisateur')
plt.ylabel('Nombre de connexions')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'user_connection_counts.png'))
plt.show()

# Analyse 3: Distribution des connexions dans le temps
connection_times = merged_df['connectedAt'].dt.hour.value_counts().sort_index()
print("\nDistribution des connexions dans le temps (par heure):")
print(connection_times)

plt.figure(figsize=(10, 6))
connection_times.plot(kind='bar')
plt.title('Distribution des connexions dans le temps (par heure)')
plt.xlabel('Heure')
plt.ylabel('Nombre de connexions')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'connection_times.png'))
plt.show()

# Analyse 4: Temps moyen entre les connexions pour chaque utilisateur
merged_df['time_diff'] = merged_df.groupby('user')['connectedAt'].diff()
average_time_diff = merged_df.groupby('name')['time_diff'].mean()
print("\nTemps moyen entre les connexions pour chaque utilisateur:")
print(average_time_diff)

plt.figure(figsize=(10, 6))
average_time_diff.plot(kind='bar')
plt.title('Temps moyen entre les connexions pour chaque utilisateur')
plt.xlabel('Utilisateur')
plt.ylabel('Temps moyen entre connexions (en jours)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'average_time_diff.png'))
plt.show()

# Analyse supplémentaire 1: Nombre de connexions par jour
connections_per_day = merged_df['connectedAt'].dt.date.value_counts().sort_index()
print("\nNombre de connexions par jour:")
print(connections_per_day)

plt.figure(figsize=(10, 6))
connections_per_day.plot(kind='line')
plt.title('Nombre de connexions par jour')
plt.xlabel('Date')
plt.ylabel('Nombre de connexions')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'connections_per_day.png'))
plt.show()

# Analyse supplémentaire 2: Nombre de connexions par mois
connections_per_month = merged_df['connectedAt'].dt.to_period('M').value_counts().sort_index()
print("\nNombre de connexions par mois:")
print(connections_per_month)

plt.figure(figsize=(10, 6))
connections_per_month.plot(kind='bar')
plt.title('Nombre de connexions par mois')
plt.xlabel('Mois')
plt.ylabel('Nombre de connexions')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'connections_per_month.png'))
plt.show()
