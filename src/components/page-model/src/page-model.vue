<template>
  <div class="page-add-or-update">
    <el-dialog v-model="dialogVisible" :title="dialogTitle" destroy-on-close>
      <hq-form v-bind="modalConfig" ref="formRef" v-model="formData">
        <template
          v-for="item in otherPropSlots"
          :key="item.prop"
          #[item.slotName]
        >
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="formData"></slot>
          </template>
        </template>
      </hq-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineExpose, defineProps, ref, watch } from 'vue'

import HqForm from '@/base-ui/form'
import { createPageData, editPageData } from '@/service/module/base/base'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  primaryKey: {
    type: String,
    default: 'id'
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  dataUrl: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['complete'])

const dialogVisible = ref(false)
const dialogTitle = ref('新增')
const formData = ref<any>({})
const formRef = ref<any>({})
watch(
  () => props.defaultInfo,
  newValue => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

// 获取其他的动态插槽名称
const otherPropSlots = props.modalConfig?.formItems.filter(() => {
  return true
})

const handleConfirmClick = () => {
  formRef.value?.formRef.validate((isValid: any) => {
    if (isValid) {
      if (props.dataUrl) {
        if (props.defaultInfo[props.primaryKey]) {
          // 编辑
          editPageData(props.dataUrl, {
            ...formData.value
          }).then(res => {
            if (res && res.code === 20000) {
              dialogVisible.value = false
              emits('complete', 'edit')
              ElMessage({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
            }
          })
        } else {
          createPageData(props.dataUrl, {
            ...formData.value
          }).then(res => {
            if (res && res.code === 20000) {
              dialogVisible.value = false
              emits('complete', 'create')
              ElMessage({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
            }
          })
        }
      } else {
        console.warn('data-url is empty')
      }
    }
  })
}
defineExpose({
  dialogVisible,
  dialogTitle,
  formData
})
</script>

<style scoped></style>
