import { App, Directive } from 'vue'

export default function installClickOutsideDirective(app: App) {
  const clickOutsideDirective:Directive = {
    mounted (el, binding) {
      const handler = (e:any) => {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.value && typeof binding.value === 'function') {
          binding.value(e)
        }
      }
      el._vClickOutside_ = handler
      document.addEventListener('click', handler)
    },
    unmounted (el) {
      document.removeEventListener('click', el._vClickOutside_)
    }
  }

  app.directive('clickOutside', clickOutsideDirective)
}