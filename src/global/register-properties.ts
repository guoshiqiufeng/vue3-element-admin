import { App } from 'vue'

import { formatTimeSpan } from '@/utils/date-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: number) {
      return formatTimeSpan(value)
    }
  }
}
