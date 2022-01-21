<template>
  <div class="user">
    <page-content
      :content-table-config="contentTableConfig"
      load-data-url="/system/user/list"
      ref="pageContentRef"
      @pageDataLoad="handlePageLoad"
      @addBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @deleteBtnClick="handleDeleteData"
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
import { deletePageData } from '@/service/module/base/base'
import { ElMessage } from 'element-plus'

const [pageContentRef, handlePageLoad] = usePageContent(undefined)

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  undefined,
  undefined
)

const handleDeleteData = (item: any, items: []) => {
  let ids = []
  if (item) {
    ids.push(item.userId)
  }
  if (items) {
    ids = items.map((tmp: any) => {
      return tmp.userId
    })
  }
  if (ids.length === 0) {
    return
  }
  deletePageData('/system/user', ids).then((res: any) => {
    if (res && res.code === 20000) {
      ElMessage({
        message: '操作成功',
        type: 'success',
        duration: 1500,
        onClose: () => {
          ;(pageContentRef as any).value.pageInfo = {
            currentPage: 1,
            pageSize: 10
          }
        }
      })
    }
  })
}
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
