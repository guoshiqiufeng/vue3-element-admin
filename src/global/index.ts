import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import registerIcon from '@/global/register-icon'
export function globalRegister(app: App): void {
  app.use(ElementPlus)
  // icon
  registerIcon(app)
}
