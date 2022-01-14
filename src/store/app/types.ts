export interface IAppState {
  salt: string
  documentClientHeight: number
  navbarLayoutType: string
  sidebarLayoutSkin: string
  sidebarFold: boolean
  menuActiveName: string
  contentIsNeedRefresh: boolean
  mainTabs: Array<IMainTabs>
  mainTabsActiveName: string
}
export interface IMainTabs {
  menuId: string
  name?: string
  title?: string
  type: string
  iframeUrl?: string
  params?: string
  query?: string
}
