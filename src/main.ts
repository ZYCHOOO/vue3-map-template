import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installDirectives } from './directives'
import installComponents from '@/components'

import 'virtual:svg-icons-register'

import '@/styles/index.scss'

const app = createApp(App)
installDirectives(app)

app
  .use(router)
  .use(installComponents)
  .mount('#app')
