# Plan de Réponse aux Incidents pour les Violations de Données

## 1. Préparation et Prévention
### 1.1. Formation et Sensibilisation :
- Former le personnel aux meilleures pratiques de sécurité.
- Sensibiliser aux risques liés aux données et à la technologie NFC.

### 1.2. Sécurité des Applications :
- Implémenter des contrôles de sécurité dans le code (validation des entrées, protections contre les injections SQL/NoSQL).
- Utiliser HTTPS pour toutes les communications.
- S'assurer que les jetons d'authentification sont sécurisés avec des JWT et une expiration appropriée.

## 2. Infrastructure Sécurisée
- Configurer les pare-feu et les contrôles d'accès.
- Assurer des sauvegardes régulières et sécurisées des bases de données.

## 3. Identification
### 3.1. Détection des Incidents :
- Utiliser des outils de monitoring pour surveiller les logs des applications et des bases de données.
- Mettre en place des alertes en cas de comportement anormal (tentatives de connexion échouées répétées, accès non autorisés).

### 3.2. Évaluation des Incidents :
- Définir des critères pour évaluer la gravité d'un incident (type de données concernées, volume de données compromis).
- Avoir une équipe dédiée à l'évaluation des incidents de sécurité.

## 4. Confinement
### 4.1. Confinement à Court Terme :
- Isoler les systèmes compromis pour empêcher la propagation de l'attaque.
- Révoquer les accès des utilisateurs compromis.

### 4.2. Confinement à Long Terme :
- Mettre en place des correctifs pour les vulnérabilités identifiées.

## 5. Éradication
### 5.1. Élimination de la Menace :
- Identifier et supprimer les logiciels malveillants ou les comptes compromis.

## 6. Récupération
### 6.1. Restauration des Systèmes :
- Restaurer les systèmes à partir de sauvegardes sécurisées.
- Vérifier l'intégrité des données restaurées.

### 6.2. Surveillance Accrue :
- Mettre en place une surveillance renforcée des systèmes restaurés pour détecter toute activité suspecte.

## 7. Communication
### 7.1. Notification des Parties Prenantes :
- Informer les utilisateurs affectés par la violation de données.
- Respecter les obligations légales de notification (RGPD, par exemple).

### 7.2. Communication Interne :
- Tenir informée l'équipe de direction et les départements concernés de l'évolution de la situation.

## 8. Révision et Amélioration
### 8.1. Post-Incident Review :
- Organiser une réunion post-mortem pour discuter de l'incident et des réponses apportées.
- Identifier les domaines à améliorer et mettre à jour les procédures en conséquence.

### 8.2. Mise à Jour des Politiques de Sécurité :
- Réviser et mettre à jour les politiques et les procédures de sécurité en fonction des leçons apprises.
- Planifier des formations supplémentaires pour le personnel si nécessaire.

## Conclusion
Ce plan doit être testé régulièrement à travers des exercices simulés pour s'assurer de son efficacité. Les équipes doivent être bien informées de leurs rôles et responsabilités en cas d'incident. La sécurité est un processus continu qui nécessite une vigilance constante pour protéger les données des utilisateurs et maintenir l'intégrité du système.

# Rapport de Cybersécurité sur le Projet NFC

La technologie NFC (Near Field Communication) permet à des appareils compatibles de communiquer sans fil lorsqu'ils sont très proches, généralement à moins de 4 cm. Elle fonctionne à une fréquence de 13,56 MHz et est souvent utilisée pour les paiements sans contact, le partage de fichiers et les cartes d'accès.

On notera également que, dans les projets comportant une base de données, des failles telles que les injections XSS et les injections SQL sont souvent présentes. Pour y remédier, il est possible d'appliquer des filtres et de transformer certaines commandes ou caractères spécifiques en caractères vides. Cela permet d'éviter les injections et d'empêcher l'exécution de code malveillant.

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
- L'élimination des mots de passe réduit les risques de réutilisation et de vol de ces derniers, rendant
