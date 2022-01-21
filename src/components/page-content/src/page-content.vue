<template>
  <div class="page-content">
    <hq-table
      v-model:page="pageInfo"
      :list-data="data.dataList"
      :list-count="data.count"
      v-bind="contentTableConfig"
      @selectionChange="handleSelectionChange"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick"> 新增 </el-button>
        <el-button
          type="danger"
          :disabled="data.dataListSelections.length <= 0"
          @click="handleAllDeleteClick"
        >
          批量删除
        </el-button>
      </template>

      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createDate="scope">
        <span>{{ $filters.formatTime(scope.row.createDate) }}</span>
      </template>
      <template #modifyDate="scope">
        <span>{{ $filters.formatTime(scope.row.modifyDate) }}</span>
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

import { deletePageData, getPageListData } from '@/service/module/base/base'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus/es'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  loadDataUrl: {
    type: String,
    require: true
  },
  deleteDataURl: {
    type: String,
    default: ''
  },
  primaryKey: {
    type: String,
    default: 'id'
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
  count: 0,
  dataListSelections: []
})

watch(pageInfo, () => getPageData())
const setPageData = (pageData: any) => {
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
    if (item.slotName === 'createDate') return false
    if (item.slotName === 'modifyDate') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

const handleSelectionChange = (val: any) => {
  data.dataListSelections = val
}

const handleDeleteClick = (item: any) => {
  ElMessageBox.confirm(`确定对当前选中项进行[删除]操作?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      handleDeletedConfirm(item)
    })
    .catch(error => {
      console.log(error)
    })
}

const handleAllDeleteClick = (item: any) => {
  ElMessageBox.confirm(`确定对当前选中项进行[删除]操作?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 获取选中项
      handleDeletedConfirm(item, data.dataListSelections)
    })
    .catch(error => {
      console.log(error)
    })
}

const handleDeletedConfirm = (item: any, items?: any) => {
  if (!props.deleteDataURl) {
    emits('deleteBtnClick', item, items)
    return
  }
  let ids = []
  if (item) {
    ids.push(item[props.primaryKey])
  }
  if (items) {
    ids = items.map((tmp: any) => {
      return tmp.userId
    })
  }
  if (ids.length === 0) {
    return
  }
  deletePageData(props.deleteDataURl, ids).then((res: any) => {
    if (res && res.code === 20000) {
      ElMessage({
        message: '操作成功',
        type: 'success',
        duration: 1500,
        onClose: () => {
          pageInfo.value = {
            currentPage: 1,
            pageSize: 10
          }
        }
      })
    }
  })
}

const handleNewClick = () => {
  emits('addBtnClick')
}
const handleEditClick = (item: any) => {
  emits('editBtnClick', item)
}
defineExpose({
  setPageData,
  pageInfo
})
</script>
<style scoped lang="scss">
.page-content {
}
</style>
