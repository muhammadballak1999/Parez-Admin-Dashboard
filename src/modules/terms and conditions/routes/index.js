import TermsAndConditions from '../views/TermsAndConditions.vue'

const routes = [
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: TermsAndConditions,
      meta: {requiresAuth: true}
    },
]

export default routes;