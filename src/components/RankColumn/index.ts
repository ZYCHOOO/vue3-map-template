import { App } from 'vue'
import RankColumn from './index.vue'

export default {
  install(app: App) {
    app.component('RankColumn', RankColumn)
  }
}