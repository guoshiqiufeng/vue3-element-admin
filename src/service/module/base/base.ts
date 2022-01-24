import hyRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.get<IDataType>({
    url: url,
    params: queryInfo
  })
}

export function deletePageData(url: string, deleteData: any) {
  return hyRequest.delete<IDataType>({
    url: url,
    data: deleteData
  })
}

export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return hyRequest.put<IDataType>({
    url: url,
    data: editData
  })
}
