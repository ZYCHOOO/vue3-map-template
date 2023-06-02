import { App } from 'vue'
import SvgIcon from './index.vue'

export default {
  install(app: App) {
    app.component('SvgIcon', SvgIcon)
  }
}