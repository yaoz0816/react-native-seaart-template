/**
 * @filename global.ts
 * @description 全局配置和初始化
 */

// 全局错误处理
if (__DEV__) {
  // 开发环境下的全局错误处理
  const originalConsoleError = console.error

  console.error = (...args) => {
    // 过滤一些已知的警告
    const message = args[0]

    if (typeof message === 'string') {
      // 过滤 React Navigation 的警告
      if (
        message.includes(
          'Non-serializable values were found in the navigation state',
        )
      ) {
        return
      }
      // 过滤其他已知警告...
    }

    originalConsoleError.apply(console, args)
  }
}

// 全局常量
export const APP_CONFIG = {
  // API 配置
  API_BASE_URL: __DEV__
    ? 'https://dev-api.seaart.com'
    : 'https://api.seaart.com',

  // 超时配置
  REQUEST_TIMEOUT: 30000,

  // 缓存配置
  CACHE_EXPIRE_TIME: 24 * 60 * 60 * 1000, // 24小时

  // 其他配置
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
}

export default APP_CONFIG
