import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { installDirectives } from './directives'

const app = createApp(App)

installDirectives(app)

app.mount('#app')
