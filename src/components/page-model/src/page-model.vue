<template>
  <div class="page-add-or-update">
    <el-dialog :title="dialogTitle" v-model="dialogVisible" destroy-on-close>
      <hq-form v-bind="modalConfig" v-model="formData">
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
import { defineExpose, defineProps, ref, watch } from 'vue'

import HqForm from '@/base-ui/form'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  addDataUrl: {
    type: String,
    default: ''
  },
  editDataUrl: {
    type: String,
    default: ''
  },
  pageName: {
    type: String,
    require: true
  }
})
const dialogVisible = ref(false)
const dialogTitle = ref('新增')
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  newValue => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

// 获取其他的动态插槽名称
const otherPropSlots = props.modalConfig?.formItems.filter((item: any) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    // store.dispatch('system/editPageDataAction', {
    //   pageName: props.pageName,
    //   editData: { ...formData.value, ...props.otherInfo },
    //   id: props.defaultInfo.id
    // })
  } else {
    // store.dispatch('system/createPageDataAction', {
    //   pageName: props.pageName,
    //   newData: { ...formData.value, ...props.otherInfo }
    // })
  }
}
defineExpose({
  dialogVisible,
  dialogTitle
})
</script>

<style scoped></style>
