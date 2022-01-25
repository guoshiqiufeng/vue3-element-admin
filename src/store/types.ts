import { IAppState } from './app/types'
import { ILoginState } from './login/types'

export interface IRootState {
  app: IAppState
  login: ILoginState
}
