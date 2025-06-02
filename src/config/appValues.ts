/**
 * App的基础信息
 */

// import { HotUpdateVersion } from '@/HotUpdateVersion'
import * as Device from 'expo-device'
import Config from 'react-native-config'

const VERSION = Config.VERSION
const API_URL = Config.API_URL
const APPID = Config.APPID
const REGION = Config.REGION
export const BUILD_VERSION = Config.BUILD_VERSION
const ENV = Config.ENV
const CODE_PUSH_PROD_KEY = Config.CODE_PUSH_PROD_KEY
const CODE_PUSH_GRAY_KEY = Config.CODE_PUSH_GRAY_KEY
const CODE_PUSH_PROD_IOS_KEY = Config.CODE_PUSH_PROD_IOS_KEY
const CODE_PUSH_GRAY_IOS_KEY = Config.CODE_PUSH_GRAY_IOS_KEY

const DEVICE_NAME = Device.deviceName
const DEVICE_OS = Device.osVersion

export const AppValues = {
  // 原生版本号
  VERSION,
  // JS端版本号
  BUILD_VERSION,
  // API地址
  API_URL,
  // AppID
  APPID,
  // 区域/渠道
  REGION,
  // 生产环境热更新Key
  CODE_PUSH_PROD_KEY,
  // 测试环境热更新Key
  CODE_PUSH_GRAY_KEY,
  // 环境
  ENV,
  //ios生产环境
  CODE_PUSH_PROD_IOS_KEY,
  //ios测试环境
  CODE_PUSH_GRAY_IOS_KEY,
  // 设备名称
  DEVICE_NAME,
  // 设备操作系统
  DEVICE_OS,
}
