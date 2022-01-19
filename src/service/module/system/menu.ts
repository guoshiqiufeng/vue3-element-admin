import hyRequest from '@/service'
import { IDataType } from '@/service/types'

enum MenuApi {
  MenuSelect = '/system/menu/select'
}

export function getMenuSelectData() {
  return hyRequest.get<IDataType>({
    url: MenuApi.MenuSelect
  })
}
