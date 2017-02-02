var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./config')

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    publicPath: '/'
  },
  module: {
    rules: cssLoaders()
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(config.dev.devPath, 'index.html')
    })
  ]
})
