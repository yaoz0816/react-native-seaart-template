/**
 * @author 曼巴
 * @filename AllObjTypeMapValue.ts
 * @date 2025-04-25 星期五
 * @description 全局所有objType的映射值
 */

import { TabKey } from '@/config/enum'

/**
 * @作者 曼巴
 * @日期 2023-09-15 Friday
 * @用途 全局作品和模型类型枚举值映射
 */
export enum WorksTypeEnum {
  // 作品相关类型 (1000-1099)
  MY_WORKS = 1000, // 我的作品
  OTHER_WORKS = 1001, // 他人作品
  MY_COLLECTED_WORKS = 1002, // 我的收藏作品
  OTHER_COLLECTED_WORKS = 1003, // 他人收藏作品

  // 模型相关类型 (1100-1199)
  MY_MODEL = 1100, // 我的模型
  OTHER_MODEL = 1101, // 他人模型
  MY_COLLECTED_MODEL = 1102, // 我的收藏模型
  OTHER_COLLECTED_MODEL = 1103, // 他人收藏模型

  // 投稿相关类型 (1200-1299)
  MY_POSTS = 1200, // 我的投稿
  OTHER_POSTS = 1201, // 他人投稿
  MY_COLLECTED_POSTS = 1202, // 我的收藏投稿
  OTHER_COLLECTED_POSTS = 1203, // 他人收藏投稿

  // 快应用相关类型 (1300-1399)
  MY_QUICK_APP = 1300, // 我的快应用
  OTHER_QUICK_APP = 1301, // 他人快应用
  MY_COLLECTED_QUICK_APP = 1302, // 我的收藏快应用
  OTHER_COLLECTED_QUICK_APP = 1303, // 他人收藏快应用

  // 数字人相关类型 (1400-1499)
  MY_DIGITAL = 1400, // 我的数字人
  OTHER_DIGITAL = 1401, // 他人数字人
  MY_COLLECTED_DIGITAL = 1402, // 我的收藏数字人
  OTHER_COLLECTED_DIGITAL = 1403, // 他人收藏数字人

  // 滤镜相关类型 (1500-1599)
  MY_COLLECTED_FILTER = 1500, // 我的收藏滤镜
  OTHER_COLLECTED_FILTER = 1501, // 他人收藏滤镜
}

/**
 * 类型字符串与枚举值映射表
 */
export const WorksTypeMap: Record<string, WorksTypeEnum> = {
  // 作品
  我的作品: WorksTypeEnum.MY_WORKS,
  他人作品: WorksTypeEnum.OTHER_WORKS,
  我的收藏作品: WorksTypeEnum.MY_COLLECTED_WORKS,
  他人收藏作品: WorksTypeEnum.OTHER_COLLECTED_WORKS,

  // 模型
  我的模型: WorksTypeEnum.MY_MODEL,
  他人模型: WorksTypeEnum.OTHER_MODEL,
  我的收藏模型: WorksTypeEnum.MY_COLLECTED_MODEL,
  他人收藏模型: WorksTypeEnum.OTHER_COLLECTED_MODEL,

  // 投稿
  我的投稿: WorksTypeEnum.MY_POSTS,
  他人投稿: WorksTypeEnum.OTHER_POSTS,
  我的收藏投稿: WorksTypeEnum.MY_COLLECTED_POSTS,
  他人收藏投稿: WorksTypeEnum.OTHER_COLLECTED_POSTS,

  // 快应用
  我的快应用: WorksTypeEnum.MY_QUICK_APP,
  他人快应用: WorksTypeEnum.OTHER_QUICK_APP,
  我的收藏快应用: WorksTypeEnum.MY_COLLECTED_QUICK_APP,
  他人收藏快应用: WorksTypeEnum.OTHER_COLLECTED_QUICK_APP,

  // 数字人
  我的数字人: WorksTypeEnum.MY_DIGITAL,
  他人数字人: WorksTypeEnum.OTHER_DIGITAL,
  我的收藏数字人: WorksTypeEnum.MY_COLLECTED_DIGITAL,
  他人收藏数字人: WorksTypeEnum.OTHER_COLLECTED_DIGITAL,

  // 滤镜
  我的收藏滤镜: WorksTypeEnum.MY_COLLECTED_FILTER,
  他人收藏滤镜: WorksTypeEnum.OTHER_COLLECTED_FILTER,
}

/**消息类型枚举值映射*/
export enum MessageTypeEnum {
  // 消息相关类型 (1502-1599)
  SYSTEM_MESSAGE = 1502, // 系统消息
  COMMENT_MESSAGE = 1503, // 评论消息
  LIKE_COLLECT_MESSAGE = 1504, // 点赞收藏消息
  FOLLOW_MESSAGE = 1505, // 关注消息
}
/**
 * 消息类型字符串与枚举值映射表
 */
