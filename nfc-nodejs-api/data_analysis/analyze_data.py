import pandas as pd

# Lire les données de MongoDB exportées dans un fichier CSV
data = pd.read_csv('data_user.csv')

# Analyser les données
print(data.describe())

# Afficher les premières lignes du fichier CSV
print(data.head())