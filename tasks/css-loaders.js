module.exports = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var loader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    })
    // loader.unshift('vue-style-loader')

    if (options.extract !== false && process.env.NODE_ENV === 'production') {
      var ExtractTextPlugin = require('extract-text-webpack-plugin')
      return ExtractTextPlugin.extract({
        fallbackLoader: 'vue-style-loader',
        loader: loader,
        publicPath: '../'
      })
    } else {
      return loader
    }
  }

  var loaders = {
        css: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
      }

  return options.vue ? loaders :
    Object.keys(loaders).map(function(ext){
      return {
        test: new RegExp('\\.' + ext + '$'),
        loader: loaders[ext]
      }
    })
}
