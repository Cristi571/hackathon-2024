import pandas as pd
import matplotlib.pyplot as plt

# Charger les données des utilisateurs depuis le fichier CSV
users_df = pd.read_csv('data_user.csv')

# Charger les données des événements utilisateur depuis le fichier CSV
user_events_df = pd.read_csv('data_userevents.csv')

# Convertir les colonnes de dates en objets datetime
users_df['createdAt'] = pd.to_datetime(users_df['createdAt'])
users_df['updatedAt'] = pd.to_datetime(users_df['updatedAt'])
user_events_df['timestamp'] = pd.to_datetime(user_events_df['timestamp'])

# Convertir les ObjectId en chaîne de caractères pour la jointure
users_df['_id'] = users_df['_id'].apply(lambda x: x.split('(')[-1].strip(')')).astype(str)

# Extraire le rôle et le nom de l'utilisateur
def extract_info(payload, key):
    try:
        return eval(payload)[key]
    except:
        return None

users_df['role'] = users_df['payload'].apply(lambda x: extract_info(x, 'role'))
users_df['name'] = users_df['payload'].apply(lambda x: extract_info(x, 'name'))

# Faire la jointure entre les deux DataFrames
merged_df = pd.merge(user_events_df, users_df, left_on='nfc_id', right_on='nfc_id', how='left')

# Afficher les résultats de la jointure
print("\nRésultats de la jointure:")
print(merged_df.head())

# Vérifier les valeurs NaN après la jointure
print("\nValeurs manquantes après la jointure:")
print(merged_df.isna().sum())

# Analyse 1: Distribution des utilisateurs par rôle
role_distribution = users_df['role'].value_counts()
print("\nDistribution des utilisateurs par rôle:")
print(role_distribution)
role_distribution.plot(kind='bar')
plt.title('Distribution des utilisateurs par rôle')
plt.xlabel('Rôle')
plt.ylabel('Nombre d\'utilisateurs')
plt.savefig('role_distribution.png')
plt.show()

# Analyse 2: Nombre de connexions par utilisateur (avec nom)
user_connection_counts = merged_df['name'].value_counts()
print("\nNombre de connexions par utilisateur:")
print(user_connection_counts)
user_connection_counts.plot(kind='bar')
plt.title('Nombre de connexions par utilisateur')
plt.xlabel('Utilisateur')
plt.ylabel('Nombre de connexions')
plt.xticks(rotation=45)
plt.savefig('user_connection_counts.png')
plt.show()

# Analyse 3: Distribution des connexions dans le temps
connection_times = user_events_df['timestamp'].dt.hour.value_counts().sort_index()
print("\nDistribution des connexions dans le temps (par heure):")
print(connection_times)
connection_times.plot(kind='bar')
plt.title('Distribution des connexions dans le temps (par heure)')
plt.xlabel('Heure de la journée')
plt.ylabel('Nombre de connexions')
plt.savefig('connection_times.png')
plt.show()

# Analyse 4: Temps moyen entre les connexions pour chaque utilisateur
merged_df['time_diff'] = merged_df.groupby('nfc_id')['timestamp'].diff()
average_time_diff = merged_df.groupby('name')['time_diff'].mean()
print("\nTemps moyen entre les connexions pour chaque utilisateur:")
print(average_time_diff)
average_time_diff.plot(kind='bar')
plt.title('Temps moyen entre les connexions pour chaque utilisateur')
plt.xlabel('Utilisateur')
plt.ylabel('Temps moyen entre connexions (en jours)')
plt.xticks(rotation=45)
plt.savefig('average_time_diff.png')
plt.show()

# Analyse supplémentaire 1: Nombre de connexions par jour
connections_per_day = user_events_df['timestamp'].dt.date.value_counts().sort_index()
print("\nNombre de connexions par jour:")
print(connections_per_day)
connections_per_day.plot(kind='bar')
plt.title('Nombre de connexions par jour')
plt.xlabel('Date')
plt.ylabel('Nombre de connexions')
plt.xticks(rotation=45)
plt.savefig('connections_per_day.png')
plt.show()

# Analyse supplémentaire 2: Nombre de connexions par mois
connections_per_month = user_events_df['timestamp'].dt.to_period('M').value_counts().sort_index()
print("\nNombre de connexions par mois:")
print(connections_per_month)
connections_per_month.plot(kind='bar')
plt.title('Nombre de connexions par mois')
plt.xlabel('Mois')
plt.ylabel('Nombre de connexions')
plt.xticks(rotation=45)
plt.savefig('connections_per_month.png')
plt.show()
