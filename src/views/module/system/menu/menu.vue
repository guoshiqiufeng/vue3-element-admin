<template>
  <div class="menu">
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      :load-data-url="MenuApi.List"
      :delete-data-u-rl="MenuApi.Domain"
      primary-key="menuId"
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
      ref="pageModelRef"
      :default-info="defaultInfo"
      :modal-config="modalConfigComputed"
      :data-url="MenuApi.Domain"
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
            ref="menuTreeRef"
            :data="menuData.menuList"
            :props="menuData.menuListTreeProps"
            node-key="menuId"
            :default-expanded-keys="[1]"
            :highlight-current="true"
            :expand-on-click-node="false"
            @current-change="
              (data, node) =>
                menuListTreeCurrentChangeHandle(data, node, scope.row)
            "
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
                :class="{ 'is-active': item === scope.row.icon }"
                @click="iconActiveHandle(item, scope.row)"
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
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'
import Icon from '@/icons'

import { MenuApi } from '@/service/module/system/menu'

import { contentTableConfig } from './config/content.config'

import { modalConfig } from './config/model.config'
import { usePageModel } from '@/hooks/use-page-model'

import { treeDataTranslate } from '@/utils/map-menus'
import { getMenuInfo, getMenuSelectData } from '@/service/module/system/menu'
import { usePageSearch } from '@/hooks/use-page-search'
const menuListPopoverRef = ref()
const menuTreeRef = ref()
const iconListPopover = ref()
const menuData = reactive<any>({
  menuListTreeProps: {
    label: 'name',
    children: 'children'
  },
  menuList: []
})
const iconData = reactive<any>({
  iconList: []
})
iconData.iconList = Icon.getNameList()

const menuListTreeCurrentChangeHandle = (data: any, node: any, row: any) => {
  row.parentId = data.menuId
  row.parentName = data.name
  menuListPopoverRef.value?.hide()
}

const iconActiveHandle = (data: any, row: any) => {
  row.icon = data
}

const saveDataCompleteHandle = () => {
  pageContentRef.value.pageInfo = { currentPage: 1, pageSize: 10 }
}

const modalConfigRef = reactive(modalConfig)
const handlePageLoad = (
  data: any,
  callback: (callbackData?: any, totalCount?: number) => any
) => {
  data = treeDataTranslate(data, 'menuId')
  callback(data, 1)
}
const [pageContentRef] = usePageSearch()

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
      menuData.menuList = treeDataTranslate(res.data, 'menuId')
    }
  })
}

const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  () => {
    defaultInfo.value.type = 1
    defaultInfo.value.orderNum = 0
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
          pageModelRef.value.formData = res.data
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
