import { App, Directive } from 'vue'
import { thousandsFormat } from '@/utils/index'

export default function installCountDirective(app: App) {
  const countDirective:Directive = {
    updated(el, binding) {
      const { oldValue, value } = binding
      if (oldValue.count === value.count) return
      const { count: resultNum, unit } = value
      const unitName = unit || ''
      // 动画间隔
      const duration = 30
      // 步长 数据增加间隔
      const step = Number((resultNum / duration).toFixed(0))
      let resultCount = 0
      let timer:any
      timer = setInterval(() => {
        resultCount = resultCount + step
        el.innerHTML = `${thousandsFormat(resultCount)}<span class="v-count-unit">${unitName}</span>`
        if (Number(resultCount) > resultNum) {
          resultCount = resultNum
          el.innerHTML = `${thousandsFormat(resultCount)}<span class="v-count-unit">${unitName}</span>`
          // 清空定时器
          clearInterval(timer)
          timer = null
        }
      }, duration)
    }
  }
  app.directive('count', countDirective)
}