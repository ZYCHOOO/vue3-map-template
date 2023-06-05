import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入 pinia
import { createPinia } from 'pinia'
import { installDirectives } from './directives'
import installComponents from '@/components'
import installFilters from '@/utils/filters'

import 'virtual:svg-icons-register'

import '@/styles/index.scss'

const app = createApp(App)
installDirectives(app)
installFilters(app)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)
  .use(installComponents)
  .mount('#app')
