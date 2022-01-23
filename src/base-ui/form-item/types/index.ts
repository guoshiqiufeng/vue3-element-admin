type IFormType =
  | 'input'
  | 'password'
  | 'input-number'
  | 'select'
  | 'datepicker'
  | 'radio'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  readonly?: boolean
  disable?: boolean
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
  slotName?: string
  change?: (value: any) => any
}
