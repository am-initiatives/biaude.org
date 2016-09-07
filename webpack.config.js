'use strict'
let nodeExternals = require('webpack-node-externals')
let webpack = require('webpack')
let path = require('path')

module.exports = {
  entry: './server.js',
  output: {
    path: './',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      'config$': path.join(__dirname, '/config'),
      'api$': path.join(__dirname, '/api'),
      'routes$': path.join(__dirname, '/routes'),
      'services$': path.join(__dirname, '/services'),
      'models$': path.join(__dirname, '/models')
    }
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
