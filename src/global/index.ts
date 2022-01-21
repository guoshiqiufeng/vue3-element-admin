import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import registerIcon from '@/global/register-icon'
import registerProperties from '@/global/register-properties'
export function globalRegister(app: App): void {
  app.use(ElementPlus, {
    locale: zhCn
  })
  // icon
  registerIcon(app)
  // config globalProperties
  registerProperties(app)
}
