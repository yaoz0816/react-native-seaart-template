import { TokenRefreshQueueItem } from './types'

/**
 * Token 管理器
 */
export class TokenManager {
  private token: string | null = null
  private refreshToken: string | null = null
  private isRefreshing = false
  private failedQueue: TokenRefreshQueueItem[] = []

  /**
   * 设置Token
   */
  setToken(token: string, refreshToken?: string): void {
    this.token = token

    if (refreshToken) {
      this.refreshToken = refreshToken
    }
  }

  /**
   * 获取Token
   */
  getToken(): string | null {
    return this.token
  }

  /**
   * 获取刷新Token
   */
  getRefreshToken(): string | null {
    return this.refreshToken
  }

  /**
   * 清除Token
   */
  clearToken(): void {
    this.token = null
    this.refreshToken = null
    this.isRefreshing = false
    // 清空等待队列
    this.failedQueue.forEach(({ reject }) => {
      reject(new Error('Token已清除'))
    })
    this.failedQueue = []
  }

  /**
   * 检查Token是否存在
   */
  hasToken(): boolean {
    return !!this.token
  }

  /**
   * 检查是否正在刷新Token
   */
  isTokenRefreshing(): boolean {
    return this.isRefreshing
  }

  /**
   * Token刷新机制
   */
  async refreshTokenIfNeeded(): Promise<string | null> {
    if (!this.refreshToken) {
      throw new Error('没有可用的刷新Token')
    }

    if (this.isRefreshing) {
      // 如果正在刷新，返回一个Promise，等待刷新完成
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      })
    }

    this.isRefreshing = true

    try {
      // TODO: 实现实际的token刷新逻辑
      // const response = await this.refreshTokenAPI()
      // const newToken = response.accessToken
      // const newRefreshToken = response.refreshToken

      // 模拟刷新逻辑
      const newToken = 'new_access_token'
      const newRefreshToken = 'new_refresh_token'

      this.setToken(newToken, newRefreshToken)

      // 处理等待队列
      this.failedQueue.forEach(({ resolve }) => {
        resolve(newToken)
      })
      this.failedQueue = []

      this.isRefreshing = false
      return newToken
    } catch (error) {
      // 刷新失败，清除所有Token
      this.clearToken()
      throw error
    }
  }

  /**
   * 添加到等待队列
   */
  addToRefreshQueue(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.failedQueue.push({ resolve, reject })
    })
  }
}

// 全局Token管理器实例
export const tokenManager = new TokenManager()

/**
 * Token相关的便捷方法
 */
export const setToken = (token: string, refreshToken?: string): void => {
  tokenManager.setToken(token, refreshToken)
}

export const getToken = (): string | null => {
  return tokenManager.getToken()
}

export const clearToken = (): void => {
  tokenManager.clearToken()
}

export const hasToken = (): boolean => {
  return tokenManager.hasToken()
}

export const refreshToken = async (): Promise<string | null> => {
  return tokenManager.refreshTokenIfNeeded()
}
