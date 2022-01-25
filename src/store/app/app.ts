import { Module } from 'vuex'
import { IAppState } from './types'
import { IRootState } from '@/store/types'
const appModule: Module<IAppState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 登录密码加密 盐
      salt: 'vea',
      // 页面文档可视高度(随窗口改变大小)
      documentClientHeight: 0,
      // 导航条, 布局风格, default(默认) / inverse(反向)
      navbarLayoutType: 'default',
      // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
      sidebarLayoutSkin: 'dark',
      // 侧边栏, 折叠状态
      sidebarFold: false,
      menuActiveName: '',
      // 内容, 是否需要刷新
      contentIsNeedRefresh: false,
      // 主入口标签页
      mainTabs: [],
      mainTabsActiveName: ''
    }
  },
  getters: {},
  mutations: {
    changeDocumentClientHeight(state, documentClientHeight) {
      state.documentClientHeight = documentClientHeight
    },
    changeNavbarLayoutType(state, navbarLayoutType) {
      state.navbarLayoutType = navbarLayoutType
    },
    changeSidebarLayoutSkin(state, sidebarLayoutSkin) {
      state.sidebarLayoutSkin = sidebarLayoutSkin
    },
    changeSidebarFold(state, sidebarFold) {
      state.sidebarFold = sidebarFold
    },
    changeMenuActiveName(state, name) {
      state.menuActiveName = name
    },
    changeContentIsNeedRefresh(state, status) {
      state.contentIsNeedRefresh = status
    },
    changeMainTabs(state, tabs) {
      state.mainTabs = tabs
    },
    changeMainTabsActiveName(state, name) {
      state.mainTabsActiveName = name
    }
  },
  actions: {}
}
export default appModule
