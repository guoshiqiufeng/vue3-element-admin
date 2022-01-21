import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'userName',
      type: 'input',
      label: '用户名',
      rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '密码',
      rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    },
    {
      field: 'confirmPassword',
      type: 'password',
      label: '确认密码',
      rules: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
    },
    {
      field: 'email',
      type: 'input',
      label: '邮箱',
      placeholder: '邮箱'
    },
    {
      field: 'mobile',
      type: 'input',
      label: '手机号',
      placeholder: '手机号'
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
    {
      field: 'status',
      type: 'radio',
      label: '状态',
      options: [
        {
          title: '禁用',
          value: 0
        },
        {
          title: '正常',
          value: 1
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
