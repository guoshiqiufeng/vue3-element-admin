export const contentTableConfig = {
  title: '',
  propList: [
    { prop: 'name', label: '名称', minWidth: '150', align: 'left' },
    { prop: 'icon', label: '图标', minWidth: '100', slotName: 'icon' },
    { prop: 'type', label: '类型', minWidth: '100', slotName: 'type' },
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
  showSelectColumn: true,
  childrenProps: {
    rowKey: 'menuId',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
