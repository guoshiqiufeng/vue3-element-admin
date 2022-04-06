import hyRequest from '@/service'
import { IDataType } from '@/service/types'

export enum UserApi {
  Page = '/system/user/page',
  Domain = '/system/user',
  ResetPassword = '/system/user/resetPassword'
}

export function resetPassword(userId: string) {
  return hyRequest.post<IDataType>({
    url: UserApi.ResetPassword,
    data: {
      userId
    }
  })
}
