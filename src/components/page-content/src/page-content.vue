<template>
  <div class="page-content">
    <hq-table
      :listData="data.dataList"
      :listCount="data.count"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick"> 新增 </el-button>
      </template>

      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-buttons">
          <el-button
            icon="el-icon-edit"
            size="small"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            icon="el-icon-delete"
            size="small"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hq-table>
  </div>
</template>

<script lang="ts" setup>
import HqTable from '@/base-ui/table'
import {
  defineProps,
  defineEmits,
  ref,
  reactive,
  watch,
  defineExpose
} from 'vue'

import { getPageListData } from '@/service/module/system/system'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  loadDataUrl: {
    type: String,
    require: true
  }
})
const emits = defineEmits([
  'pageDataLoad',
  'addBtnClick',
  'editBtnClick',
  'deleteBtnClick'
])

// const isCreate = usePermission(props.pageName, 'create')
// const isUpdate = usePermission(props.pageName, 'update')
// const isDelete = usePermission(props.pageName, 'delete')
// const isQuery = usePermission(props.pageName, 'query')

const pageInfo = ref({ currentPage: 1, pageSize: 10 })
let data = reactive({
  dataList: [],
  count: 0
})

watch(pageInfo, () => getPageData())
const setPageData = (pageData: any) => {
  console.log(pageData)
  data.dataList = pageData
  data.count = pageData.length
}
const getPageData = async (queryInfo: any = {}) => {
  // if (!isQuery) return
  let url = props.loadDataUrl
  if (!url) {
    console.log('loadDataUrl is empty')
    return
  }
  const pageResult = await getPageListData(url, {
    page: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
    limit: pageInfo.value.pageSize,
    ...queryInfo
  })
  if (pageResult && pageResult.data) {
    setPageData(pageResult.data)
    emits('pageDataLoad', pageResult.data)
  }
}
getPageData()

// 获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

const handleDeleteClick = (item: any) => {
  emits('deleteBtnClick', item)
}

const handleNewClick = () => {
  emits('addBtnClick')
}
const handleEditClick = (item: any) => {
  emits('editBtnClick', item)
}
defineExpose({
  setPageData
})
</script>
<style scoped lang="scss">
.page-content {
}
</style>
