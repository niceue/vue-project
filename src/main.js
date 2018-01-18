import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from './config/routes'
import modules from './modules'
import App from './App'
import './lib/filters'
import * as components from './components'

Vue.config.productionTip = false
// 安装插件
Vue.use(VueRouter)
Vue.use(Vuex)

// 注册全局组件 (自动添加 v- 前缀)
for (let id in components) {
  Vue.component(id.slice(0, 3) === 'App' ? id : 'V' + id, components[id])
}

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
  strict: process.env.NODE_ENV === 'development'
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
