import { App } from 'vue'
import MapDialog from './index.vue'

export default {
  install(app: App) {
    app.component('MapDialog', MapDialog)
  }
}