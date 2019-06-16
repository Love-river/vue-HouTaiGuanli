import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('./pages/logout/Logout.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./pages/register/Register.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('./pages/table/Tables.vue')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('./pages/tag/Tag.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./pages/upload/Upload.vue')
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: () => import('./pages/markdown/Markdown.vue')
    },
    {
      path: '/excel',
      name: 'excel',
      component: () => import('./pages/excel/Excel.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('adminUser')
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    user ? next() : next('/login')
  }
})


export default router
