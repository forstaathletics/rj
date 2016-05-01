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
    publicPath: wconfig.output.publicPath,
    hot: true
  }))

  app.use(whm(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))

  app.use(
    '/static',
    express.static(path.join(config.rootPath, config.static.path))
  )

  return app
}

export default function (appCfg) {
  let wpConfig = appCfg.get('webpack')
  let config = {
    rootPath: path.join(appCfg.get('APP_ROOT'), appCfg.get('BUILD_OUTPUT_DIR')),
    staticPath: 'static',
    isDevelopment: process.env.NODE_ENV !== 'production',
    compress: true,
    static: {
      path: 'static',
      index: 'index.html',
      maxAge: 3600000 * 24 * 28 // four weeks
    }
  }

  let app = express()

  let ctx = {
    serve: function (port) {
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
    installWebHot(app, config, wpConfig.get('dev'))
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
    res.sendFile(config.static.index, {root: config.rootPath})
  })

  return ctx
}
