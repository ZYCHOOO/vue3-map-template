import { App } from 'vue'
import SvgIcon from './SvgIcon'

const components = [
  SvgIcon
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}