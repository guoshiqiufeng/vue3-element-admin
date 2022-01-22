<template>
  <div class="page-search">
    <hq-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <el-button @click="handleResetClick"> 重置 </el-button>
        <el-button type="primary" @click="handleQueryClick"> 搜索 </el-button>
      </template>
    </hq-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import HqForm from '@/base-ui/form'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['resetBtnClick', 'queryBtnClick'])

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

const handleResetClick = () => {
  formData.value = formOriginData
  emits('resetBtnClick')
}

const handleQueryClick = () => {
  emits('queryBtnClick', formData.value)
}
</script>
<style scoped lang="scss">
.page-search {
}
</style>
