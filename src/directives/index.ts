import { App } from 'vue'
import installCountDirective from './count'
import installClickOutsideDirective from './clickOutside'

// 注册指令
export function installDirectives(app: App) {
  installCountDirective(app)
  installClickOutsideDirective(app)
}
