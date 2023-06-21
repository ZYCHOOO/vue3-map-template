import { App, Directive } from 'vue'

export default function installCountDirective(app: App) {
  const countDirective:Directive = {
    updated(el, binding) {
      const { arg, value } = binding
      const resultNum = Number(arg)
      // 单位名称
      const unitName = value.unit || ''
      // 动画间隔
      const duration = 30
      // 步长 数据增加间隔
      const step = Number((resultNum / duration).toFixed(0))
      let count = 0
      let timer:any
      timer = setInterval(() => {
        count = count + step
        el.innerText = `${count}${unitName}`
        if (count > resultNum) {
          count = resultNum
          el.innerText = `${count}${unitName}`
          // 清空定时器
          clearInterval(timer)
          timer = null
        }
      }, duration)
    }
  }
  app.directive('count', countDirective)
}