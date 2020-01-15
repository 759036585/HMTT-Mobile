import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/channels'
  })
}
