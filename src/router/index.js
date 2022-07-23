import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/my',
    children: [
      {
        path: '/my',
        component: () => import('@/views/My')
      },
      {
        path: '/home',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/Qa')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/articledetails/:id',
    component: () => import('@/views/ArticleDetails')
  }
]

const router = new VueRouter({
  routes
})

export default router
