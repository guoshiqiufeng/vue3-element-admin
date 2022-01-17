<template>
  <div class="main-content" :class="{ 'content-tabs': route.meta.isTab }">
    <el-tabs
      v-if="route.meta.isTab"
      v-model="mainTabsActiveName"
      closable
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle"
    >
      <el-dropdown class="site-tabs__tools" :show-timeout="0">
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="tabsCloseCurrentHandle"
              >关闭当前标签页</el-dropdown-item
            >
            <el-dropdown-item @click="tabsCloseOtherHandle"
              >关闭其它标签页</el-dropdown-item
            >
            <el-dropdown-item @click="tabsCloseAllHandle"
              >关闭全部标签页</el-dropdown-item
            >
            <el-dropdown-item @click="refresh()"
              >刷新当前标签页</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <el-card :body-style="siteContentViewHeight">
          <iframe
            v-if="item.type === 'iframe'"
            :src="item.iframeUrl"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="yes"
          >
          </iframe>
          <template v-else>
            <router-view
              v-slot="{ Component }"
              v-if="item.name === mainTabsActiveName"
            >
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </template>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- 主入口标签页 e -->
    <el-card v-else :body-style="siteContentViewHeight">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { IMainTabs } from '@/store/app/types'
import router from '@/router'
import { isURL } from '@/utils/validate'
const store = useStore()
const route = useRoute()

const documentClientHeight = computed({
  get() {
    return store.state.app.documentClientHeight
  },
  set(val) {
    store.commit('app/changeDocumentClientHeight', val)
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

const siteContentViewHeight = computed(() => {
  var height = (documentClientHeight as any).value - 50 - 30 - 2 - 50
  if (route.meta.isTab) {
    height -= 40
    return isURL((route as any).meta.iframeUrl)
      ? { height: height + 'px' }
      : { minHeight: height + 'px' }
  }
  return { minHeight: height + 'px' }
})

const selectedTabHandle = (tab: IMainTabs) => {
  let tmp = (mainTabs as any).value.filter(
    (item: any) => item.name === tab.name
  )
  if (tmp.length >= 1) {
    router.push({
      name: tmp[0].name,
      query: tmp[0].query,
      params: tmp[0].params
    })
  }
}
const removeTabHandle = (tabName: string) => {
  mainTabs.value = (mainTabs as any).value.filter(
    (item: any) => item.name !== tabName
  )
  if ((mainTabs as any).value.length >= 1) {
    // 当前选中tab被删除
    if (tabName === mainTabsActiveName.value) {
      var tab = mainTabs[mainTabs.value.length - 1]
      router.push({ name: tab.name, query: tab.query, params: tab.params })
      mainTabsActiveName.value = route.name
    }
  } else {
    menuActiveName.value = ''
    router.push({ name: 'home' })
  }
}

const tabsCloseCurrentHandle = () => {
  removeTabHandle(mainTabsActiveName.value + '')
}

const tabsCloseOtherHandle = () => {
  mainTabs.value = (mainTabs as any).value.filter(
    (item: any) => item.name === mainTabsActiveName.value
  )
}

const tabsCloseAllHandle = () => {
  mainTabs.value = []
  menuActiveName.value = ''
  router.push({ name: 'home' })
}
console.log(route.meta)
</script>
<style scoped lang="scss">
.main-content {
  position: relative;
  padding: 15px;
}
.content-tabs {
  padding: 55px 0 0;
}

:deep(.el-tabs__header) {
  position: fixed;
  top: 50px;
  left: 230px;
  right: 0;
  z-index: 930;
  padding: 0 55px 0 15px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
  .el-tabs__nav-wrap {
    margin-bottom: 0;

    &:after {
      display: none;
    }
  }
}
:deep(.el-tabs__content) {
  padding: 0 15px 15px;

  .site-tabs__tools {
    position: fixed;
    top: 50px;
    right: 0;
    z-index: 931;
    height: 40px;
    padding: 0 12px;
    font-size: 16px;
    line-height: 40px;
    background-color: #f1f4f5;
    cursor: pointer;

    .el-icon--right {
      margin-left: 0;
    }
  }
}
</style>
