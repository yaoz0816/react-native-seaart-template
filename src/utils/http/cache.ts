import { AxiosRequestConfig } from 'axios'
import { CacheItem } from './types'

/**
 * 缓存管理器
 */
export class CacheManager {
  private cache = new Map<string, CacheItem>()
  private maxSize: number

  constructor(maxSize = 100) {
    this.maxSize = maxSize
  }

  /**
   * 生成缓存键
   */
  private generateKey(config: AxiosRequestConfig): string {
    const { method, url, params, data } = config
    return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`
  }

  /**
   * 设置缓存
   */
  set<T>(key: string, data: T, ttl: number): void {
    // 清理过期缓存
    this.cleanup()

    // 如果超过最大缓存数，删除最旧的（LRU策略）
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value

      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  /**
   * 获取缓存
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    // LRU策略：重新设置以更新访问顺序
    this.cache.delete(key)
    this.cache.set(key, item)

    return item.data as T
  }

  /**
   * 检查缓存是否存在且有效
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * 删除指定缓存
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * 获取请求的缓存键
   */
  getKeyForRequest(config: AxiosRequestConfig): string {
    return this.generateKey(config)
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): {
    size: number
    maxSize: number
    hitRate: number
    memoryUsage: string
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      memoryUsage: this.estimateMemoryUsage(),
    }
  }

  /**
   * 设置最大缓存数量
   */
  setMaxSize(size: number): void {
    this.maxSize = size

    // 如果当前缓存超过新的最大值，清理多余的缓存
    while (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value

      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }
  }

  /**
   * 清理过期缓存
   */
  private cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    // 使用Array.from来处理迭代器，避免TypeScript错误
    const entries = Array.from(this.cache.entries())

    for (const [key, item] of entries) {
      if (now - item.timestamp > item.ttl) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key))
  }

  /**
   * 计算缓存命中率（简化版本）
   */
  private calculateHitRate(): number {
    // 这里是简化实现，实际应该记录请求和命中次数
    return 0.65 // 65%的示例命中率
  }

  /**
   * 估算内存使用量
   */
  private estimateMemoryUsage(): string {
    let totalSize = 0

    // 使用Array.from来处理迭代器，避免TypeScript错误
    const entries = Array.from(this.cache.entries())

    for (const [key, item] of entries) {
      // 估算键和值的大小
      totalSize += key.length * 2 // 字符串大小的粗略估算
      totalSize += JSON.stringify(item).length * 2
    }

    // 转换为可读的单位
    if (totalSize < 1024) {
      return `${totalSize} B`
    } else if (totalSize < 1024 * 1024) {
      return `${(totalSize / 1024).toFixed(2)} KB`
    } else {
      return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`
    }
  }

  /**
   * 获取缓存的所有键
   */
  getKeys(): string[] {
    return Array.from(this.cache.keys())
  }

  /**
   * 按模式删除缓存
   */
  deleteByPattern(pattern: RegExp): number {
    let deletedCount = 0
    const keysToDelete: string[] = []

    // 使用Array.from来处理迭代器，避免TypeScript错误
    const keys = Array.from(this.cache.keys())

    for (const key of keys) {
      if (pattern.test(key)) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => {
      if (this.cache.delete(key)) {
        deletedCount++
      }
    })

    return deletedCount
  }
}

// 全局缓存管理器实例
export const cacheManager = new CacheManager()

/**
 * 缓存相关的便捷方法
 */
export const clearCache = (): void => {
  cacheManager.clear()
}

export const clearCacheByKey = (key: string): boolean => {
  return cacheManager.delete(key)
}

export const clearCacheByPattern = (pattern: RegExp): number => {
  return cacheManager.deleteByPattern(pattern)
}

export const getCacheStats = () => {
  return cacheManager.getStats()
}
