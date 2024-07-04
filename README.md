# Rapport de Cybersécurité sur le Projet NFC

La technologie NFC (Near Field Communication) permet à des appareils compatibles de communiquer sans fil lorsqu'ils sont très proches, généralement à moins de 4 cm. Elle fonctionne à une fréquence de 13,56 MHz et est souvent utilisée pour les paiements sans contact, le partage de fichiers et les cartes d'accès.

## Modèle de Menace et Évaluation des Vulnérabilités NFC

### Étape 1: Identification des Composants

- **Application mobile** (React Native)
- **Serveur backend** (Node.js)
- **Communication NFC**
- **Base de données** (MongoDB)
- **API de communication** entre l'application et le serveur

### Étape 2: Identification des Menaces et Recommandations

#### Usurpation d'identité

- **Menace**: Un utilisateur malveillant pourrait usurper l'identité d'un autre utilisateur en volant ou clonant un badge NFC.
- **Impact**: Accès non autorisé aux informations personnelles ou sensibles.
- **Priorité**: Haute
- **Recommandation**: Utiliser une authentification forte, comme des certificats ou implémenter la MFA.

#### Altération des données

- **Menace**: Un attaquant pourrait modifier les données échangées entre l'application mobile et le serveur, ou directement altérer les données stockées dans MongoDB.
- **Impact**: Informations corrompues, affichage d'informations incorrectes.
- **Priorité**: Haute
- **Recommandation**: Utiliser HTTPS/TLS pour chiffrer les communications entre l'application mobile et le serveur.

#### Dénégation

- **Menace**: Un utilisateur pourrait nier avoir effectué une action, telle que le scan d'un badge, ou une modification de données dans MongoDB, ce qui rend difficile le traçage des actions.
- **Impact**: Manque de responsabilité, impossibilité d'auditer les actions.
- **Priorité**: Moyenne
- **Recommandation**: Activer la journalisation de MongoDB et conserver des logs d'audit.

#### Divulgation d'informations

- **Menace**: Les données sensibles pourraient être interceptées pendant la communication entre l'application et le serveur, ou être accédées directement dans MongoDB sans autorisation appropriée.
- **Impact**: Compromission des informations personnelles.
- **Priorité**: Haute
- **Recommandation**: Chiffrer les données sensibles avant de les envoyer sur le réseau.
  - **Contre-mesure pour MongoDB**: Configurer MongoDB pour utiliser SSL/TLS pour les connexions et s'assurer que les données sont chiffrées au repos.

#### Élévation des privilèges

- **Menace**: Un attaquant pourrait obtenir des privilèges plus élevés qu'il ne devrait avoir, par exemple en exploitant une vulnérabilité dans l'application, le serveur, ou MongoDB.
- **Impact**: Accès non autorisé à des fonctionnalités ou des données sensibles.
- **Priorité**: Haute
- **Recommandation**: Mettre en place des contrôles d'accès stricts et une gestion rigoureuse des permissions.

## Évaluation des Vulnérabilités sur le Protocole NFC

### Écoute des informations contenues sur la carte

- **Menace**: Écoute des informations contenues sur la carte à l’aide d’un appareil à proximité (dans un rayon de 10 centimètres à 1 mètre).
- **Impact**: Possibilité de lire les informations sur la carte.
- **Priorité**: Haute
- **Recommandation**: Utiliser un chiffrement fort pour les communications NFC et des techniques de brouillage pour réduire la possibilité d’écoute clandestine.

### Clonage de la carte magnétique

- **Menace**: Possibilité de cloner la carte avec ces informations et de l’utiliser comme l’original.
- **Impact**: Accès non autorisé aux systèmes protégés par la carte clonée.
- **Priorité**: Haute
- **Recommandation**: Intégrer des mécanismes de détection de clonage et de vérification d’authenticité dans les cartes et les lecteurs NFC.

### NFC Injection

- **Menace**: Injecter des commandes dans la communication NFC pour exécuter du code malveillant.
- **Impact**: Compromission du système hôte, accès non autorisé, exécution de code arbitraire.
- **Priorité**: Haute
- **Recommandation**: Mettre en œuvre des validations strictes et des contrôles de sécurité pour toutes les communications NFC afin de prévenir les injections de commandes.

## Pertinence du Problème

La solution proposée aborde un problème majeur dans le domaine de la sécurité et de l'authentification des utilisateurs. Avec l'augmentation des cyberattaques et des violations de données, les méthodes classiques de mot de passe deviennent de plus en plus vulnérables. Les utilisateurs sont souvent exposés à des risques de phishing, de keylogger et de réutilisation des mots de passe. En intégrant une solution d'authentification sans mot de passe basée sur la technologie NFC, cette proposition vise à renforcer la sécurité des processus d'authentification en éliminant les failles associées aux mots de passe.

## Impact Potentiel

L'impact potentiel de cette solution est significatif :

### Sécurité Accrue

- L'authentification par NFC réduit les risques de piratage puisque les données d'identification sont stockées sur une carte NFC et sont transmises de manière chiffrée.
- L'élimination des mots de passe réduit les risques de réutilisation et de vol de ces derniers, rendant les comptes utilisateurs moins vulnérables.

### Facilité d'Utilisation

- L'expérience utilisateur est simplifiée grâce à l'utilisation d'une carte NFC, permettant un accès rapide et intuitif sans besoin de mémoriser des mots de passe complexes.
- La compatibilité avec les appareils mobiles iOS et Android facilite l'adoption de la technologie par un large public.

### Productivité et Efficacité

- Les utilisateurs peuvent accéder plus rapidement et plus facilement aux applications, améliorant ainsi la productivité et réduisant les temps d'arrêt liés aux problèmes de connexion.
- Les administrateurs systèmes bénéficient d'une gestion simplifiée des utilisateurs et d'une réduction des demandes de réinitialisation de mots de passe.

### Conformité et Gestion des Risques

- Cette solution aide les entreprises à se conformer aux réglementations de sécurité et de protection des données en vigueur, telles que le RGPD en Europe.
- Réduction des risques liés à la gestion des mots de passe, facilitant l'audit et le contrôle des accès.

En conclusion, cette solution d'authentification sans mot de passe basée sur la technologie NFC offre des avantages significatifs en termes de sécurité, d'expérience utilisateur et d'efficacité opérationnelle, tout en répondant aux défis actuels de la cybersécurité.

