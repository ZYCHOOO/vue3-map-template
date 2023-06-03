import { App } from 'vue'
import dayjs from 'dayjs'
// 全局挂载过滤器

const dateTimeFilter = (val: any, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

export default (app: App) => {
  app.config.globalProperties.$filters = {
    dateTimeFilter
  }
}
