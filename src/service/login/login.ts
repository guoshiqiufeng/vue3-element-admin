import hqRequest from '../index'
import { IAccount } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  GetUserInfo = '/system/user/info',
  GetUserMenus = '/system/menu/nav',
  AccountLogout = '/logout'
}

/**
 * 账号登录
 * @param account 账号信息
 * @param showLoading
 */
export function accountLoginRequest(account: IAccount, showLoading = true) {
  return hqRequest.post<IDataType<string>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: showLoading
  })
}

/**
 * 退出登录
 * @param showLoading
 */
export function accountLogoutRequest(showLoading = true) {
  return hqRequest.post<IDataType<string>>({
    url: LoginAPI.AccountLogout,
    showLoading: showLoading
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo(showLoading = true) {
  return hqRequest.get<IDataType>({
    url: LoginAPI.GetUserInfo,
    showLoading: showLoading
  })
}

/**
 * 获取用户菜单
 */
export function getUserMenus(showLoading = true) {
  return hqRequest.get<IDataType>({
    url: LoginAPI.GetUserMenus,
    showLoading: showLoading
  })
}
