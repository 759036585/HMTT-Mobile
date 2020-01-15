import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页组件
const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
// 视频组件
const Video = () => import('@/views/video')
// 个人中心组件
const User = () => import('@/views/user')
// 问答组件
const Question = () => import('@/views/question')
const Profile = () => import('@/views/user/profile')
const Chat = () => import('@/views/user/chat')
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const Result = () => import('@/views/search/result')
const Article = () => import('@/views/article')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout, // 一级路由
    children: [
      // 二级路由
      { path: '/', component: Home },
      { path: '/video', component: Video },
      { path: '/question', component: Question },
      { path: '/user', component: User }
    ]
  },
  {
    path: '/user/profile', component: Profile
  },
  {
    path: '/user/chat', component: Chat
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/', component: Search
  },
  {
    path: '/search/result', component: Result
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/article', component: Article
  }

]

const router = new VueRouter({
  routes
})

export default router
