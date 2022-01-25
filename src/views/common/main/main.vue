<template>
  <div class="main" :class="{ 'main-sidebar--fold': sidebarFold }">
    <main-navbar />
    <main-sidebar />
    <div class="content" :style="{ 'min-height': documentClientHeight + 'px' }">
      <main-content />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
// 右上导航条
import MainNavbar from './cpns/main-navbar.vue'
// 左侧菜单
import MainSidebar from './cpns/main-sidebar.vue'
// 右部展示内容
import MainContent from './cpns/main-content.vue'
const store = useStore()
const documentClientHeight = computed({
  get() {
    return store.state.app.documentClientHeight - 50
  },
  set(val) {
    store.commit('app/changeDocumentClientHeight', val)
  }
})
const sidebarFold = computed(() => {
  return store.state.app.sidebarFold
})
const resetDocumentClientHeight = () => {
  documentClientHeight.value = document.documentElement['clientHeight']
  window.onresize = () => {
    documentClientHeight.value = document.documentElement['clientHeight']
  }
}
resetDocumentClientHeight()
</script>
<style scoped lang="scss">
.main {
  position: relative;
  min-width: 1180px;
  .content {
    position: relative;
    padding-top: 50px;
    margin-left: 230px;
    min-height: 100%;
    background: #f1f4f5;
  }
}
.main-sidebar--fold {
  .content {
    margin-left: 64px;
  }
  :deep(.el-tabs__header) {
    left: 64px;
  }
}
</style>
