import App from './App.vue'
import naive from 'naive-ui'
import router from './routers'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(naive)
app.use(router)

const authStore = useAuthStore(pinia)
authStore.checkAuth().then(() => {
  app.mount('#app')
})
