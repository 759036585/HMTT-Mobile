import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
