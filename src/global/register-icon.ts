import { App } from 'vue'
import IconSvg from '@/components/icon-svg'
export default function (app: App): void {
  // 注册
  app.component('IconSvg', IconSvg)
}
