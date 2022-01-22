<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      load-data-url="/system/user/list"
      delete-data-u-rl="/system/user"
      primary-key="userId"
      @pageDataLoad="handlePageLoad"
      @addBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-model
      ref="pageModelRef"
      :default-info="defaultInfo"
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
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'

import { contentTableConfig } from './config/content.config'
import { usePageContent } from '@/hooks/use-page-content'

import { modalConfig } from './config/model.config'
import { usePageModel } from '@/hooks/use-page-model'

const [pageContentRef, handlePageLoad] = usePageContent(undefined)

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    defaultInfo.value.status = 1
    defaultInfo.value.orderNum = 0
  },
  undefined
)

// modal
const modalConfigRef = reactive(modalConfig)

const modalConfigComputed = computed(() => {
  return modalConfigRef
})

const saveDataCompleteHandle = () => {
  pageContentRef.value.pageInfo = { currentPage: 1, pageSize: 10 }
}
</script>
<style scoped lang="scss"></style>
