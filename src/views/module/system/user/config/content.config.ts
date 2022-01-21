export const contentTableConfig = {
  title: '',
  propList: [
    { prop: 'username', label: '用户名', minWidth: '100' },
    { prop: 'nickname', label: '昵称', minWidth: '100', slotName: 'icon' },
    { prop: 'email', label: '邮箱', minWidth: '150', slotName: 'type' },
    { prop: 'mobile', label: '手机号', minWidth: '100' },
    { prop: 'status', label: '状态', minWidth: '150', slotName: 'status' },
    {
      prop: 'createDate',
      label: '创建时间',
      minWidth: '180',
      slotName: 'createDate'
    },
    {
      prop: 'modifyDate',
      label: '更新时间',
      minWidth: '180',
      slotName: 'modifyDate'
    },
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
  showFooter: true
}
