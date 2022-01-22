<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length >= 1"
    :index="menu.menuId + ''"
  >
    <template #title>
      <el-icon>
        <icon-svg :name="menu.icon || ''" class="sidebar__menu-icon">
        </icon-svg>
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="item in menu.children" :key="item.menuId">
      <sub-menu
        :menu="item"
        :dynamic-menu-routes="dynamicMenuRoutes"
      ></sub-menu>
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="menuRouteHandle(menu)">
    <el-icon>
      <icon-svg :name="menu.icon || ''" class="sidebar__menu-icon"> </icon-svg>
    </el-icon>
    <span>{{ menu.name }}</span>
  </el-menu-item>
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
    (item: any) => item.meta.menuId === menu.menuId
  )
  if (route.length >= 1) {
    router.push({ name: route[0].name })
  }
}
</script>
<style scoped lang="scss">
.sidebar__menu-icon {
  width: 24px;
  margin-right: 5px;
  text-align: center;
  font-size: 16px;
  color: inherit !important;
}
</style>
