import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relative from 'dayjs/plugin/relativeTime'

dayjs.extend(relative)

export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
    Vue.filter('relTime', relTime)
  }
}
const sleep = (time = 500) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function relTime (date) {
  return dayjs().locale('zh-cn').from(date)
}
