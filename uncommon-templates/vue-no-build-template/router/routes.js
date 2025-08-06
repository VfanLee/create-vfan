import { load } from '../utils/index.js'

const routes = [
  { path: '/', component: () => load('./views/Home.vue') },
  { path: '/about', component: () => load('./views/About.vue') },
]

export default routes
