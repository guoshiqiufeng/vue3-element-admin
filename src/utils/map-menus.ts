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
                isTab: true,
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

export function treeDataTranslate(data: any, id = 'id', pid = 'parentId') {
  const res = []
  const temp = {}
  for (let i = 0; i < data.length; i++) {
    ;(temp as any)[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if ((temp as any)[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!(temp as any)[data[k][pid]]['children']) {
        ;(temp as any)[data[k][pid]]['children'] = []
      }
      if (!(temp as any)[data[k][pid]]['_level']) {
        ;(temp as any)[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = (temp as any)[data[k][pid]]._level + 1
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}
