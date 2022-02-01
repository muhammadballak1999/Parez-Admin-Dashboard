import ViolenceCases from '../views/ViolenceCases.vue'

const routes = [
    {
      path: '/violence-cases',
      name: 'violence-cases',
      component: ViolenceCases,
      meta: {requiresAuth: true}
    },
]

export default routes;