import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallbackFn = (item?: any) => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref<any>({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
      pageModelRef.value.dialogTitle = '新增'
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
      pageModelRef.value.dialogTitle = '编辑'
    }
    editCb && editCb(item)
  }
  return [pageModelRef, defaultInfo, handleNewData, handleEditData]
}

export function formItemHidden(
  modalConfigRef: InstanceType<typeof PageModel>,
  field: string,
  hidden: boolean
) {
  const findItem = modalConfigRef.formItems.find(
    (formItem: any) => formItem.field === field
  )
  findItem!.isHidden = hidden
}
