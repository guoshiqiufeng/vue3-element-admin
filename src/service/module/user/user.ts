import hyRequest from '@/service'
import { IDataType } from '@/service/types'

enum UserApi {
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
