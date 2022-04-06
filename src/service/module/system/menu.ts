import hyRequest from '@/service'
import { IDataType } from '@/service/types'

export enum MenuApi {
  List = '/system/menu/list',
  Domain = '/system/menu',
  MenuSelect = '/system/menu/select',
  MenuInfo = '/system/menu/'
}

export function getMenuSelectData() {
  return hyRequest.get<IDataType>({
    url: MenuApi.MenuSelect
  })
}

export function getMenuInfo(id: any) {
  return hyRequest.get<IDataType>({
    url: MenuApi.MenuInfo + id
  })
}
