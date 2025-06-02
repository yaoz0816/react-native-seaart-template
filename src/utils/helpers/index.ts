/**
 * @author 曼巴
 * @filename helpers.ts
 * @description 应用工具类【字符串处理、时间日期格式、正则处理】
 */

import { BUSINESS_TYPE_ENUM, MsgType, PUSH_TYPE_ENUM } from '@/config/enum'
import { mmkv } from '@/utils/mmkv/StorageMMKV'
import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import * as Clipboard from 'expo-clipboard'
import i18next from 'i18next'
import { Image, Platform } from 'react-native'

dayjs.extend(utc)
dayjs.extend(isBetween)

/**
 * @function 判断字符串是否为中文
 * @param {string} charStr 字符串
 * @return {boolean} 如果是中文返回true，否则返回false
 */
export const isCharCN = (charStr: string) => {
  let pattern = /[u00-uFF]/
  return !pattern.test(charStr)
}

/**
 * @function 判断字符串是否为英文
 * @param {string} charStr 字符串
 * @return {boolean} 如果是英文返回true，否则返回false
 */
export const isCharEng = (charStr: string) => {
  let pattern = /^[A-Za-z]+$/

  return pattern.test(charStr)
}

/**
 * @function 判断字符串是否为数字
 * @param {string} charStr 字符串
 * @return {boolean} 如果是数字返回true，否则返回false
 */
export const isCharNum = (charStr: string) => {
  let pattern = /^[0-9]+$/

  return pattern.test(charStr)
}

/**
 * @function 判断字符串是否为邮箱
 * @param {string} str 字符串
 * @return {boolean} 如果是邮箱返回true，否则返回false
 */
export const isMailAvailable = (str: string) => {
  return /\S+@\S+\.\S+/.test(str)
}

/**
 * @function 判断字符串是否为6位数字
 * @param {string} str 字符串
 * @return {boolean} 如果是6位数字返回true，否则返回false
 */
export const isCheckCode = (str: string) => {
  return /^\d{6}$/.test(str)
}

/**
 * @function 判断字符串是否为8-20位密码
 * @param {string} str 字符串
 * @return {boolean} 如果是8-20位密码返回true，否则返回false
 */
export const isMailPasswordAvailable = (str: string) => {
  return str.length >= 8 && str.length <= 20
}

/**
 * @function 判断字符串是否为6位数字
 * @param {string} str 字符串
 * @return {boolean} 如果是6位数字返回true，否则返回false
 */
export const isPhoneCodeAvailable = (str: string) => {
  if (str.length < 6) {
    return false
  }

  for (let i = 0; i < str.length; i++) {
    let charStr = str.charAt(i)

    if (!isCharNum(charStr)) {
      return false
    }
  }

  return true
}

/**
 * @function 判断字符串是否为手机号
 * @param {string} str 字符串
 * @return {boolean} 如果是手机号返回true，否则返回false
 */
export const isPhoneAvailable = (str: string) => {
  if (!/^1[3-9]\d{9}$/.test(str)) {
    return false
  }

  return true
}

/**
 * @function 获取当前时间戳
 * @return {number} 当前时间戳
 */
export const getTimeStamp = () => {
  let timestamp = Math.floor(Date.now() / 1000)
  return timestamp
}

/**
 * @function 获取当前时间戳
 * @return {number} 当前时间戳
 */
export const getTimeStampMS = () => {
  let timestamp = Date.now()
  return timestamp
}

/**
 * @function 时间格式转换
 * @param {string | number | Date | Dayjs | null | undefined} time 时间
 * @param {string} format 格式
 * @return {string} 时间字符串
 */
