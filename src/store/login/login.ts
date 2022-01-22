import { Module } from 'vuex'
import { ILoginState } from './types'
import {
  accountLoginRequest,
  getUserInfo,
  getUserMenus
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import { Md5 } from 'ts-md5/dist/md5'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
const loginModule: Module<ILoginState, any> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      console.log('注册动态路由')

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach(route => {
        router.addRoute('main', route)
      })
      localCache.setCache('dynamicMenuRoutes', routes)
      // 获取用户按钮的权限
      // const permissions = mapMenusToPermissions(userMenus)
    },
    changePermissions(state, permissions: any) {
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const store = useStore()
      const salt = store.state.app.salt
      payload.password = Md5.hashStr(payload.password + salt)
      // login request
      const loginResult = await accountLoginRequest(payload)
      if (!(loginResult && loginResult.data)) {
        return
      }
      const token = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // get user data
      const userInfoResult = await getUserInfo()
      if (!(userInfoResult && userInfoResult.data)) {
        return
      }
      // console.log(userInfoResult)
      commit('changeUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)
      // get menu
      const useMenusResult = await getUserMenus()
      if (!(useMenusResult && useMenusResult.data)) {
        return
      }
      // console.log(useMenusResult.data)
      const menuList = useMenusResult.data.menuList
      const permissions = useMenusResult.data.permissions
      commit('changeUserMenus', menuList)
      localCache.setCache('userMenus', menuList)
      commit('changePermissions', permissions)
      localCache.setCache('permissions', permissions)
      // go to main
      await router.push('/main')
    },
    /*phoneLoginAction({ commit }, payload: any) {
      console.log('phoneLoginAction')
      console.log(payload)
    },*/
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
      const permissions = localCache.getCache('permissions')
      if (permissions) {
        commit('changePermissions', permissions)
      }
    }
  }
}
export default loginModule
