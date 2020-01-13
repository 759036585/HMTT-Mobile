import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let toPath = {
      path: '/login',
      query: { redirectURL: to.path }
    }
    next(toPath)
  } else {
    next()
  }
})

export default router
