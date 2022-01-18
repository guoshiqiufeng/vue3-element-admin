export const contentTableConfig = {
  title: '',
  propList: [
    { prop: 'name', label: '名称', minWidth: '150', align: 'left' },
    { prop: 'parentName', label: '上级菜单', minWidth: '120' },
    { prop: 'icon', label: '图标', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'orderNum', label: '排序号', minWidth: '100' },
    { prop: 'url', label: '菜单URL', minWidth: '150' },
    { prop: 'perms', label: '授权标识', minWidth: '100' },
    /* {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },*/
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'menuId',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}