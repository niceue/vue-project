## 关于
这是自用的 vue2.0 项目的脚手架，集成（使用）以下技术：
- [webpack 2.0](https://webpack.js.org/)
- [eslint](http://eslint.org/)
- [babel](http://babeljs.io/)
- [vue 2.0](http://cn.vuejs.org/)
- [vuex 2.0](https://vuex.vuejs.org/zh-cn/)
- [vue-router 2.0](http://router.vuejs.org/zh-cn/)
- [vue-resource](https://github.com/vuejs/vue-resource)
- [stylus](https://github.com/stylus/stylus)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-flexbox](https://github.com/archana-s/postcss-flexbox)
- [postcss-remify](https://github.com/OakMX/postcss-remify)

## 开始使用

``` bash
# 安装依赖
yarn || npm i

# 执行如下命令后访问  localhost:8000
npm run dev

# 编译
npm run build
```

---

<br>
## 快速参考文档

### [postcss-flexbox](https://github.com/archana-s/postcss-flexbox)

#### box:
```
box: [horizontal | horizontal-reverse | vertical | vertical-reverse]
     [top | bottom]
     [left | right]
     [center | middle]
     [space-between | space-around]
     [wrap | wrap-reverse]
```
##### box-item
```
box-item: [top | center | bottom | left | middle | right | stretch]
          [flex-auto | flex-none | flex-1 ... flex-12]
```
