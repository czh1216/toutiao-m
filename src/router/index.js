import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//路由页面懒加载
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/editdata',
    component: () => import('@/views/EditData')
  },
  {
    path: '/article',
    component: () => import('@/views/Article')
  }
]

const router = new VueRouter({
  routes
})

export default router
