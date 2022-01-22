interface IPageInfo {
  currentPage: number
  pageSize: number
}

export interface IPageContent {
  setPageData: (pageData: any) => any
  pageInfo: IPageInfo
}
