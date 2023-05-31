import { App } from 'vue'
import installCountDirective from './count'

// 注册指令
export function installDirectives(app: App) {
  installCountDirective(app)
}
