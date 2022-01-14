import 'element-plus/theme-chalk/base.css'
import { App } from 'vue'
import registerElement from '@/global/register-element'
import registerIcon from '@/global/register-icon'
export function globalRegister(app: App): void {
  // element-plus
  registerElement(app)
  // icon
  registerIcon(app)
}
