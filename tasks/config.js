var path = require('path')


/************
 * 开发环境
 ************/
exports.dev = {
  port: 8000,

  devPath: path.resolve(__dirname, '../src/'),

  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable: {
    // '/path1|/path2': {
    //   target: 'http://mock.yourdomain.com',
    //   changeOrigin: true
    // }
  }
}


/************
 * 生产环境
 ************/
exports.prod = {
  // 打包输出的位置
  outputPath: path.resolve(__dirname, '../dist/'),
  // 生产发布路径（也可以为绝对路径）
  publicPath: './',
  // 是否生成 source map
  sourceMap: false
}


/************
 * 运行环境
 ************/
// https://github.com/ai/browserslist
exports.browsers = ['iOS >= 8.0', 'Android >= 4', 'Chrome >= 30']
