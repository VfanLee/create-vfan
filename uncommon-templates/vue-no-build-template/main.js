const { createApp, defineAsyncComponent } = Vue

import { load } from './utils/index.js'
import router from './router/index.js'
import i18n from './locales/index.js'

const app = createApp({
  components: {
    App: defineAsyncComponent(() => load('./App.vue')),
  },
  template: '<App />',
})

app.use(router)
app.use(i18n)

app.mount('#app')
