import { App } from 'vue'
import MapChart from './MapChart'
import SvgIcon from './SvgIcon'
import MapBtn from './MapBtn'
import MapDialog from './MapDialog'
// import new components

const components = [
  MapChart,
  SvgIcon,
  MapBtn,
  MapDialog
// add new components
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}