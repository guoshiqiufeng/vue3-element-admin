// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/index.css'
// element-plus
import {
  ElButton,
  ElTabs,
  ElTable,
  ElForm,
  ElInput,
  ElRadio,
  ElCheckbox,
  ElLink,
  ElMenu,
  ElContainer,
  ElAvatar,
  ElDropdown,
  ElSelect,
  ElDatePicker,
  ElCol,
  ElRow,
  ElBreadcrumb,
  ElPagination,
  ElDialog,
  ElIcon
} from 'element-plus'

// element-plus icons
import { Expand, Fold } from '@element-plus/icons-vue'
const { TabPane } = ElTabs
const { TableColumn } = ElTable
const { FormItem } = ElForm
const { CheckboxButton, CheckboxGroup } = ElCheckbox
const { MenuItem, SubMenu } = ElMenu
const { Aside, Header, Footer, Main } = ElContainer
const { DropdownItem, DropdownMenu } = ElDropdown
const { Option } = ElSelect
const { BreadcrumbItem } = ElBreadcrumb
import type { App } from 'vue'
const components = [
  ElButton,
  ElTabs,
  TabPane,
  ElTable,
  TableColumn,
  ElForm,
  FormItem,
  ElInput,
  ElRadio,
  ElCheckbox,
  CheckboxButton,
  CheckboxGroup,
  ElLink,
  ElMenu,
  MenuItem,
  SubMenu,
  ElContainer,
  Aside,
  Header,
  Footer,
  Main,
  ElAvatar,
  ElDropdown,
  DropdownItem,
  DropdownMenu,
  ElSelect,
  ElDatePicker,
  Option,
  ElCol,
  ElRow,
  ElBreadcrumb,
  BreadcrumbItem,
  ElPagination,
  ElDialog,
  ElIcon
]
const icons = [Expand, Fold]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const icon of icons) {
    app.component(icon.name, icon)
  }
}
