import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    const query: any = {}
    for (const key in queryInfo) {
      if (queryInfo[key] || queryInfo[key] === 0) {
        query[key] = queryInfo[key]
      }
    }
    pageContentRef.value?.getPageData(query)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
