<template>
  <div class="sub-menu">
    <el-sub-menu
      v-if="menu.list && menu.list.length >= 1"
      :index="menu.menuId + ''"
    >
      <template #title>
        <span>{{ menu.name }}</span>
      </template>
      <sub-menu
        v-for="item in menu.list"
        :key="item.menuId"
        :menu="item"
        :dynamicMenuRoutes="dynamicMenuRoutes"
      >
      </sub-menu>
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="menu.menuId + ''"
      @click="menuRouteHandle(menu)"
    >
      <icon-svg
        :name="menu.icon || ''"
        class="site-sidebar__menu-icon"
      ></icon-svg>
      <span>{{ menu.name }}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import SubMenu from './main-sidebar-sub-menu.vue'
const router = useRouter()
const props = defineProps({
  menu: {
    type: Object,
    required: true
  },
  dynamicMenuRoutes: {
    type: Array,
    required: true
  }
})

const menuRouteHandle = (menu: any) => {
  let route = props.dynamicMenuRoutes.filter(
    item => (item as any).meta.menuId === menu.menuId
  )
  if (route.length >= 1) {
    router.push({ name: (route as any)[0].name })
  }
}
</script>
<style scoped lang="scss">
.sub-menu {
}
</style>
