import axios from 'axios'

const http = axios

// http.interceptors.request.use(function (config) {
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// http.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   console.log(error.message)
//   return Promise.reject(error)
// })

export default http