export const momentTime = (
  time: string | number | Date | Dayjs | null | undefined,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string => {
  if (!time) {
    return ''
  }

  return dayjs(time).format(format)
}

/**
 * @function 渲染VIP图标
 * @param type 业务类型
 * @return {string} 对应的图标
 */
export const renderVipIcon = (type: number) => {
  const icon_vip = require('@/assets/icons/png/vip1_icon.png')
  const icon_coin = require('@/assets/icons/png/vip1_icon.png')
  const icon_caclu = require('@/assets/icons/png/vip2_icon.png')

  switch (type) {
    case BUSINESS_TYPE_ENUM.日卡:
    case BUSINESS_TYPE_ENUM.日卡:
      return icon_vip
    case BUSINESS_TYPE_ENUM.周卡:
      return icon_vip
    case BUSINESS_TYPE_ENUM.月卡:
      return icon_vip
    case BUSINESS_TYPE_ENUM.年卡:
      return icon_vip
    case BUSINESS_TYPE_ENUM.钻石包:
      return icon_coin
    case BUSINESS_TYPE_ENUM.算力包:
      return icon_caclu
    default:
      return icon_vip
  }
}

export const isAndroid = Platform.OS === 'android'

/**
 * @author 杜鸦
 * @date 2023-11-27 Monday
 * @function 数量格式转换,返回 K,M
 * @param num 数字
 * @param fixed 保留位数
 */
export function numFormat(num: number, fixed = 1): string {
  if (num < 1000) {
    return num.toString()
  } else if (num < 1000000) {
    return (num / 1000).toFixed(fixed) + 'K'
  } else {
    return (num / 1000000).toFixed(fixed) + 'M'
  }
}

/**
 * @author 杜鸦
 * @date 2023-11-28 Tuesday
 * @function 时长格式转换,返回 mm:ss
 * @param num 秒数
 */
export function timeFormat(num: number): string {
  const min = Math.floor(num / 60)
  const sec = num % 60
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}

/**
 * @author 杜鸦
 * @date 2023-12-01 Friday
 * @function 复制文本
 * @param {data: 文本}
 */
export function copyText(data: string) {
  Clipboard.setStringAsync(data).then()
}

/**
 * @author 曼巴
 * @date 2024-12-30 星期一
 * @function 比较两版本主版本号和次版本号大小是否可以弹框热更新
 * @param {version1: 版本1, version2: 版本2}
 * @return {boolean}
 */
export const checkCompareVersion = (
  version1: string,
  version2: string,
): boolean => {
  const [major1, minor1, patch1] = version1.split('.').map(Number)
  const [major2, minor2, patch2] = version2.split('.').map(Number)

  return (
    //主版本号
    major1 > major2 ||
    //次版本号
    minor1 > minor2 ||
    //小版本号
    (major1 === major2 && minor1 === minor2 && patch1 > patch2)
  )
}

/**
 * @author 曼巴
 * @date 2025-01-14 星期二
 * @function 比较两版本大小
 * @param {version1: 版本1, version2: 版本2}
 * @return {number}
 */
export const compareVersion = (version1: string, version2: string): number => {
  const v1 = version1.split('.').map(Number)
  const v2 = version2.split('.').map(Number)

  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0
    const num2 = v2[i] || 0

    if (num1 < num2) {
      return -1
    } else if (num1 > num2) {
      return 1
    }
  }

  return 0
}

/**
 * @function 推送跳转
 * @param {PUSH_TYPE_ENUM} type 推送类型
 * @return {object} 跳转信息
 */
export const pushPage = (type: PUSH_TYPE_ENUM) => {
  let name = ''
  let category = ''
  let title = ''

  switch (type) {
    case PUSH_TYPE_ENUM.评论提醒:
      title = i18next.t('noticeComment')
      name = 'MsgListPage'
      category = MsgType.Comment
      break
    case PUSH_TYPE_ENUM.点赞提醒:
    case PUSH_TYPE_ENUM.收藏提醒:
      title = i18next.t('noticeLike')
      name = 'MsgListPage'
      category = MsgType.Like
      break

    case PUSH_TYPE_ENUM.关注提醒:
      title = i18next.t('noticeFollow')
      name = 'MsgListPage'
      category = MsgType.Follow
      break
    case PUSH_TYPE_ENUM.系统消息:
      title = i18next.t('noticeSystem')
      name = 'MsgListPage'
      category = MsgType.System
      break
    case PUSH_TYPE_ENUM.数字人消息:
      title = i18next.t('noticeSystem')
      name = 'DigitalNewPage'
      category = MsgType.System
      break
    case PUSH_TYPE_ENUM.数字人聊天:
      name = 'SubChatPage'
      break
    case PUSH_TYPE_ENUM.过期提醒:
      name = 'Mine'
      break
    default:
      title = ''
      name = 'MainTabs'
      category = ''
      break
  }

  return {
    title,
    name,
    category,
  }
}

