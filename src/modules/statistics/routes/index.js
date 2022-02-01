import Statistics from '../views/Statistics.vue'

const routes = [
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: {requiresAuth: true}
    },
]

export default routes;