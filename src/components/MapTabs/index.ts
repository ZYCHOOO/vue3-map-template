import { App } from 'vue'
import MapTabs from './index.vue'

export default {
  install(app: App) {
    app.component('MapTabs', MapTabs)
  }
}