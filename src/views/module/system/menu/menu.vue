<template>
  <div class="menu">
    <page-content
      :content-table-config="contentTableConfig"
      load-data-url="/system/menu/list"
      ref="pageContentRef"
      @pageDataLoad="handlePageLoad"
      @addBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #icon="scope">
        <icon-svg :name="scope.row.icon || ''"></icon-svg>
      </template>
      <template #type="scope">
        <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
        <el-tag v-else-if="scope.row.type === 1" size="small" type="success">
          菜单
        </el-tag>
        <el-tag v-else-if="scope.row.type === 2" size="small" type="info">
          按钮
        </el-tag>
      </template>
    </page-content>
    <page-model
      :default-info="defaultInfo"
      ref="pageModelRef"
      :modal-config="modalConfigComputed"
    >
      <template #parentName="scope">
        <el-popover
          ref="menuListPopoverRef"
          placement="bottom-start"
          trigger="click"
        >
          <el-tree
            :data="menuData.menuList"
            :props="menuData.menuListTreeProps"
            node-key="menuId"
            @current-change="
              (data, node) =>
                menuListTreeCurrentChangeHandle(data, node, scope.row)
            "
            :default-expanded-keys="[1]"
            :highlight-current="true"
            :expand-on-click-node="false"
          >
          </el-tree>
        </el-popover>
        <el-input
          v-model="scope.row.parentName"
          v-popover="menuListPopoverRef"
          :readonly="true"
          placeholder="点击选择上级菜单"
          class="menu-list__input"
        ></el-input>
      </template>
    </page-model>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/model.config'
import { treeDataTranslate } from '@/utils/map-menus'
import { usePageContent } from '@/hooks/use-page-content'
import { usePageModel } from '@/hooks/use-page-model'
import { getMenuSelectData } from '@/service/module/system/menu'
const menuListPopoverRef = ref()
const menuData = reactive({
  menuListTreeProps: {
    label: 'name',
    children: 'children'
  },
  menuList: []
})

const menuListTreeCurrentChangeHandle = (data: any, node: any, row: any) => {
  row.parentId = data.menuId
  row.parentName = data.name
  menuListPopoverRef.value.hide()
}

const modalConfigRef = reactive(modalConfig)
const pageLoadCallback = (data: any) => {
  return treeDataTranslate(data, 'menuId')
}
const [pageContentRef, handlePageLoad] = usePageContent(pageLoadCallback)

const typeChange = (value: any) => {
  const typeItem = modalConfigRef.formItems.find(item => item.field === 'type')
  const nameItem = modalConfigRef.formItems.find(item => item.field === 'name')
  const urlItem = modalConfigRef.formItems.find(item => item.field === 'url')
  const permsItem = modalConfigRef.formItems.find(
    item => item.field === 'perms'
  )
  const orderNumItem = modalConfigRef.formItems.find(
    item => item.field === 'orderNum'
  )
  const iconItem = modalConfigRef.formItems.find(item => item.field === 'icon')
  const labelTmp = '名称'
  const option = typeItem!.options!.find(item => item.value === value)
  nameItem!.label = option.title + labelTmp
  nameItem!.placeholder = option.title + labelTmp
  urlItem!.isHidden = value !== 1
  permsItem!.isHidden = value === 0
  orderNumItem!.isHidden = value === 2
  iconItem!.isHidden = value === 2
}

const modalConfigComputed = computed(() => {
  const typeItem = modalConfigRef.formItems.find(item => item.field === 'type')
  typeItem!.change = typeChange
  return modalConfigRef
})

const loadMenuData = () => {
  getMenuSelectData().then(res => {
    if (res && res.data) {
      ;(menuData as any).menuList = treeDataTranslate(res.data, 'menuId')
    }
  })
}

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    ;(defaultInfo as any).value.type = 1
    ;(defaultInfo as any).value.orderNum = 0
    loadMenuData()
  },
  item => {
    console.log('edit')
    console.log(item)
    console.log((defaultInfo as any).value)
    loadMenuData()
  }
)
</script>
<style scoped lang="scss">
.menu {
}
</style>
