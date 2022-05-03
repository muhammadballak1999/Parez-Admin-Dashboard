import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import statisticsRoutes from '../modules/statistics/routes';
import announcementsAndRulesRoutes from '../modules/Announcements and rules/routes';
import notificationRoutes from '../modules/notification/routes';
import blogRoutes from '../modules/blog/routes'
import usersRoutes from '../modules/Users/routes';
import violenceCasesRoutes from '../modules/Violence Cases/routes';





Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: Login,
  },
  {
    path: '/',
    redirect: '/statistics',
    component: () => import('../Layouts/MainLayout.vue'),
    meta: {requiresAuth: true},
    children: [
      ...statisticsRoutes,
      ...blogRoutes,
      ...announcementsAndRulesRoutes,
      ...notificationRoutes,
      ...usersRoutes,
      ...violenceCasesRoutes,
      {
        path: '/terms-and-conditions',
        name: 'terms-and-conditions',
        meta: {requiresAuth: true},
        component: () => import('../views/TermsAndConditions.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {requiresAuth: true},
        component: () => import('../views/About.vue'),
      },
      {
        path: '/report',
        name: 'report',
        meta: {requiresAuth: true},
        component: () => import('../views/Report.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if(localStorage.getItem('accessToken'))
    next()
    else{
      next({
        name:'signin'
      })
    }
  }else{
 if(to.name === 'signin' && localStorage.getItem('accessToken')){
   next({
     name: 'statistics'
   })
   return
 }
  next()
  }
 })

export default router
