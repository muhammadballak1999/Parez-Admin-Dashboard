import Users from '../views/Users.vue'

const routes = [
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {requiresAuth: true}
    },
]

export default routes;