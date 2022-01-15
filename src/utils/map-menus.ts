import { RouteRecordRaw } from 'vue-router'
import { isURL } from '@/utils/validate'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/module', true, /\.ts/)
  routeFiles.keys().forEach(key => {
    const route = require('../router/module' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        if (isURL(menu.url)) {
          const route: RouteRecordRaw = {
            path: `i-${menu.menuId}`,
            component: {},
            name: `i-${menu.menuId}`,
            meta: {
              menuId: menu.menuId,
              title: menu.name,
              isDynamic: true,
              isTab: true,
              iframeUrl: menu.url
            }
          }
          if (route) routes.push(route)
        } else {
          const route = allRoutes.find(route => {
            let menuUrl = menu.url
            if (menuUrl.indexOf('/') !== 0) {
              menuUrl = '/' + menu.url
            }
            if (route.path === menuUrl) {
              route.meta = {
                menuId: menu.menuId,
                title: menu.name,
                isDynamic: true,
                iframeUrl: ''
              }
              return route
            }
          })
          if (route) routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}