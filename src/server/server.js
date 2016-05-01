import express from 'express'
import path from 'path'

let installWebHot = (app, config, wconfig) => {

  let webpack = require('webpack')
  let webpackDevMiddleware = require('webpack-dev-middleware')
  let morgan = require('morgan')
  let whm = require('webpack-hot-middleware')

  let compiler = webpack(wconfig)

  // A middleware logger
  app.use(morgan('short'))

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: WebpackConfig.output.publicPath,
    hot: true
  }))

  app.use(whm(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))

  app.use(
    '/static',
    express.static(path.join(config.rootPath, config.static.path))
  )

  return app
}

export default function (config) {
  let indexPath = 'index.html'
  if(!config.rootPath) {
    throw Error('The config value rootPath is required!!!')
  }

  config.staticPath = config.staticPath || 'static'
  config.isDevelopment = (process.env.NODE_ENV !== 'production')
  config.compress = config.compress = true
  config.static = config.static || {
    path: 'static',
    maxAge: 3600000 * 24 * 28 // four weeks
  }

  let app = express()

  let ctx = {
    listen: function (port) {
      return app.listen(
        port || process.env.PORT || 8080,
        function onListen (err) {
          if (err) console.log(err)
        }
      )
    },
    use: function (...args) {
      return app.use(...args)
    },
    get: function (...args) {
      return app.get(...args)
    }
  }

  if (config.isDevelopment) {
    installWebHot(app, config, {})
  } else {
    if (config.compression) {
      let compression = require('compression')
      app.use(compression())
      app.use(
        '/static',
        express.static(
          path.join(config.rootPath, config.static.path),
          {maxAge: config.static.maxAge})
      )
    }
  }

  app.get('/', function root (req, res) {
    res.sendFile(config.static.index, {root: config.rootPath})
  })

  app.get('*', function rootAnything (req, res) {
    res.sendFile(indexPath, {root: config.rootPath})
  })

  return ctx
}

// var root_path = path.join(__dirname, 'build')
// var static_path = path.join(root_path, 'static')
// var indexPath = 'index.html'


// if (isDevelopment) {
//   var WebpackConfig = require('./webpack/dev.config')
//   var compiler = webpack(WebpackConfig)
//   var webpackDevMiddleware = require('webpack-dev-middleware')
//   root_path = path.join(__dirname, 'dist')
//   static_path = path.join(root_path, 'static')

//   // A middleware logger
//   app.use(require('morgan')('short'))

//   app.use(webpackDevMiddleware(compiler, {
//     noInfo: true,
//     publicPath: WebpackConfig.output.publicPath,
//     hot: true
//   }))

//   app.use(require('webpack-hot-middleware')(compiler, {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000
//   }))

//   app.use('/static', express.static(static_path))
// } else {
//   var compression = require('compression')
//   var oneHour = 3600000
//   var oneDay = oneHour * 24
//   var oneWeek = oneDay * 7

//   app.use(compression())
//   app.use('/static', express.static(static_path, {maxAge: oneWeek}))
// }

// // app.use(bodyParser.json())
// // app.use(bodyParser.urlencoded({extended: true}))

// app.get('/', function root (req, res) {
//   res.sendFile(indexPath, {root: root_path})
// })

// app.get('*', function rootAnything (req, res) {
//   res.sendFile(indexPath, {root: root_path})
// })

// // var server = app.listen(port, function onListen (err) {
// //   if (err) console.log(err)

// //   var host = server.address().address
// //   var port = server.address().port
// //   console.log('Example app listening at http://%s:%s, Ctrl+C to stop', host, port)
// // })

