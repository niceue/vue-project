import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import routes from './config/routes'
import modules from './modules'
import App from './App'
import './lib/filters'
import * as components from 'components'

// 安装插件
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

const isDev = process.env.NODE_ENV === 'development'

// 注册全局组件 (自动添加 v- 前缀)
for (let id in components) {
  Vue.component(id.slice(0, 3) === 'App' ? id : 'V' + id, components[id])
}

// 添加实例方法
Object.assign(Vue.prototype, {
  // 转换观察对象为单纯对象
  $json: data => {
    if (typeof data !== 'string') {
      if (!data) return data
      data = JSON.stringify(data)
    }
    return JSON.parse(data)
  }
})

// 初始化路由
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 初始化 vuex
const cacheState = JSON.parse(window.localStorage.getItem('vuex-state'))
if (cacheState) {
  for (let k in modules) {
    if (cacheState[k]) modules[k].state = cacheState[k]
  }
}
const store = new Vuex.Store({
  modules,
  strict: isDev,
  plugins: isDev ? [createLogger()] : []
})
window.onbeforeunload = () => {
  window.localStorage.setItem('vuex-state', JSON.stringify(store.state))
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
