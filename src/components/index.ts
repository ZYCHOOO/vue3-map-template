import { App } from 'vue'
import MapChart from './MapChart'
import SvgIcon from './SvgIcon'
// import new components

const components = [
  MapChart,
  SvgIcon,
  // add new components
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}