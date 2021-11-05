import { defineComponent, ref, computed, reactive, toRefs, onActivated, onMounted, onUnmounted, onDeactivated, watch, Ref, ToRefs } from 'vue'
// import { useStore } from '@/store'
// import { useRoute, useRouter } from 'vue-router'
import request, { ApiConfig, ResponseData } from '@/render/utils/request'
import { errorFormatter } from '@/render/utils/util'

export interface PaginatedListResponseData<T> extends ResponseData {
  data: {
    curPage: number,
    pageNum: number,
    totalNum: number,
    details: Array<T>,
  }
}
interface PaginatedListInput<T> {
  size?: number,
  apiFunction: (params: ApiConfig) => Promise<PaginatedListResponseData<T>>,
  apiParams?: any
}
interface ListOutputVariable<T> {
  page?: number,
  list: Array<T>,
  hasNext?: boolean,
  total?: number,
  errorHint: string,
  errorVisible: boolean,
  loading: boolean,
  loadingRefresh: boolean,
}
/**
 * 分页列表Hook
 * @param obj.apiFunction api函数
 * @param obj.apiParams api参数
 * @param obj.size 分页数
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function paginatedListRepositories<T> ({ apiFunction, apiParams = {}, size = 20 }: PaginatedListInput<T>) {
  const state = reactive({
    page: 1,
    list: [],
    hasNext: true,
    total: 0,
    errorHint: '',
    errorVisible: false,
    loading: false,
    loadingRefresh: false
  } as ListOutputVariable<T>)
  async function getList (): Promise<void> {
    state.errorHint = ''
    state.loading = true
    state.errorVisible = false
    try {
      const { data } = await apiFunction({
        params: {
          pageIndex: state.page,
          pageSize: size,
          ...apiParams.value
        },
        showToast: false
      })
      const { curPage, pageNum, totalNum, details } = data || {}
      state.page = curPage + 1
      state.hasNext = curPage < pageNum
      state.total = totalNum
      state.list = state.list.concat(reactive(details))
    } catch (error) {
      state.errorVisible = true
      state.errorHint = errorFormatter(error, apiFunction.name)
    }
    state.loading = false
  }
  function init () {
    state.loading = false
    state.page = 1
    state.hasNext = true
    state.total = 0
    state.list = []
    state.errorHint = ''
    state.errorVisible = false
  }
  async function handleRefresh () {
    state.loadingRefresh = true
    init()
    await getList()
    state.loadingRefresh = false
  }
  watch(
    () => apiParams.value,
    (newValue, oldValue) => {
      /* ... */
      // console.log('watch2 apiParams :>> ', newValue, oldValue)
      if (newValue) {
        init()
        getList()
      }
    }, { immediate: false }
  )
  // onMounted(getList)
  return {
    ...toRefs(state),
    getList,
    init,
    handleRefresh
  }
}
export interface NormalListResponseData<T> extends ResponseData {
  data: Array<T>
}
interface NormalListInput<T> {
  size?: number,
  apiFunction: (params: ApiConfig) => Promise<NormalListResponseData<T>>,
  apiParams?: any
}
/**
 * 普通列表Hook
 * @param obj.apiFunction api函数
 * @param obj.apiParams api参数
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function normalListRepositories<T> ({ apiFunction, apiParams = {} }: NormalListInput<T>) {
  const state = reactive({
    list: [],
    errorHint: '',
    errorVisible: false,
    loading: false,
    loadingRefresh: false
  } as ListOutputVariable<T>)
  async function getList (): Promise<void> {
    state.errorHint = ''
    state.errorVisible = false
    state.loading = true
    try {
      const { data } = await apiFunction({
        params: {
          ...apiParams.value
        },
        showToast: false
      })
      state.list = reactive(data)
    } catch (error) {
      state.errorVisible = true
      state.errorHint = errorFormatter(error, apiFunction.name)
    }
    state.loading = false
  }
  function init () {
    state.loading = false
    state.list = []
    state.errorHint = ''
    state.errorVisible = false
  }
  async function handleRefresh () {
    state.loadingRefresh = true
    init()
    await getList()
    state.loadingRefresh = false
  }
  watch(
    () => apiParams.value,
    (newValue, oldValue) => {
      /* ... */
      // console.log('watch2 apiParams :>> ', newValue, oldValue)
      if (newValue) {
        init()
        getList()
      }
    }, { immediate: false }
  )
  // onMounted(getList)
  // onMounted(getList)
  return {
    ...toRefs(state),
    getList,
    init,
    handleRefresh
  }
}
export interface DetailResponseData<T> extends ResponseData {
  data: T
}
interface DetailInput<IN, OUT> {
  apiFunction: (params: ApiConfig) => Promise<DetailResponseData<OUT>>,
  apiParams?: IN | any,
  options?: ApiConfig
}
/**
 * 普通列表Hook
 * @param obj.apiFunction api函数
 * @param obj.apiParams api参数
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function detailRepositories<IN, OUT> ({ apiFunction, apiParams = {}, options }: DetailInput<IN, OUT>) {
  const state = reactive({
    detail: null,
    loading: false,
    loadingRefresh: false,
    errorHint: ''
  } as {
    detail: OUT | null,
    loading: boolean,
    loadingRefresh: boolean,
    errorHint: string
  })
  async function getDetail (): Promise<void> {
    state.loading = true
    state.errorHint = ''
    try {
      const respons = await apiFunction({
        params: {
          ...apiParams.value
        },
        showToast: false,
        ...options
      })
      state.detail = reactive(respons)?.data
    } catch (error) {
      state.errorHint = errorFormatter(error, apiFunction.name)
    }
    state.loading = false
  }
  function init () {
    state.loading = false
    state.detail = null
    state.errorHint = ''
  }
  async function handleRefresh () {
    state.loadingRefresh = true
    init()
    await getDetail()
    state.loadingRefresh = false
  }
  watch(
    () => apiParams.value,
    (newValue, oldValue) => {
      /* ... */
      console.log('detailRepositories apiParams :>> ', newValue, oldValue)
      if (newValue) {
        init()
        getDetail()
      }
    }, { immediate: false }
  )
  // onMounted(getList)
  // onMounted(getList)
  return {
    ...toRefs(state),
    getDetail,
    init,
    handleRefresh
  }
}
