<template>
  <div class="main-sidebar">
    <el-menu
      :default-active="menuActiveName || 'home'"
      :collapseTransition="false"
    >
      <sub-menu
        v-for="menu in menuList"
        :key="menu.menuId"
        :menu="menu"
        :dynamicMenuRoutes="dynamicMenuRoutes"
      ></sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import SubMenu from './main-sidebar-sub-menu.vue'
import { isURL } from '@/utils/validate'

const store = useStore()
const dynamicMenuRoutes = ref([])
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
const routeHandle = route => {
  if (route.meta.isTab) {
    // tab选中, 不存在先添加
    var tab = (mainTabs as any).value.filter(
      item => item.name === route.name
    )[0]
    if (!tab) {
      if (route.meta.isDynamic) {
        route = dynamicMenuRoutes.value.filter(
          item => (item as any).name === route.name
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
}
</style>
