import { App } from 'vue'
import MapBtn from './index.vue'

export default {
  install(app: App) {
    app.component('MapBtn', MapBtn)
  }
}