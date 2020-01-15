import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
export const disLikeArticle = (data) => {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}

export const reportArticle = (data) => {
  return request({
    url: '/article/reports',
    data,
    method: 'post'
  })
}
