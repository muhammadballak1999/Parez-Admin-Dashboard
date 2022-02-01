import Blogs from '../views/Blogs.vue'

const routes = [
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs,
      meta: {requiresAuth: true},
    },
]

export default routes;