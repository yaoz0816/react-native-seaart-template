/**
 * @author 曼巴
 * @filename PageLocationParams.ts
 * @date 2024-10-23 Wednesday
 * @description 页面路径参数获取与处理
 */

import { MsgType, ObjType, TaskType } from '@/config/enum'
import { Route } from '@react-navigation/native'
import { navigationRef } from '../../navigation/configs/utils'

/**
 * 路由历史记录栈
 */
interface RouteHistoryState {
  previousRoute: string | undefined
  currentRoute: string | undefined
  routeStack: string[] // 添加路由栈
}

/**
 * 详情页类型映射
 */
const DETAIL_TYPE_MAP: Record<number, string> = {
  [ObjType.Artwork]: 'Artwork',
  [ObjType.Model]: 'Model',
  [ObjType.ChangeFace]: 'ChangeFace',
  [ObjType.Posts]: 'Posts',
  [ObjType.Video]: 'Video',
  [ObjType.Tag]: 'Tag',
  [ObjType.User]: 'User',
  [ObjType.Character]: 'Character',
  [ObjType.ArtboardTemplates]: 'ArtboardTemplates',
  [ObjType.QuickApp]: 'QuickApp',
  [ObjType.Filter]: 'Filter',
  [ObjType.Function]: 'Function',
  [ObjType.NewVideo]: 'NewVideo',
}

/**
 * 消息列表类型映射
 */
const MSG_LIST_TYPE_MAP: Record<string, string> = {
  /**  * 系统消息 */
  [MsgType.System]: 'system',
  /**  * 关注 */
  [MsgType.Follow]: 'follow',
  /**  * 评论消息 */
  [MsgType.Comment]: 'comment',
  /**  * 点赞收藏 */
  [MsgType.Like]: 'collect',
}

/**
 * 关注类型映射
 */
const FOLLOW_TYPE_MAP: Record<string, string> = {
  Follow: 'Follow',
  Fans: 'Fans',
}

/**
 * 任务类型映射
 */
const TASK_TYPE_MAP: Record<string, string> = {
  [TaskType.TextToImage]: 'TextToImage',
  [TaskType.Upscale]: 'Upscale',
  [TaskType.Variations]: 'Variations',
  [TaskType.ExtraUpscale]: 'ExtraUpscale',
  [TaskType.RemoveBackground]: 'RemoveBackground',
  [TaskType.ImageToText]: 'ImageToText',
  [TaskType.ImageToImage]: 'ImageToImage',
  [TaskType.ConditionToImage]: 'ConditionToImage',
  [TaskType.AutoImageToText]: 'AutoImageToText',
  [TaskType.ControlNetPreviewImage]: 'ControlNetPreviewImage',
  [TaskType.Expansion]: 'Expansion',
  [TaskType.HDRepair]: 'HDRepair',
  [TaskType.AIImageEnhancement]: 'AIImageEnhancement',
  [TaskType.RemoveBgTool]: 'RemoveBgTool',
  [TaskType.DraftToImage]: 'DraftToImage',
  [TaskType.Filter]: 'Filter',
  [TaskType.FaceChange]: 'FaceChange',
  [TaskType.CreateAnimation]: 'CreateAnimation',
  [TaskType.RepairCharacter]: 'RepairCharacter',
  [TaskType.FaceChangeVideo]: 'FaceChangeVideo',
  [TaskType.IntelligentEraser]: 'IntelligentEraser',
  [TaskType.ComfyUIAppWorks]: 'ComfyUIAppWorks',
  [TaskType.ImageToVideo]: 'ImageToVideo',
  [TaskType.VideoUpscale]: 'VideoUpscale',
  [TaskType.TextToVideo]: 'TextToVideo',
  [TaskType.VideoExtend]: 'VideoExtend',
}

/**
 * 路由参数接口
 */
interface RouteParams {
  type?: string | number
  userID?: string | number
  [key: string]: any
}

/**
 * 获取详情页类型
 * @param type 类型参数
 * @returns 详情页类型描述
 */
export const getDetailType = (type: number): string => {
  return DETAIL_TYPE_MAP[type] || 'unknown'
}

/**
 * 获取消息列表类型
 * @param type 类型参数
 * @returns 消息类型描述
 */
export const getMsgListType = (type: string): string => {
  return MSG_LIST_TYPE_MAP[type] || 'unknown'
}

/**
 * 获取关注类型
 * @param type 类型参数
 * @returns 关注类型描述
 */
export const getFollowType = (type: string): string => {
  return FOLLOW_TYPE_MAP[type] || 'unknown'
}

/**
 * 获取任务类型
 * @param type 类型参数
 * @returns 任务类型描述
 */
export const getTaskType = (type: string): string => {
  return TASK_TYPE_MAP[type] || 'unknown'
}

/**
 * 页面路径参数接口
 */
export interface PageLocationData {
  pageName: string // 页面名称
  type: string | number // 页面类型
  fullPath: string // 页面全路径
  params: RouteParams // 页面参数
  pageId: string // 页面ID
  previousPage: string | undefined // 上一页路径
  obj_id?: string // 对象ID
  obj_type?: string // 对象类型
}

/**
 * 页面路径处理器映射
 */
const PAGE_PATH_PROCESSORS: Record<
  string,
  (params: RouteParams, pageName: string) => string
