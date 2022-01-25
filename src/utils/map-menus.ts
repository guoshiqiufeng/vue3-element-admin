import { RouteRecordRaw } from 'vue-router'
import { isURL } from '@/utils/validate'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      let path = ''
      let name = ''
      if (menu.url) {
        if (menu.url.indexOf('/') !== 0) {
          path = '/' + menu.url
        }
        name = menu.url.replace('/', '-')
      }
      const route: RouteRecordRaw = {
        path: path,
        component: {},
        name: name,
        meta: {
          menuId: menu.menuId,
          title: menu.name,
          isDynamic: true,
          isTab: true
        }
      }
      if (menu.type === 1) {
        if (isURL(menu.url)) {
          route.path = `i-${menu.menuId}`
          route.name = `i-${menu.menuId}`
          route.meta = {
            menuId: menu.menuId,
            title: menu.name,
            isDynamic: true,
            isTab: true,
            iframeUrl: menu.url
          }
          if (route) routes.push(route)
        } else {
          if (menu.url) {
            const menus = menu.url.split('/')
            if (menus.length >= 2) {
              route.component = () =>
                import(`@/views/module/${menus[0]}/${menus[1]}/${menus[1]}.vue`)
              if (route) routes.push(route)
            }
          }
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
  const temp = Object()
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}
