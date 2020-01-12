// 封装requset模块
import axios from 'axios'
import JSONBIG from 'json-bigint'
import store from '@/store/index'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [data => {
    try {
      return JSONBIG.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
instance.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, error => Promise.reject(error))
// 响应拦截器
instance.interceptors.response.use(response => {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, error => {
  return Promise.reject(error)
})

export default instance
