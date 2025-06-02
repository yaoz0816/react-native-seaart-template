/**
 * @author 曼巴
 * @filename versionHelpers.ts
 * @date 2025-04-08 星期二
 * @description 版本号帮助函数
 */

import { mmkv } from '@/utils/mmkv/StorageMMKV'

/**
 * 从缓存获取版本信息，如果缓存有效
 */
export const getCachedVersionInfo = (cacheKey: string) => {
  const cachedInfo = mmkv.getString(cacheKey)

  if (!cachedInfo) {
    return null
  }

  try {
    const parsedInfo = JSON.parse(cachedInfo)
    const cacheTime = parsedInfo._timestamp

    // 缓存超过1小时则失效
    if (cacheTime && Date.now() - cacheTime < 60 * 60 * 1000) {
      delete parsedInfo._timestamp
      return parsedInfo
    }
  } catch {
    // 解析失败返回null
  }

  return null
}

/**
 * 保存带时间戳的缓存
 */
export const saveCacheWithTimestamp = (cacheKey: string, data: any) => {
  try {
    const cacheData = {
      ...data,
      _timestamp: Date.now(),
    }

    mmkv.set(cacheKey, JSON.stringify(cacheData))
  } catch {
    // 缓存失败，但不影响主流程
  }
}

/**
 * 删除缓存
 */
export const removeCacheWithVersion = (cacheKey: string) => {
  try {
    mmkv.delete(cacheKey)
  } catch {
    // 缓存失败，但不影响主流程
  }
}