> = {
  DetailPage: (params, pageName) => {
    const type = params?.type
    const operation = type ? getDetailType(Number(type)) : ''
    return `${pageName}/${operation}`
  },
  MsgListPage: (params, pageName) => {
    const type = params?.type
    const operation = type ? getMsgListType(String(type)) : ''
    return `${pageName}/${operation}`
  },
  Mine: (params, pageName) => {
    const userID = params?.userID
    return userID ? `${pageName}/${'userID'}` : pageName
  },
  FollowPage: (params, pageName) => {
    const type = params?.type
    const operation = type ? getFollowType(String(type)) : ''
    return `${pageName}/${operation}`
  },
  TaskProgressPage: (params, pageName) => {
    const taskType = params?.taskType
    const operation = taskType ? getTaskType(String(taskType)) : ''
    return `${pageName}/${operation}`
  },
  // 添加更多页面处理器...
}

/**
 * 获取页面位置参数
 * @returns 页面位置参数对象
 */
export const getPageLocationParams = (): PageLocationData => {
  const currentRoute = navigationRef.current?.getCurrentRoute() as
    | Route<string>
    | undefined

  if (!currentRoute) {
    return {
      pageName: 'unknown',
      type: '',
      fullPath: 'unknown',
      params: {},
      pageId: '',
      previousPage: 'unknown',
    }
  }

  const params = (currentRoute.params || {}) as RouteParams
  const pageName = currentRoute.name || 'unknown'

  // 获取类型参数，优先使用显式type参数
  let typeParam = params.type

  // 特殊页面可能使用其他参数作为标识
  if (pageName === 'Mine' && params.userID) {
    typeParam = params.userID
  } else if (pageName === 'TaskProgressPage' && params.taskType) {
    typeParam = params.taskType
  } else if (
    // 数字人全局设定和个人设定判断
    pageName === 'EditDataCard' &&
    (params.isGlobal || params.focusTo)
  ) {
    typeParam = params.isGlobal ? 'global' : 'self'
    // 标签详情页-对应ID
  } else if (pageName === 'TagDetailPage' && params.tag) {
    typeParam = params?.tag?.id?.replace(/ /g, '_')
  }

  // 构建完整的页面路径
  let fullPath = pageName

  // 使用页面处理器生成路径
  const processor = PAGE_PATH_PROCESSORS[pageName]

  if (processor) {
    fullPath = processor(params, pageName)
  } else if (typeParam) {
    // 默认处理：如果有类型但没有专门的处理器，就拼接类型
    fullPath = `${pageName}/${typeParam}`
  }

  return {
    pageName,
    type: typeParam || '',
    fullPath,
    params,
    pageId: typeParam ? String(typeParam) : '',
    previousPage: 'routeHistoryState.previousRoute',
  }
}

/**
 * 构建页面打点路径
 * @param pageName 页面名称
 * @param type 页面类型
 * @returns 完整的路径字符串
 */
export const buildTrackPath = (
  pageName: string,
  type: string | number,
): string => {
  if (!type) {
    return pageName
  }

  // 使用页面处理器构建路径
  const processor = PAGE_PATH_PROCESSORS[pageName]

  if (processor) {
    return processor({ type }, pageName)
  }

  // 默认处理：简单拼接
  return `${pageName}/${type}`
}

/**
 * 更新路由历史
 * @param routeName 当前路由名称
 */
export const updateRouteHistory = (routeName: string) => {
  // 使用对象管理路由状态
  const routeHistoryState: RouteHistoryState = {
    previousRoute: undefined,
    currentRoute: undefined,
    routeStack: [],
  }

  if (!routeName) {
    return {
      currentRoute: '',
      previousRoute: '',
    }
  }

  // 如果是相同路由，不进行更新
  if (routeHistoryState.currentRoute === routeName) {
    return
  }

  // 更新路由历史记录
  routeHistoryState.previousRoute = routeHistoryState.currentRoute
  routeHistoryState.currentRoute = routeName

  // 只有当路由真的发生变化时才更新栈
  if (
    routeHistoryState.routeStack[routeHistoryState.routeStack.length - 1] !==
    routeName
  ) {
    routeHistoryState.routeStack.push(routeName)

    // 保持栈的大小在合理范围内
    if (routeHistoryState.routeStack.length > 10) {
      routeHistoryState.routeStack.shift()
    }

    // 调试日志
    console.log('Route Update:222999', {
      current: routeName,
      previous: routeHistoryState.previousRoute,
      stack: routeHistoryState.routeStack,
    })

    return {
      currentRoute: routeName,
      previousRoute: routeHistoryState.previousRoute,
    }
  }
}

/**
 * 获取当前页面的打点参数
 * @param extraParams 额外参数
 * @returns 打点参数对象
 */
export const getCurrentPageTrackParams = (
  extraParams?: Record<string, any>,
): Record<string, any> => {
  const { pageName, type, fullPath, params, previousPage, pageId } =
    getPageLocationParams()

  return {
    page_location: pageName,
    page_type: type,
    page_path: fullPath,
    page_id: pageId,
    obj_id: params?.id,
    obj_type: params?.type,
    ref_page_location: previousPage, // 添加上一页引用
    ...params,
    ...extraParams,
  }
}
