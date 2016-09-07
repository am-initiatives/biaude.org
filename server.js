// NODE_MODULES
// =================================

import 'babel-polyfill'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import favicon from 'serve-favicon'
import passport from 'passport'
import logger from 'morgan'
import mongoose from 'mongoose'
import Local from 'passport-local'
import session from 'express-session'
import cookieSession from 'cookie-session'
import connectMongo from 'connect-mongo'
import methodOverride from 'method-override'

// APP MODULES AND CONFIGURATION
// =============================

import { DATABASE } from 'config'
import { Models } from 'models'
import { router } from 'routes'
import { ErrorHandler } from 'services'

// SERVER CLASS
// ============

class Server {
  static booststrap () {
    return new Server()
  }
  constructor () {
    this.init()
    this.configServer()
    this.connectDatabase()
    this.routes()
    this.start()
  }

  // CONFIGURATION DE L'ENVIRONNEMENT NODE ET INITIALISATION DE L'APPLICATION
  // ========================================================================
  init () {
    this.app = express()
  }

  // CONFIGURATION DE L'APPLICATION EXPRESS
  // ======================================
  configServer () {
    let MongoStore = connectMongo(session)
    this.app.disable('x-powered-by')
    this.app.set('views', './public/sites')
    this.app.set('view engine', 'jade')
    this.app.set('trust proxy', 1)
    this.app.use(cookieSession({ name: 'session', secret: DATABASE.SECRET }))
    this.app.use(logger('dev'))
    this.app.use(methodOverride())
    this.app.use(ErrorHandler.logErrors)
    this.app.use(ErrorHandler.clientErrorHandler)
    this.app.use(ErrorHandler.errorHandler)
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.use(favicon('./public/favicon.ico'))
    this.app.use(session({
      secret: DATABASE.SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    }))
  }

  // CONNEXION A LA BASE DE DONNÉES
  // ==============================
  connectDatabase () {
    let LocalStrategy = Local.Strategy
    mongoose.Promise = global.Promise
    mongoose.connect(DATABASE.URL, function (err) {
      if (err) { console.log(err) }
    })
    passport.use(new LocalStrategy(Models.Account.authenticate()))
    passport.serializeUser(Models.Account.serializeUser())
    passport.deserializeUser(Models.Account.deserializeUser())
  }

  // ACTIVATION DES ROUTES DE L'APPLICATION
  // ======================================
  routes () {
    this.app.use('/', router)

    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      var err = new Error('Not Found')
      err.status = 404
      next(err)
    })

    // development error handler
    // will print stacktrace
    if (this.app.get('env') === 'development') {
      this.app.use(function (err, req, res, next) {
        res.status(err.status || 500)
        res.render('error/app/', {
          message: err.message,
          error: err,
          status: err.status
        })
      })
    }

    // production error handler
    // no stacktraces leaked to user
    this.app.use(function (err, req, res, next) {
      console.log(err)
      res.status(err.status || 500)
      res.render('error/app/', {
        message: err.message,
        error: {}
      })
    })
  }

  // DÉMARRAGE L'APPLICATION
  // =======================
  start () {
    let port = process.env.PORT || 8080
    this.app.listen(port, 'localhost', function () {
      console.log('Serveur démarré sur le port ' + port)
    })
  }
}

Server.booststrap()
