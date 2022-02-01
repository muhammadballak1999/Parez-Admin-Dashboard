import AnnouncementsAndRules from '../views/AnnouncementsAndRules.vue'

const routes = [
  {
    path: '/announcements-and-rules',
    name: 'announcements-and-rules',
    component: AnnouncementsAndRules,
    meta: {requiresAuth: true}
  },
]

export default routes;