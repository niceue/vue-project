require('shelljs/global')
var path = require('path')
var config = require('./config')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')
var opn = require('opn')
var port = config.dev.port || 8000

runServer(() => {
  var uri = `http://localhost:${port}`
  console.log(`\nListening at ${uri}\n`)
  opn(uri)
})

function runServer(callback) {
  var proxyTable = config.dev.proxyTable || {}
  var express = require('express')
  var proxy = require('http-proxy-middleware')
  var ProgressBarPlugin = require('progress-bar-webpack-plugin')
  var chalk = require('chalk')
  var hasCallback = false

  var ProgressBar = new ProgressBarPlugin({
        format: chalk.bold('[') + ':bar' + chalk.bold(']') + chalk.green.bold(' :percent ') + '(:msg)',
        callback: () => {
          if (callback && !hasCallback) {
            setTimeout(callback, 0)
            hasCallback = true
          }
        }
      })

  webpackConfig.plugins.unshift(ProgressBar, new webpack.HotModuleReplacementPlugin())

  // add hot-reload related code to entry chunks
  Object.keys(webpackConfig.entry).forEach(function (name) {
    webpackConfig.entry[name] = [path.resolve(__dirname, 'dev-client') ].concat(webpackConfig.entry[name])
  })

  var app = express()
  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          chunks: false
        }
      })

  var hotMiddleware = require('webpack-hot-middleware')(compiler)

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    if (~context.indexOf('|')) context = context.split('|')
    app.use(proxy(context, options))
  })

  // handle fallback for HTML5 history API
  // app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)
  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)
  app.use(config.prod.publicPath, express.static('./'))
  app.listen(port, err => {
    if (err) {
      console.log(err)
      return
    }
  })
}
