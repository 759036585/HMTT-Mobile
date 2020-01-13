// 专门处理用户信息的存储及删除 放置在localStora

const USER_TOKEN = 'heimatoutiao-91'

export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
