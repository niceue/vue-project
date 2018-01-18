var path = require('path')
var webpack = require('webpack')
var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config')
var devPath = config.dev.devPath
var isProd = process.env.NODE_ENV === 'production'

var poststylus = require('poststylus')
var flexbox = require('postcss-flexbox')()
var remify = require('postcss-remify')({base:16})
var autoprefixer = require('autoprefixer')({browsers: config.browsers, flexbox: 'no-2012'})

module.exports = {
  entry: {
    main: path.resolve(devPath, 'main.js')
  },
  output: {
    path: config.prod.outputPath,
    publicPath: config.prod.publicPath,
    filename: '[name].js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [path.resolve(projectRoot, 'src'), 'node_modules'],
    alias: {
      'assets': path.resolve(devPath, 'assets'),
      'components': path.resolve(devPath, 'components'),
      'config': path.resolve(devPath, 'config'),
      'lib': path.resolve(devPath, 'lib'),
      'modules': path.resolve(devPath, 'modules'),
      'views': path.resolve(devPath, 'views')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'eslint-loader'
        ],
        include: path.resolve(projectRoot, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader?cacheDirectory',
          'eslint-loader'
        ],
        include: path.resolve(projectRoot, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff2?|eot)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      options: {
        stylus: {
          use: [
            poststylus([flexbox, remify, autoprefixer])
          ],
          set: {
            paths: [devPath]
          }
        },
        vue: {
          loaders: cssLoaders({
            sourceMap: isProd && config.prod.sourceMap,
            // extract: false,
            vue: true
          })
        },
        eslint: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    })
  ]
}
