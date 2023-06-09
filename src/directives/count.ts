import { App, Directive } from 'vue'

export default function installCountDirective(app: App) {
  const countDirective:Directive = {
    mounted(el, binding) {
      const { arg, value } = binding
      const resultNum = el.innerText
      // 单位名称
      const unitName = value.unit || ''
      // 动画间隔
      const duration = Number(arg)
      // 步长 数据增加间隔
      const step = resultNum / duration
      let count = 0
      let timer:any
      timer = setInterval(() => {
        count++
        el.innerText = `${count}${unitName}`
        if (count > resultNum) {
          count = resultNum
          el.innerText = `${count}${unitName}`
          // 清空定时器
          clearInterval(timer)
          timer = null
        }
      }, Number(step.toFixed(0)))
    }
  }
  app.directive('count', countDirective)
}