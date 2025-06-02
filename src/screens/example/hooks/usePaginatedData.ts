import { post } from '@/utils/http'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 分页数据配置选项
 */
interface UsePaginatedDataOptions {
  url: string
  initialParams?: Record<string, any>
  pageSize?: number
  autoLoad?: boolean
  cacheKey?: string
  debounceMs?: number
}

/**
 * 分页数据状态
 */
interface PaginatedDataState<T> {
  data: T[]
  loading: boolean
  refreshing: boolean
  hasMore: boolean
  page: number
  error: string | null
  isEmpty: boolean
  total: number
}

/**
 * 分页数据操作方法
 */
interface PaginatedDataActions {
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
  reset: () => void
  setParams: (params: Record<string, any>) => void
  retry: () => Promise<void>
}

/**
 * API响应数据结构
 */
interface ApiResponse<T> {
  items?: T[]
  data?: T[]
  list?: T[]
  total?: number
  hasMore?: boolean
  page?: number
  pageSize?: number
}

/**
 * 防抖Hook
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * 分页数据Hook
 */
export function usePaginatedData<T = any>(
  options: UsePaginatedDataOptions,
): [PaginatedDataState<T>, PaginatedDataActions] {
  const {
    url,
    initialParams = {},
    pageSize = 20,
    autoLoad = true,
    cacheKey,
    debounceMs = 300,
  } = options

  // 初始状态
  const initialState: PaginatedDataState<T> = {
    data: [],
    loading: false,
    refreshing: false,
    hasMore: true,
    page: 1,
    error: null,
    isEmpty: false,
    total: 0,
  }

  const [state, setState] = useState<PaginatedDataState<T>>(initialState)
  const [params, setParams] = useState(initialParams)

  // 防抖处理参数变化
  const debouncedParams = useDebounce(params, debounceMs)

  // 使用ref来避免闭包问题
  const currentRequestRef = useRef<AbortController | null>(null)
  const mountedRef = useRef(true)

  // 组件卸载时设置mounted为false
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false

      // 取消正在进行的请求
      if (currentRequestRef.current) {
        currentRequestRef.current.abort()
      }
    }
  }, [])

  // 获取数据的核心方法
  const fetchData = useCallback(
    async (pageNum: number, isRefresh = false, retryAttempt = 0) => {
      // 防止重复请求
      if (currentRequestRef.current && !isRefresh) {
        return
      }

      // 检查是否还有更多数据（非刷新情况）
      if (!isRefresh && !state.hasMore && pageNum > 1) {
        return
      }

      // 取消之前的请求
      if (currentRequestRef.current) {
        currentRequestRef.current.abort()
      }

      // 创建新的取消控制器
      const abortController = new AbortController()
      currentRequestRef.current = abortController

      // 更新加载状态
      if (mountedRef.current) {
        setState((prev) => ({
          ...prev,
          loading: !isRefresh,
          refreshing: isRefresh,
          error: null,
        }))
      }

      try {
        const requestParams = {
          ...debouncedParams,
          page: pageNum,
          page_size: pageSize,
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('📡 Fetching data:', { url, params: requestParams })
        }

        const response: ApiResponse<T> = await post(url, requestParams, {
          cache: cacheKey
            ? {
                key: `${cacheKey}_${JSON.stringify(requestParams)}`,
                ttl: 5 * 60 * 1000, // 5分钟缓存
              }
            : undefined,
          signal: abortController.signal,
        })

        // 检查组件是否还挂载
        if (!mountedRef.current) {
          return
        }

        // 解析响应数据
        const newItems = response.items || response.data || response.list || []
        const total = response.total || 0
        const hasMoreFromResponse = response.hasMore

        // 计算是否还有更多数据
        const hasMoreItems =
          hasMoreFromResponse !== undefined
            ? hasMoreFromResponse
            : total > 0
              ? pageNum * pageSize < total
              : newItems.length >= pageSize

        if (mountedRef.current) {
          setState((prev) => ({
            ...prev,
            data: isRefresh ? newItems : [...prev.data, ...newItems],
            page: pageNum,
            hasMore: hasMoreItems,
            loading: false,
            refreshing: false,
            error: null,
            isEmpty: isRefresh
              ? newItems.length === 0
              : prev.data.length === 0 && newItems.length === 0,
            total: total || prev.total,
          }))
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Data loaded:', {
            itemsCount: newItems.length,
            total,
            hasMore: hasMoreItems,
            page: pageNum,
          })
        }
      } catch (error: any) {
        // 如果是取消请求，不处理错误
        if (error.name === 'AbortError' || error.type === 'CANCEL') {
          return
        }

        console.error('❌ Data fetch error:', error)

        if (mountedRef.current) {
          setState((prev) => ({
            ...prev,
            loading: false,
            refreshing: false,
            error: error.message || '加载失败',
          }))
        }

        // 网络错误自动重试（最多3次）
        if (
          retryAttempt < 2 &&
          (error.type === 'NETWORK' || error.type === 'TIMEOUT')
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔄 Auto retry ${retryAttempt + 1}/3`)
          }

          setTimeout(
            () => {
              fetchData(pageNum, isRefresh, retryAttempt + 1)
            },
            1000 * (retryAttempt + 1),
          ) // 递增延迟
        }
      } finally {
        currentRequestRef.current = null
      }
    },
    [url, debouncedParams, pageSize, cacheKey, state.hasMore], // 优化依赖项
  )

  // 加载更多
  const loadMore = useCallback(async () => {
    if (state.loading || state.refreshing || !state.hasMore || state.error) {
      return
    }

    await fetchData(state.page + 1, false)
  }, [
    fetchData,
    state.loading,
    state.refreshing,
    state.hasMore,
    state.error,
    state.page,
  ])

  // 下拉刷新
  const refresh = useCallback(async () => {
    if (state.refreshing) {
      return
    }

    await fetchData(1, true)
  }, [fetchData, state.refreshing])

  // 重试（在错误状态下使用）
  const retry = useCallback(async () => {
    if (state.loading || state.refreshing) {
      return
    }

    await fetchData(state.page || 1, state.page === 1)
  }, [fetchData, state.loading, state.refreshing, state.page])

  // 重置数据
  const reset = useCallback(() => {
    // 取消正在进行的请求
    if (currentRequestRef.current) {
      currentRequestRef.current.abort()
    }

    setState(initialState)
  }, [])

  // 更新请求参数
  const updateParams = useCallback((newParams: Record<string, any>) => {
    setParams((prev) => ({ ...prev, ...newParams }))
  }, [])

  // 参数变化时重置并重新加载
  useEffect(() => {
    if (autoLoad) {
      // 重置状态并加载第一页
      setState((prev) => ({
        ...initialState,
        loading: prev.data.length === 0, // 如果没有数据则显示loading
      }))
      fetchData(1, true)
    }
  }, [debouncedParams, url, autoLoad]) // 使用防抖后的参数

  // 初始加载
  useEffect(() => {
    if (autoLoad && state.data.length === 0 && !state.loading && !state.error) {
      fetchData(1, true)
    }
  }, []) // 只在组件挂载时执行

  const actions: PaginatedDataActions = {
    loadMore,
    refresh,
    reset,
    setParams: updateParams,
    retry,
  }

  return [state, actions]
}

/**
 * 推荐数据Hook - 专门用于推荐接口
 */
export function useRecommendData() {
  return usePaginatedData<any>({
    url: '/api/v1/square/v3/recommend',
    initialParams: {
      offset: '',
      sub_channel: [null],
      base_models: [],
      model_types: [],
      tag_ids: [],
      order_by: 'recommend',
      timeType: 'All',
    },
    pageSize: 20,
    cacheKey: 'recommend_data',
    debounceMs: 500, // 推荐数据可以稍微长一点的防抖
  })
}

/**
 * 通用列表Hook - 支持搜索
 */
export function useSearchableList<T = any>(
  url: string,
  searchField = 'keyword',
  options?: Partial<UsePaginatedDataOptions>,
) {
  const [searchTerm, setSearchTerm] = useState('')

  const [state, actions] = usePaginatedData<T>({
    url,
    initialParams: {
      [searchField]: '',
    },
    ...options,
    debounceMs: 800, // 搜索需要更长的防抖时间
  })

  const search = useCallback(
    (term: string) => {
      setSearchTerm(term)
      actions.setParams({ [searchField]: term })
    },
    [actions, searchField],
  )

  return {
    ...state,
    ...actions,
    searchTerm,
    search,
    isSearching: !!searchTerm,
  }
}

export default usePaginatedData
