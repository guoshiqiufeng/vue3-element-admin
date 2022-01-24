import { ref } from 'vue'
import PageContent from '@/components/page-content'

type CallbackFn = (item?: any) => void

export function usePageContent(
  pageCb?: CallbackFn,
  pageContentRef?: InstanceType<typeof PageContent>
) {
  if (!pageContentRef) {
    pageContentRef = ref<InstanceType<typeof PageContent>>({})
  }
  const handlePageData = (data: any) => {
    if (pageCb && pageCb(data)) {
      data = pageCb && pageCb(data)
      pageContentRef.value.setPageData(data)
    }
  }
  return [pageContentRef, handlePageData]
}
