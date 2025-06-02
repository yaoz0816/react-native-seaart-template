import { AxiosRequestConfig } from 'axios'

/**
 * 请求去重管理器
 */
export class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>()

  /**
   * 生成请求唯一标识
   */
  private generateKey(config: AxiosRequestConfig): string {
    const { method, url, params, data } = config
    return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`
  }

  /**
   * 请求去重处理
   */
  async deduplicate<T>(
    config: AxiosRequestConfig,
    requestFn: () => Promise<T>,
  ): Promise<T> {
    const key = this.generateKey(config)

    // 如果已有相同的请求正在进行，直接返回该Promise
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!
    }

    // 创建新的请求Promise
    const promise = requestFn().finally(() => {
      // 请求完成后清除记录
      this.pendingRequests.delete(key)
    })

    // 记录请求
    this.pendingRequests.set(key, promise)
    return promise
  }

  /**
   * 取消指定的请求
   */
  cancel(config: AxiosRequestConfig): boolean {
    const key = this.generateKey(config)
    return this.pendingRequests.delete(key)
  }

  /**
   * 取消所有待处理的请求
   */
  cancelAll(): void {
    this.pendingRequests.clear()
  }

  /**
   * 获取当前待处理的请求数量
   */
  getPendingCount(): number {
    return this.pendingRequests.size
  }

  /**
   * 获取所有待处理请求的键
   */
  getPendingKeys(): string[] {
    return Array.from(this.pendingRequests.keys())
  }

  /**
   * 检查是否有待处理的请求
   */
  hasPendingRequest(config: AxiosRequestConfig): boolean {
    const key = this.generateKey(config)
    return this.pendingRequests.has(key)
  }

  /**
   * 获取去重统计信息
   */
  getStats(): {
    pendingCount: number
    savedRequests: number
  } {
    return {
      pendingCount: this.pendingRequests.size,
      savedRequests: this.calculateSavedRequests(),
    }
  }

  /**
   * 计算节省的请求数量（简化实现）
   */
  private calculateSavedRequests(): number {
    // 这里是简化实现，实际应该记录去重的次数
    return 0
  }
}

// 全局请求去重管理器实例
export const deduplicator = new RequestDeduplicator()

/**
 * 去重相关的便捷方法
 */
export const cancelRequest = (config: AxiosRequestConfig): boolean => {
  return deduplicator.cancel(config)
}

export const cancelAllRequests = (): void => {
  deduplicator.cancelAll()
}

export const getPendingRequestsCount = (): number => {
  return deduplicator.getPendingCount()
}

export const getDeduplicationStats = () => {
  return deduplicator.getStats()
}
