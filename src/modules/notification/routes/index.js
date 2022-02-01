import Notifications from '../views/Notifications.vue'

const routes = [
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
    meta: {requiresAuth: true}
  },
]

export default routes;