/**
 * 可以根据字符串随机计算一个RGB数据出来
 * @param text
 */
export const generateColorFromString = (text?: string) => {
  if (!text) {
    return '#DDD'
  }

  return (
    '#' +
    Math.floor(
      Math.abs(Math.sin(hashCode(text)) * 16777215) % 16777215,
    ).toString(16)
  )
}

/**
 * 判断数字是否为空
 * @param value 数字
 * @return {boolean} 如果数字为空返回true，否则返回false
 */
export const isNumNotEmpty = (
  value: number | null | undefined,
): value is number => {
  return value !== null && value !== undefined
}

/**
 * 获取随机整数
 * @param min 最小值
 * @param max 最大值
 * @return {number} 随机整数
 */
export const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  // 保证min是整数
  min = Math.ceil(min)
  // 保证max是整数
  max = Math.floor(max)
  // 返回介于min和max之间的整数
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getImageSize = async (
  url: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width, height })
      },
      (error) => {
        reject(error)
      },
    )
  })
}

/**
 * @author 曼巴
 * @date 2025-03-25 星期二
 * @function 判断日期是否过期
 * @param {string} dateString 日期字符串
 * @return {boolean} 如果日期过期返回true，否则返回false
 */
export function isExpired(dateString: string) {
  // 将日期字符串转换为 Date 对象
  const targetDate = new Date(dateString)

  // 获取当前时间
  const currentDate = new Date()

  // 比较目标时间和当前时间
  return targetDate > currentDate
}

/**
 * @author 曼巴
 * @date 2025-03-25 星期二
 * @function 将用户ID转换为哈希值
 * @param {string} userId 用户ID
 * @return {number} 哈希值
 */
export function hashCode(userId: string) {
  let hash = 0

  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i)
    hash &= hash // Convert to 32bit integer
  }

  return hash
}

/**
 * @author 曼巴
 * @date 2025-01-14 星期二
 * @function 一天执行一次
 * @param {string} key 键
 * @return {boolean} 是否执行
 */
export const handleExecuteOnce = (key: string): boolean => {
  const lastExecuteTime = mmkv.getString(key)
  const today = new Date().toDateString()

  if (lastExecuteTime === today) {
    return false
  }

  ///保存当前时间
  mmkv.set(key, today)

  return true
}

/**
 * @author 曼巴
 * @date 2025-01-14 星期二
 * @function 判断当前时间是否在当天内
 * @param {number} timestamp 时间戳
 * @return {boolean} 是否在当天内
 */
export function isTimestampToday(timestamp: number) {
  const today = dayjs()
  return dayjs(timestamp).isBetween(
    today.startOf('day'),
    today.endOf('day'),
    'day',
    '[]',
  )
}

/**
 * @author 曼巴
 * @date 2025-01-14 星期二
 * @function 判断当前时间是否在区间内
 * @param {string} start 开始时间
 * @param {string} end 结束时间
 * @return {boolean} 是否在区间内
 * @example
 * isBetweenRange('2025-01-01 00:00:00', '2025-01-03 00:00:00')
 */
export const isBetweenRange = (start: string, end: string): boolean => {
  if (!start || !end) {
    return false
  }

  // 定义开始时间和结束时间（UTC）
  const startTime = dayjs(start).utc()
  const endTime = dayjs(end).utc()

  const currentTime = dayjs.utc() // 当前时间

  // 判断当前时间是否在 startTime 和 endTime 之间
  const isInRange = currentTime.isBetween(startTime, endTime, null, '[]') // '[]' 表示包含边界

  return isInRange
}

/**
 * @author 曼巴
 * @date 2025-01-14 星期二
 * @function 检查时间戳是否在24小时内
 * @param {number} timestamp 要检查的时间戳（毫秒）
 * @return {boolean} 如果在24小时内返回true
 */
export const isWithin24Hours = (timestamp: number): boolean => {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000
  return Date.now() - timestamp < ONE_DAY_MS
}

/**
 * @author 曼巴
 * @date 2025-02-11 星期二
 * @function 判断是否是 T1 国家
 * @return {boolean} 如果是 T1 国家返回 true，否则返回 false
 */
