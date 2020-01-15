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

// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/channels'
  })
}
