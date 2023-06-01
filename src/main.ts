import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installDirectives } from './directives'

const app = createApp(App)

installDirectives(app)

app
  .use(router)
  .mount('#app')
