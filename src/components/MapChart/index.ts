import { App } from 'vue'
import MapChart from './index.vue'

export default {
  install(app: App) {
    app.component('MapChart', MapChart)
  }
}