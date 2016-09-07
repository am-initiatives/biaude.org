[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Biaude.org
Nouvelle version du site Biaude.org, qui a pour objectif de mettre à disposition de la communauté les plus beaux zaloeils de dos (ou zados, selon les TBK)


## Build de l'application

```js
npm run build
```

## Configuration de la base de données

à venir !

## Démarrage de l'application dans l'environnement de développement

Démarrer la base de données au préalable
```js
mongod --auth
```

```js
npm start
```

## Contraintes techniques et architecturales
- environnement fullstack JS (MEAN) avec Angular2
- authentification via compte Gadz.org
- construction d'une API RESTful documentée
- JavaScript de qualité, standardisé (StandardJS) et ES6-compliant (via Babel)
- Bundling via Webpack
- Fournir les tests unitaires et bout-à-bout pour les différentes fonctionnalités proposées par l'outil

## Objectifs fonctionnels
Permettre à tous les PG de pouvoir consulter les zaloeils de dos de leur tabagn's, mais aussi d'ajouter le leur afin d'enrichir la base de données.

## Roadmap

v0.1.0
- Module d'authentification
- Module de recherche basique

v0.2.0
- Module d'import de nouveau zaloeils
- Module de notation des zaoleils/suivi de popularité

v1.0.0
- Fonctionnalités complètes d'affichage et de recherche
- Gestion des administrateurs

## Déploiement sur Debian

Image Docker en cours de construction, contiendra NodeJS, Git, MongoDB, Nginx + Configuration
