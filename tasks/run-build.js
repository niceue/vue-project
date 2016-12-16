// https://github.com/shelljs/shelljs
require('shelljs/global')
process.env.NODE_ENV = 'production'

var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var config = require('./config')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var chalk = require('chalk')

webpackConfig.plugins.unshift(
  new ProgressBarPlugin({
      format: chalk.bold('[') + ':bar' + chalk.bold(']') + chalk.green.bold(' :percent ') + '(:msg)'
    })
)

console.log('building for production...')

rm('-rf', config.prod.outputPath)
mkdir('-p', config.prod.outputPath)

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
