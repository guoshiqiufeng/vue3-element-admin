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
      load-data-url="/system/user/page"
      delete-data-u-rl="/system/user"
      primary-key="userId"
      @addBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #restPassword="scope">
        <el-button
          size="small"
          type="text"
          @click="handleRestPassword(scope.row.userId)"
        >
          重置密码
        </el-button>
      </template>
    </page-content>
    <page-model
      ref="pageModelRef"
      :default-info="defaultInfo"
      :modal-config="modalConfigComputed"
      data-url="/system/user"
      primary-key="userId"
      @saveBefore="handleSaveDataBefore"
      @complete="refreshPageContentData"
    >
    </page-model>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/use-page-search'

import { contentTableConfig } from './config/content.config'

import { modalConfig } from './config/model.config'
import { formItemHidden, usePageModel } from '@/hooks/use-page-model'
import { getInfoData } from '@/service/module/base/base'
import { Md5 } from 'ts-md5'
import { resetPassword } from '@/service/module/user/user'
import { ElMessage } from 'element-plus'

const store = useStore()

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    formItemHidden(modalConfigRef, 'password', false)
    formItemHidden(modalConfigRef, 'confirmPassword', false)
    defaultInfo.value.status = 1
    defaultInfo.value.orderNum = 0
  },
  item => {
    formItemHidden(modalConfigRef, 'password', true)
    formItemHidden(modalConfigRef, 'confirmPassword', true)
    getInfoData(`/system/user/${item.userId}`).then(res => {
      if (res && res.data) {
        setTimeout(() => {
          res.data.password = null
          res.data.confirmPassword = null
          pageModelRef.value.formData = res.data
        }, 100)
      }
    })
  }
)

// modal
const modalConfigRef = reactive(modalConfig)

const modalConfigComputed = computed(() => {
  return modalConfigRef
})

const handleSaveDataBefore = (
  formData: any,
  callback: (success: boolean, message?: string, formData?: any) => any
) => {
  if (!formData.userId) {
    // check password
    if (formData.password !== formData.confirmPassword) {
      callback(false, '确认密码与密码输入不一致')
      return
    }
    const salt = store.state.app.salt
    formData.password = Md5.hashStr(formData.password + salt)
  }
  callback(true, '', formData)
  return
}

const refreshPageContentData = () => {
  pageContentRef.value.pageInfo = { currentPage: 1, pageSize: 10 }
}

const handleRestPassword = (userId: string) => {
  resetPassword(userId).then(res => {
    if (res && res.code === 20000) {
      ElMessage({
        message: '操作成功',
        type: 'success',
        duration: 1500,
        onClose: refreshPageContentData
      })
    }
  })
}
</script>
<style scoped lang="scss"></style>
