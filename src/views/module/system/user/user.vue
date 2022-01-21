<template>
  <div class="user">
    <page-content
      :content-table-config="contentTableConfig"
      load-data-url="/system/user/list"
      delete-data-u-rl="/system/user"
      primary-key="userId"
      ref="pageContentRef"
      @pageDataLoad="handlePageLoad"
      @addBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-model
      :default-info="defaultInfo"
      ref="pageModelRef"
      :modal-config="modalConfigComputed"
      data-url="/system/user"
      primary-key="userId"
      @complete="saveDataCompleteHandle"
    >
    </page-model>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { usePageContent } from '@/hooks/use-page-content'
import { usePageModel } from '@/hooks/use-page-model'

import { modalConfig } from './config/model.config'

const [pageContentRef, handlePageLoad] = usePageContent(undefined)

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    ;(defaultInfo as any).value.status = 1
    ;(defaultInfo as any).value.orderNum = 0
  },
  undefined
)

// modal
const modalConfigRef = reactive(modalConfig)

const modalConfigComputed = computed(() => {
  return modalConfigRef
})

const saveDataCompleteHandle = () => {
  ;(pageContentRef as any).value.pageInfo = { currentPage: 1, pageSize: 10 }
}
</script>
<style scoped lang="scss"></style>
