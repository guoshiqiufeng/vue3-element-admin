<template>
  <div class="menu">
    <page-content
      :content-table-config="contentTableConfig"
      load-data-url="/system/menu/list"
      ref="pageContentRef"
      @pageDataLoad="handlePageLoad"
      @addBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @deleteBtnClick="handleDeleteData"
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
      data-url="/system/menu"
      primary-key="menuId"
      @complete="saveDataCompleteHandle"
    >
      <template #parentName="scope">
        <el-popover
          ref="menuListPopoverRef"
          placement="bottom-start"
          virtual-triggering
          trigger="click"
        >
          <el-tree
            :data="menuData.menuList"
            :props="menuData.menuListTreeProps"
            ref="menuTreeRef"
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
      <template #icon="scope">
        <el-popover
          ref="iconListPopover"
          placement="bottom-start"
          trigger="click"
          width="433px"
          virtual-triggering
          popper-class="menu__icon-popover"
        >
          <div class="menu__icon-inner">
            <div class="menu__icon-list">
              <el-button
                v-for="(item, index) in iconData.iconList"
                :key="index"
                @click="iconActiveHandle(item, scope.row)"
                :class="{ 'is-active': item === scope.row.icon }"
              >
                <icon-svg :name="item"></icon-svg>
              </el-button>
            </div>
          </div>
        </el-popover>
        <el-input
          v-model="scope.row.icon"
          v-popover="iconListPopover"
          :readonly="true"
          placeholder="菜单图标名称"
          class="icon-list__input"
        ></el-input>
      </template>
    </page-model>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import Icon from '@/icons'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/model.config'
import { treeDataTranslate } from '@/utils/map-menus'
import { usePageContent } from '@/hooks/use-page-content'
import { usePageModel } from '@/hooks/use-page-model'
import { getMenuInfo, getMenuSelectData } from '@/service/module/system/menu'
import { deletePageData } from '@/service/module/base/base'
const menuListPopoverRef = ref()
const menuTreeRef = ref()
const iconListPopover = ref()
const menuData = reactive({
  menuListTreeProps: {
    label: 'name',
    children: 'children'
  },
  menuList: []
})
const iconData = reactive({
  iconList: []
})
;(iconData as any).iconList = Icon.getNameList()

const menuListTreeCurrentChangeHandle = (data: any, node: any, row: any) => {
  row.parentId = data.menuId
  row.parentName = data.name
  // menuListPopoverRef.value?.hide()
}

const iconActiveHandle = (data: any, row: any) => {
  row.icon = data
}

const saveDataCompleteHandle = () => {
  ;(pageContentRef as any).value.pageInfo = { currentPage: 1, pageSize: 10 }
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

const handleDeleteData = (item: any, items: []) => {
  let ids = []
  if (item) {
    ids.push(item.menuId)
  }
  if (items) {
    ids = items.map((tmp: any) => {
      return tmp.menuId
    })
  }
  if (ids.length === 0) {
    return
  }
  deletePageData('/system/menu', ids).then((res: any) => {
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

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    ;(defaultInfo as any).value.type = 1
    ;(defaultInfo as any).value.orderNum = 0
    loadMenuData()
  },
  item => {
    getMenuInfo(item.menuId).then(res => {
      if (res && res.data) {
        setTimeout(() => {
          menuTreeRef.value.setCurrentKey(res.data.parentId)
          res.data.parentName = (menuTreeRef.value.getCurrentNode() || {})[
            'name'
          ]
          ;(pageModelRef as any).value.formData = res.data
        }, 100)
      }
    })
    loadMenuData()
  }
)
</script>
<style scoped lang="scss">
.menu {
  .menu-list__input,
  .icon-list__input {
    :deep(.el-input__inner) {
      cursor: pointer;
    }
  }
  &__icon-inner {
    width: 448px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__icon-list {
    width: 448px;
    padding: 0;
    margin: -8px 0 0 -8px;
    .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      :deep(span) {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
</style>
