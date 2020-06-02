# projet_dev_b2_front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Instructions Utilisateurs
Un utilisateur peut créer un compte ou se connecter avec les pages **Login/Register**.
Une fois connecté tout les utilisateurs peuvent se déconnecter avec le bouton **Logout** disponible dans le menu déroulant gauche.

Lorsqu'un utilisateur est connecté il a accès à plusieurs pages,
* La page d'**accueil** qui affiche les 4 premiers restaurants de la BDD, le but serait de mettre les restaurants du moment les plus populaires. Cette page est disponible même pour un utilisateur non authentifié mais n'affichera pas les restaurants.
* Une page de **profil** où il peut modifer ses informations personnelles ainsi que sa monnaie fictive. Cette page dispose aussi de l'historique des commandes de l'utilisateur. Cette page est accessible dans le menu déroulant en cliquant sur l'image de l'utilisateur dans la navbar
* Une page de liste de **plats** qui est une page plûtot expérimentale qui regroupe les 30 premiers plats enregistrées dans la base. Le but aurait été d'avoir une page proposant des plats populaires ou susceptibles d'interessé l'utilisateur via ses préférences.
* Une page de liste des **restaurants** qui est la page principale de l'application, elle regroupe tout les restaurants enregistrés dans la BDD. En cliquant sur le bouton **Visit**, l'utilisateur arrivera alors sur la page du restaurant avec ses plats et menu qu'il pourra trier et commander.
* La page **Checkout** accessible après que l'utilisateur ait rempli son panier, cette page réaffiche simplement le panier et permet à l'utilisateur de valider la commande.
* La page des **favoris** recensant les plats que l'utilisateurs a aimé disponible dans le menu déroulant sous l'image de profil de l'utilisateur. (un plat est aimé lorsque l'utilisateur clique sur l'icone en forme de coeur)

### Instructions Restaurateur

Un restaurateur doit créer son restaurant à la création de son compte (les informations son modifiables par la suite)

Le restaurateur à accès à la page d'administration de son restaurant ou il pourra
* Modifier les informations du restaurant
* Consulter le feedback utilisateur
* Consulter les commandes passées dans le restaurant, les valider ou abandonner
* Créer/modifier/supprimer des plats et menus

### Instructions Restaurateur

L'administrateur ne peut créer un compte que avec un autre compte administrateur

Après sa connexion,l'administrateur est redirigé vers un dashboard où il peut consulter le profit que l'application a généré (la somme des frais de livraison), le nombre de restaurants inscrits dans le site ainsi que d'autres informations sur les commandes comme le nombre de commandes en cours ou abandonnées.

Un administrateur à accès au **CRUD des restaurants** où il peut aussi accéder à la page d'administration des restaurants et effectuer les mêmes modification que le restaurateur.
Il à aussi accès au **CRUD des commandes et du feedback**
Enfin, il à accès au **CRUD des utilisateur**. Chaque utilisateur aura comme mot de passe par défaut à sa création : 'motdepasses'.
C'est ici qu'un autre administrateur peut-être créé.
Comme pour le CRUD des restaurants, l'administrateur peut accéder au profil de l'utilisateur pour modifer ses informations et consulter ses commandes.

### Comptes utiles
compte restaurateur : 
email : resto@resto.resto
mot de passe : restaurant

compte utilisateur : 
email : client@client.client
mot de passe : motdepasses

compte administrateur :
email : admin@admin.admin
mot de passe : motdepasses
