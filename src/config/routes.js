import Index from 'views/index'
import Login from 'views/login'

export default [
  {path: '/', redirect: '/index'},
  {path: '/index', component: Index},
  {path: '/login', component: Login}
]
