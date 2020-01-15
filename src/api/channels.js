import request from '@/utils/request'
import store from '@/store'

const CACHE_CHANNEL_T = 'hm-91-toutiao-t'
const CACHE_CHANNEL_U = 'hm-91-toutiao-u'

export const getMyChannels = () => {
  return new Promise(async (resolve, reject) => {
    let key = store.state.user.token ? CACHE_CHANNEL_T : CACHE_CHANNEL_U
    let str = localStorage.getItem(key)
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      const res = await request({ url: '/user/channels' })
      localStorage.setItem(key, JSON.stringify(res.channels))
      resolve(res)
    }
  })
}

export const delMyChannels = (id) => {
  return new Promise((resolve, reject) => {
    let key = store.state.user.token ? CACHE_CHANNEL_T : CACHE_CHANNEL_U
    let channels = JSON.parse(localStorage.getItem(key))
    let index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      channels.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('找不到对应的频道'))
    }
  })
}

// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/channels'
  })
}