export const isT1Country = (regionCode: string): boolean => {
  // 定义 T1 国家的国家代码
  const T1_COUNTRIES = ['US', 'JP', 'CA', 'FR', 'GB', 'KR', 'DE']

  if (!regionCode) {
    return false
  }

  return T1_COUNTRIES.includes(regionCode)
}

/**
 * @author 杜鸦
 * @date 2024-12-30 星期一
 * @function 计算时间段始末时间戳
 * @param {object} params 参数对象
 * @param {object} params.period 时间间隔对象
 * @param {number} [params.period.days=0] 天数
 * @param {number} [params.period.hours=0] 小时数
 * @param {number} [params.period.minutes=0] 分钟数
 * @param {number} [params.period.seconds=0] 秒数
 * @param {number} [params.startTime] 起始时间戳(毫秒)
 * @param {number} [params.endTime] 结束时间戳(毫秒)
 * @returns {{startTimestamp: number, endTimestamp: number}} 开始和结束时间戳
 */
export const calculatePeriod = (params: {
  period: {
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
  }
  startTime?: number
  endTime?: number
}) => {
  const { period, startTime, endTime } = params
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = period

  // 将时间转换为毫秒
  const totalMilliseconds =
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000

  let endTimestamp = endTime || Date.now()
  let startTimestamp = startTime || endTimestamp - totalMilliseconds

  // 如果同时传入开始和结束时间,优先使用结束时间
  if (startTime && endTime) {
    startTimestamp = endTime - totalMilliseconds
  }

  return {
    startTimestamp,
    endTimestamp,
  }
}

/**
 * @function 获取图片宽高
 * @param {string} url 图片URL
 * @return {Promise<{ width: number; height: number }>} 图片宽高
 */
export const getImageWH = async (
  url: string,
): Promise<{ width: number; height: number }> => {
  return await new Promise((resolve, reject) => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width, height })
      },
      (error) => {
        reject(error)
      },
    )
  })
}

/**
 * 将文件大小从字节转换为易读的格式
 * @param bytes 文件大小（字节）
 * @param decimals 保留的小数位数，默认为2
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number, decimals?: number): string => {
  // 如果文件大小为0，直接返回'0 Bytes'
  if (bytes === 0) {
    return '0 Bytes'
  }

  // 定义单位数组
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  // 计算单位索引
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  // 计算转换后的文件大小
  const convertedSize = bytes / Math.pow(1024, i)

  // 返回格式化后的字符串
  return `${parseFloat(convertedSize.toFixed(decimals))} ${sizes[i]}`
}

/**
 * 格式化文本
 * @param template 模板
 * @param charName 角色名
 * @param userName 用户名
 * @returns 格式化后的文本
 */
export const formatText = (
  template: string,
  charName: string,
  userName: string,
) => {
  let formattedText = template
    .replace(/{{char}}/g, charName)
    .replace(/{{user}}/g, userName)
    .replace(/\*/g, '')

  return formattedText
}

/**
 * 将JSON对象转换为逗号分隔的key:value格式字符串
 * @param {Object} jsonObj - 输入的JSON对象
 * @param {Object} [valueOverrides] - 可选的值覆盖映射
 * @returns {string} - 转换后的字符串
 */
export const convertJsonToKeyValueString = (
  jsonObj: Record<string, any>,
  valueOverrides: Record<string, any> = {},
) => {
  if (!jsonObj || typeof jsonObj !== 'object') {
    return ''
  }

  // 将JSON对象转换为键值对数组，然后映射为key:value格式
  return Object.entries(jsonObj)
    .map(([key, value]) => {
      // 检查是否有覆盖的值
      const finalValue = key in valueOverrides ? valueOverrides[key] : value
      return `${key}:${finalValue}`
    })
    .join(',')
}

/**
 * 获取随机整数
 * @param min 最小值
 * @param max 最大值
 */
export const getRandomInteger = (
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
): number => {
  // 保证min是整数
  min = Math.ceil(min)
  // 保证max是整数
  max = Math.floor(max)
  // 返回介于min和max之间的整数
  return Math.floor(Math.random() * (max - min + 1)) + min
}
