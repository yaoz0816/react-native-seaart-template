import { MMKVKeys } from '@/utils/mmkv/enum'
import { MMKV } from 'react-native-mmkv'

// 创建 MMKV 实例
export const mmkv = new MMKV({
  id: 'seaart-storage',
  encryptionKey: 'seaart-key-2024',
})

/**
 * 设置缓存数据
 */
const setCacheData = <T = any>(key: MMKVKeys, value: T): boolean => {
  try {
    // 基础类型直接存储，对象类型序列化
    const finalValue =
      typeof value === 'object' && value !== null
        ? JSON.stringify(value)
        : value

    mmkv.set(key, finalValue as string | number | boolean)
    return true
  } catch (error) {
    __DEV__ && console.error(`[MMKV] 设置失败 "${key}":`, error)
    return false
  }
}

/**
 * 获取缓存数据
 */
const getCacheData = <T = any>(
  key: MMKVKeys,
  defaultValue?: T,
): T | undefined => {
  try {
    const value = mmkv.getString(key)

    if (value === undefined) {
      return defaultValue
    }

    // 尝试解析 JSON，失败则返回原值
    try {
      return JSON.parse(value) as T
    } catch {
      return value as T
    }
  } catch (error) {
    __DEV__ && console.error(`[MMKV] 获取失败 "${key}":`, error)
    return defaultValue
  }
}

/**
 * 删除缓存数据
 */
const delCacheData = (key: MMKVKeys): boolean => {
  try {
    mmkv.delete(key)
    return true
  } catch (error) {
    __DEV__ && console.error(`[MMKV] 删除失败 "${key}":`, error)
    return false
  }
}

/**
 * 检查键是否存在
 */
const hasKey = (key: MMKVKeys): boolean => mmkv.contains(key)

/**
 * 清空所有数据
 */
const clearAll = (): boolean => {
  try {
    mmkv.clearAll()
    return true
  } catch (error) {
    __DEV__ && console.error('[MMKV] 清空失败:', error)
    return false
  }
}

/**
 * 获取所有键
 */
const getAllKeys = (): string[] => mmkv.getAllKeys()

/**
 * 获取存储大小
 */
const getSize = (): number => mmkv.size

// 导出 API
export const StorageMMKV = {
  setCacheData,
  getCacheData,
  delCacheData,
  hasKey,
  clearAll,
  getAllKeys,
  getSize,
}
