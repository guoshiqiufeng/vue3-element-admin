import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'type',
      type: 'radio',
      label: '类型',
      rules: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
      options: [
        {
          title: '目录',
          value: 0
        },
        {
          title: '菜单',
          value: 1
        },
        {
          title: '按钮',
          value: 2
        }
      ]
    },
    {
      field: 'name',
      type: 'input',
      label: '菜单名称',
      placeholder: '菜单名称',
      rules: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]
    },
    {
      field: 'parentName',
      type: 'input',
      label: '上级菜单',
      rules: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单路由',
      placeholder: '菜单路由',
      isHidden: false
    },
    {
      field: 'perms',
      type: 'input',
      label: '授权标识',
      placeholder: '多个用逗号分隔, 如: user:list,user:create',
      isHidden: false
    },
    {
      field: 'orderNum',
      type: 'input-number',
      label: '排序号',
      isHidden: false,
      otherOptions: {
        min: 0,
        step: 1,
        controlsPosition: 'right'
      }
    },
    { field: 'icon', type: 'input', label: '菜单图标', isHidden: false }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
