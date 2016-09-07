import express from 'express'
import { Api } from 'api'

export let router = express.Router()
router.use('/', express.static('app'))

/** L'API */
Api(router)

/** Erreur 404 */
router.use(require('./routes/error404.route.js'))
