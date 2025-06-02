import { setToken } from '@/utils/http'
import { useEffect } from 'react'
import {
  usePaginatedData,
  useRecommendData,
  useSearchableList,
} from './usePaginatedData'

/**
 * 演示正确的Token设置方式
 * 建议在用户登录后调用此函数
 */
export function initializeAuth(token: string) {
  setToken(token)
}

/**
 * 示例：基础分页数据使用
 */
export function useBasicPaginatedData() {
  return usePaginatedData({
    url: '/api/v1/posts',
    initialParams: {
      category: 'all',
      status: 'published',
    },
    pageSize: 10,
    autoLoad: true,
    cacheKey: 'posts_list',
  })
}

/**
 * 示例：带搜索功能的列表
 */
export function useSearchablePosts() {
  return useSearchableList('/api/v1/posts/search', 'keyword', {
    pageSize: 15,
    cacheKey: 'search_posts',
  })
}

/**
 * 示例：用户列表Hook
 */
export function useUserList(filters?: { role?: string; status?: string }) {
  return usePaginatedData({
    url: '/api/v1/users',
    initialParams: {
      role: 'all',
      status: 'active',
      ...filters,
    },
    pageSize: 20,
    cacheKey: 'user_list',
    debounceMs: 500,
  })
}

/**
 * 示例：产品分类Hook
 */
export function useProductCategories() {
  return usePaginatedData({
    url: '/api/v1/products/categories',
    pageSize: 50,
    cacheKey: 'product_categories',
    // 分类数据变化不频繁，可以不自动加载
    autoLoad: false,
  })
}

/**
 * 示例：实时数据Hook（不使用缓存）
 */
export function useRealTimeNotifications() {
  return usePaginatedData({
    url: '/api/v1/notifications',
    pageSize: 20,
    // 实时数据不使用缓存
    cacheKey: undefined,
    debounceMs: 100, // 更短的防抖时间
  })
}

/**
 * 完整的Hook使用示例
 */
export function useCompleteExample() {
  // 1. 推荐数据
  const [recommendState, recommendActions] = useRecommendData()

  // 2. 搜索功能
  const searchResult = useSearchablePosts()

  // 3. 用户列表
  const [userState, userActions] = useUserList({ role: 'admin' })

  // 示例：Token设置（通常在登录成功后）
  useEffect(() => {
    // 从AsyncStorage或其他地方获取token
    const savedToken = 'your-saved-token'
    if (savedToken) {
      initializeAuth(savedToken)
    }
  }, [])

  // 示例：手动触发操作
  const handleRefreshRecommend = async () => {
    try {
      await recommendActions.refresh()
      console.log('✅ 推荐数据刷新成功')
    } catch (error) {
      console.error('❌ 刷新失败:', error)
    }
  }

  const handleSearchPosts = (keyword: string) => {
    searchResult.search(keyword)
  }

  const handleLoadMoreUsers = async () => {
    if (userState.hasMore && !userState.loading) {
      try {
        await userActions.loadMore()
      } catch (error) {
        console.error('❌ 加载更多失败:', error)
      }
    }
  }

  return {
    // 推荐数据
    recommend: {
      ...recommendState,
      refresh: handleRefreshRecommend,
      loadMore: recommendActions.loadMore,
    },

    // 搜索
    search: {
      ...searchResult,
      performSearch: handleSearchPosts,
    },

    // 用户列表
    users: {
      ...userState,
      loadMore: handleLoadMoreUsers,
      refresh: userActions.refresh,
    },
  }
}

export default useCompleteExample
