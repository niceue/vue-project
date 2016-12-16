import Vue from 'vue'
import {
  USER_LOGIN,
  USER_LOGOUT
} from 'config/mutation-types'

export default {
  state: {
    isLogin: false,
    data: null
  },

  mutations: {
    // 登录成功
    [USER_LOGIN]: (state, data) => {
      state.isLogin = true
      state.data = data
    },
    // 登出成功
    [USER_LOGOUT]: (state) => {
      state.isLogin = false
      state.data = null
    }
  },

  actions: {
    login ({ commit, state }, params) {
      return Vue.http.post('/user/login', {params: params})
        .then((res) => {
          let d = res.data
          if (d.code === 200) {
            commit(USER_LOGIN, d.data)
          }
          return res.json()
        })
    },
    logout ({ commit, state }) {
      return Vue.http.get('/user/logout')
        .then((res) => {
          let d = res.data
          if (d.code === 200) {
            commit(USER_LOGOUT, d.data)
          }
          return res.json()
        })
    },
    captcha ({ commit }) {
      return '/user/captcha?' + Date.now()
    }
  }
}
