module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-useless-escape': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [0, 'always'],
    // 禁止混用tab和空格
    'no-mixed-spaces-and-tabs': 2,
    // 大括号风格
    'brace-style': [0, 'stroustrup']
  }
}
