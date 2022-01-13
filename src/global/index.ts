import 'element-plus/theme-chalk/base.css'
import { App } from 'vue'
import registerElement from '@/global/register-element'
export function globalRegister(app: App): void {
  // element-plus
  registerElement(app)
}
