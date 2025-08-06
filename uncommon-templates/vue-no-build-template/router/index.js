const { createRouter, createWebHashHistory } = VueRouter

import routes from './routes.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
