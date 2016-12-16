var path = require('path')
var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config')
var devPath = config.dev.devPath

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
  // externals: ['element-ui'],
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.resolve(projectRoot, 'node_modules')],
    alias: {
      // 'vue': 'vue/dist/vue',
      'assets': path.resolve(devPath, 'assets'),
      'components': path.resolve(devPath, 'components'),
      'config': path.resolve(devPath, 'config'),
      'lib': path.resolve(devPath, 'lib'),
      'modules': path.resolve(devPath, 'modules'),
      'views': path.resolve(devPath, 'views')
    }
  },
  resolveLoader: {
    fallback: [path.resolve(projectRoot, 'node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
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
  stylus: {
    use: [
      poststylus([flexbox, remify, autoprefixer])
    ],
    set: {
      paths: [devPath]
    }
  },
  vue: {
    loaders: cssLoaders({vue: true}),
    postcss: [flexbox, remify, autoprefixer],
    autoprefixer: false
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