export const MessageTypeMap: Record<string, MessageTypeEnum> = {
  'int#sys': MessageTypeEnum.SYSTEM_MESSAGE,
  'int#com': MessageTypeEnum.COMMENT_MESSAGE,
  'int#like&col': MessageTypeEnum.LIKE_COLLECT_MESSAGE,
  'int#fol': MessageTypeEnum.FOLLOW_MESSAGE,
}

/**
 * TabKey 枚举 - 数字类型映射
 * 从 1505 开始递增
 */
export enum TabKeyValue {
  None = 1505,
  Recommend = 1506,
  Artwork = 1507,
  Post = 1508,
  QuickApp = 1509,
  CyberPub = 1510,
  Model = 1511,
  Filter = 1512,
  Favorite = 1513,
  Mine = 1514,
  ImageModel = 1515,
  VideoModel = 1516,
  Follow = 1517,
  Activity = 1518,
  AiImageApp = 1519,
  AiVideoApp = 1520,
  StCharacter = 1521,
}

/**
 * TabKey 字符串枚举与数字值的映射关系
 */
export const TabKeyToValueMap: Record<TabKey, TabKeyValue> = {
  [TabKey.None]: TabKeyValue.None,
  [TabKey.Recommend]: TabKeyValue.Recommend,
  [TabKey.Artwork]: TabKeyValue.Artwork,
  [TabKey.Post]: TabKeyValue.Post,
  [TabKey.QuickApp]: TabKeyValue.QuickApp,
  [TabKey.CyberPub]: TabKeyValue.CyberPub,
  [TabKey.Model]: TabKeyValue.Model,
  [TabKey.Filter]: TabKeyValue.Filter,
  [TabKey.Favorite]: TabKeyValue.Favorite,
  [TabKey.Mine]: TabKeyValue.Mine,
  [TabKey.ImageModel]: TabKeyValue.ImageModel,
  [TabKey.VideoModel]: TabKeyValue.VideoModel,
  [TabKey.Follow]: TabKeyValue.Follow,
  [TabKey.Activity]: TabKeyValue.Activity,
  [TabKey.AiImageApp]: TabKeyValue.AiImageApp,
  [TabKey.AiVideoApp]: TabKeyValue.AiVideoApp,
  [TabKey.StCharacter]: TabKeyValue.StCharacter,
} as const

/**
 * 外层组件类型枚举值映射
 */
export enum OuterItemTypeEnum {
  UNKNOWN = 1600, // 未知
  WORK = 1601, // 作品
  MODEL = 1602, // 模型
  POST = 1603, // 投稿
  IMAGE_COLLECTION = 1604, // 图集
  ARTICLE = 1605, // 文章
  VIDEO = 1606, // 视频
  TAG = 1607, // 标签
  ACCOUNT = 1608, // 账户
  AUDIO = 1609, // 音频
  DIGITAL = 1610, // 数字人
  FILTER_TEMPLATE = 1611, // 滤镜模板
  QUICK_APP = 1612, // 快应用
  WORKFLOW = 1613, // 工作流
  FUNCTION = 1614, // 功能
  NEW_VIDEO = 1615, // 新版视频
  NEW_VIDEO_MODEL = 1616, // 新版视频模型
}

/**
 * 外层组件类型字符串与枚举值映射表
 */
export const OuterItemTypeMap: Record<string, OuterItemTypeEnum> = {
  未知: OuterItemTypeEnum.UNKNOWN,
  作品: OuterItemTypeEnum.WORK,
  模型: OuterItemTypeEnum.MODEL,
  图集: OuterItemTypeEnum.IMAGE_COLLECTION,
  文章: OuterItemTypeEnum.ARTICLE,
  视频: OuterItemTypeEnum.VIDEO,
  标签: OuterItemTypeEnum.TAG,
  账户: OuterItemTypeEnum.ACCOUNT,
  音频: OuterItemTypeEnum.AUDIO,
  数字人: OuterItemTypeEnum.DIGITAL,
  滤镜模板: OuterItemTypeEnum.FILTER_TEMPLATE,
  快应用: OuterItemTypeEnum.QUICK_APP,
  工作流: OuterItemTypeEnum.WORKFLOW,
  功能: OuterItemTypeEnum.FUNCTION,
  新版视频: OuterItemTypeEnum.NEW_VIDEO,
  新版视频模型: OuterItemTypeEnum.NEW_VIDEO_MODEL,
}
