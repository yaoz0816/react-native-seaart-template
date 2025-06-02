import { AxiosResponse } from 'axios'
import { RequestMetrics } from './types'

/**
 * 性能监控器
 */
export class MetricsCollector {
  private metrics: RequestMetrics[] = []
  private maxMetrics: number
  private requestCount = 0
  private successCount = 0
  private errorCount = 0
  private cacheHitCount = 0

  constructor(maxMetrics = 1000) {
    this.maxMetrics = maxMetrics
  }

  /**
   * 开始请求计时
   */
  startRequest(): RequestMetrics {
    this.requestCount++

    const metric: RequestMetrics = {
      startTime: performance.now(),
    }

    return metric
  }

  /**
   * 结束请求计时
   */
  endRequest(
    metric: RequestMetrics,
    response?: AxiosResponse,
    error?: any,
  ): void {
    metric.endTime = performance.now()
    metric.duration = metric.endTime - metric.startTime

    if (response) {
      this.successCount++
      metric.size = this.calculateResponseSize(response)
    } else if (error) {
      this.errorCount++
    }

    if (metric.cached) {
      this.cacheHitCount++
    }

    this.addMetric(metric)

    // 开发环境性能警告
    if (process.env.NODE_ENV === 'development' && metric.duration > 1000) {
      console.warn(`⚠️ 慢请求检测: ${metric.duration.toFixed(2)}ms`)
    }
  }

  /**
   * 添加指标到集合
   */
  private addMetric(metric: RequestMetrics): void {
    this.metrics.push(metric)

    // 保持最大数量限制
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift()
    }
  }

  /**
   * 计算响应体大小
   */
  private calculateResponseSize(response: AxiosResponse): number {
    try {
      return JSON.stringify(response.data).length
    } catch {
      return 0
    }
  }

  /**
   * 获取平均响应时间
   */
  getAverageResponseTime(): number {
    if (this.metrics.length === 0) {
      return 0
    }

    const total = this.metrics.reduce(
      (sum, metric) => sum + (metric.duration || 0),
      0,
    )

    return total / this.metrics.length
  }

  /**
   * 获取最近的指标
   */
  getRecentMetrics(count = 10): RequestMetrics[] {
    return this.metrics.slice(-count)
  }

  /**
   * 获取所有指标
   */
  getAllMetrics(): RequestMetrics[] {
    return [...this.metrics]
  }

  /**
   * 获取统计摘要
   */
  getStatsSummary(): {
    totalRequests: number
    successRate: number
    errorRate: number
    cacheHitRate: number
    averageResponseTime: number
    fastestRequest: number
    slowestRequest: number
    totalDataTransferred: string
    requestsPerMinute: number
  } {
    const durations = this.metrics
      .map((m) => m.duration)
      .filter((d): d is number => d !== undefined)

    const totalSize = this.metrics.reduce(
      (sum, metric) => sum + (metric.size || 0),
      0,
    )

    return {
      totalRequests: this.requestCount,
      successRate:
        this.requestCount > 0
          ? (this.successCount / this.requestCount) * 100
          : 0,
      errorRate:
        this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0,
      cacheHitRate:
        this.requestCount > 0
          ? (this.cacheHitCount / this.requestCount) * 100
          : 0,
      averageResponseTime: this.getAverageResponseTime(),
      fastestRequest: durations.length > 0 ? Math.min(...durations) : 0,
      slowestRequest: durations.length > 0 ? Math.max(...durations) : 0,
      totalDataTransferred: this.formatBytes(totalSize),
      requestsPerMinute: this.calculateRequestsPerMinute(),
    }
  }

  /**
   * 计算每分钟请求数
   */
  private calculateRequestsPerMinute(): number {
    if (this.metrics.length < 2) {
      return 0
    }

    const firstMetric = this.metrics[0]
    const lastMetric = this.metrics[this.metrics.length - 1]

    if (!firstMetric.startTime || !lastMetric.endTime) {
      return 0
    }

    const timeSpanMinutes =
      (lastMetric.endTime - firstMetric.startTime) / (1000 * 60)

    return timeSpanMinutes > 0 ? this.metrics.length / timeSpanMinutes : 0
  }

  /**
   * 格式化字节数
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) {
      return '0 B'
    }

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  /**
   * 获取慢请求列表
   */
  getSlowRequests(threshold = 1000): RequestMetrics[] {
    return this.metrics.filter(
      (metric) => metric.duration && metric.duration > threshold,
    )
  }

  /**
   * 获取错误请求统计
   */
  getErrorStats(): {
    totalErrors: number
    errorRate: number
    recentErrors: RequestMetrics[]
  } {
    const errorMetrics = this.metrics.filter(
      (metric) => metric.duration === undefined || metric.size === undefined,
    )

    return {
      totalErrors: this.errorCount,
      errorRate:
        this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0,
      recentErrors: errorMetrics.slice(-5),
    }
  }

  /**
   * 清除所有指标
   */
  clearMetrics(): void {
    this.metrics = []
    this.requestCount = 0
    this.successCount = 0
    this.errorCount = 0
    this.cacheHitCount = 0
  }

  /**
   * 设置最大指标数量
   */
  setMaxMetrics(max: number): void {
    this.maxMetrics = max

    // 如果当前指标超过新的最大值，删除旧的指标
    while (this.metrics.length > this.maxMetrics) {
      this.metrics.shift()
    }
  }

  /**
   * 导出指标数据（用于分析或调试）
   */
  exportMetrics(): string {
    return JSON.stringify(
      {
        summary: this.getStatsSummary(),
        metrics: this.metrics,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )
  }
}

// 全局性能监控器实例
export const metricsCollector = new MetricsCollector()

/**
 * 性能监控相关的便捷方法
 */
export const getMetrics = () => {
  return {
    summary: metricsCollector.getStatsSummary(),
    recent: metricsCollector.getRecentMetrics(),
    slow: metricsCollector.getSlowRequests(),
    errors: metricsCollector.getErrorStats(),
  }
}

export const clearMetrics = (): void => {
  metricsCollector.clearMetrics()
}

export const exportMetricsData = (): string => {
  return metricsCollector.exportMetrics()
}

export const getPerformanceSummary = () => {
  return metricsCollector.getStatsSummary()
}
