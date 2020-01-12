// 封装requset模块
import axios from 'axios'
import JSONBIG from 'json-bigint'
import store from '@/store/index'
import router from '@/router/index'

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
}, async error => {
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectURL: router.currentRoute.path } }

    if (store.state.user.refresh_token) {
      try {
        let result = await axios({
          methods: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          Authorization: `Bearer ${store.state.user.token}`
        })
        store.commit('updateUser', {
          token: result.data.data.token,
          refresh_token: store.state.user.refresh_token
        })
        return instance(error.config)
      } catch (error) {
        store.commit('clearUser')
        router.push(toPath)
      }
    } else {
      router.push(toPath)
    }
    return Promise.reject(error)
  }
})

export default instance
