import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { setupStore } from '@/store'
import { globalRegister } from '@/global'
import '@/assets/scss/index.scss'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
