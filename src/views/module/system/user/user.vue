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
    </page-content>
    <page-model
      ref="pageModelRef"
      :default-info="defaultInfo"
      :modal-config="modalConfigComputed"
      data-url="/system/user"
      primary-key="userId"
      @saveBefore="saveDataBeforeHandle"
      @complete="saveDataCompleteHandle"
    >
    </page-model>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/use-page-search'

import { contentTableConfig } from './config/content.config'

import { modalConfig } from './config/model.config'
import { usePageModel } from '@/hooks/use-page-model'
import { getInfoData } from '@/service/module/base/base'
import { Md5 } from 'ts-md5'

const store = useStore()

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    const passwordItem = modalConfigRef.formItems.find(
      formItem => formItem.field === 'password'
    )
    passwordItem!.isHidden = false
    const confirmPasswordItem = modalConfigRef.formItems.find(
      formItem => formItem.field === 'confirmPassword'
    )
    confirmPasswordItem!.isHidden = false
    defaultInfo.value.status = 1
    defaultInfo.value.orderNum = 0
  },
  item => {
    const passwordItem = modalConfigRef.formItems.find(
      formItem => formItem.field === 'password'
    )
    passwordItem!.isHidden = true
    const confirmPasswordItem = modalConfigRef.formItems.find(
      formItem => formItem.field === 'confirmPassword'
    )
    confirmPasswordItem!.isHidden = true
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

const saveDataBeforeHandle = (
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

const saveDataCompleteHandle = () => {
  pageContentRef.value.pageInfo = { currentPage: 1, pageSize: 10 }
}
</script>
<style scoped lang="scss"></style>
