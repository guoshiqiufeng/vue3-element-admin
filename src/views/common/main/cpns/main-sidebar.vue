<template>
  <div class="main-sidebar">
    <div class="sidebar-body">
      <el-menu
        class="sidebar-menu"
        background-color="#263238"
        text-color="#8a979e"
        active-text-color="#ffffff"
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
      >
        <template v-for="menu in menuList" :key="menu.menuId">
          <sub-menu
            :menu="menu"
            :dynamicMenuRoutes="dynamicMenuRoutes"
          ></sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SubMenu from './main-sidebar-sub-menu.vue'
import { isURL } from '@/utils/validate'
import localCache from '@/utils/cache'

const store = useStore()
const route = useRoute()
const dynamicMenuRoutes = localCache.getCache('dynamicMenuRoutes')

const sidebarFold = computed(() => {
  return store.state.app.sidebarFold
})

const menuList = computed({
  get() {
    return store.state.login.userMenus
  },
  set(val) {
    store.commit('login/changeUserMenus', val)
  }
})

const menuActiveName = computed({
  get() {
    return store.state.app.menuActiveName
  },
  set(val) {
    store.commit('app/changeMenuActiveName', val)
  }
})

const mainTabs = computed({
  get() {
    return store.state.app.mainTabs
  },
  set(val) {
    store.commit('app/changeMainTabs', val)
  }
})

const mainTabsActiveName = computed({
  get() {
    return store.state.app.mainTabsActiveName
  },
  set(val) {
    store.commit('app/changeMainTabsActiveName', val)
  }
})
// 路由操作
const routeHandle = (route: any) => {
  if (route.meta.isTab) {
    // tab选中, 不存在先添加
    let tab = (mainTabs as any).value.filter(
      (item: any) => item.name === route.name
    )[0]
    if (!tab) {
      if (route.meta.isDynamic) {
        route = dynamicMenuRoutes.filter(
          (item: any) => item.name === route.name
        )[0]
        if (!route) {
          return console.error('未能找到可用标签页!')
        }
      }
      tab = {
        menuId: route.meta.menuId || route.name,
        name: route.name,
        title: route.meta.title,
        type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
        iframeUrl: route.meta.iframeUrl || '',
        params: route.params,
        query: route.query
      }
      mainTabs.value = (mainTabs as any).value.concat(tab)
    }
    menuActiveName.value = tab.menuId + ''
    mainTabsActiveName.value = tab.name
  }
}

routeHandle(route)

watch(route, routeHandle)
</script>
<style scoped lang="scss">
.main-sidebar {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  z-index: 1020;
  width: 230px;
  overflow: hidden;
  background-color: #263238;

  .sidebar-body {
    position: relative;
    z-index: 1;
    width: 250px;
    height: 100%;
    padding-bottom: 15px;
    overflow-y: scroll;
  }

  .el-menu {
    border-right: none;
  }
}
.main-sidebar--fold {
  .main-sidebar,
  .el-menu.sidebar-menu {
    width: 64px;
  }
}
</style>
