import { App } from 'vue'
import MapChart from './MapChart'
import SvgIcon from './SvgIcon'

const components = [
  MapChart,
  SvgIcon
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}