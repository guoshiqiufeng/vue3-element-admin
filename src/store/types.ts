import { IAppState } from './app/types'
import { ILoginState } from './login/types'

export interface IRootState {
  name: string
}

export interface IRootWithModule {
  app: IAppState
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
