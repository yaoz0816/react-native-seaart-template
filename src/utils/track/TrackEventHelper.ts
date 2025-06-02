/**
 * @author 曼巴
 * @filename TrackEventHelper.ts
 * @date 2025-05-06 星期二
 * @description 埋点事件帮助类
 */

import { convertJsonToKeyValueString } from '@/utils/helpers'
import { MMKVKeys } from '@/utils/mmkv/enum'
import { mmkv } from '@/utils/mmkv/StorageMMKV'
import { getPageLocationParams } from '@/utils/track/PageRouteParams'
import {
  EntityLocation,
  EntityName,
  EntityType,
  TrackEventOptions,
} from '@/utils/track/TrackEventConstant'
import * as Device from 'expo-device'
import { useMemo } from 'react'
import { NativeModules, Platform } from 'react-native'
import appsFlyer from 'react-native-appsflyer'
//@ts-ignore
import { addTrackLog, isDebugMode } from 'react-native-debug-toolkit'
import { RouteRecorder } from '../../navigation/components/RouteRecorder'

/**
 * 埋点事件数据类型
 */
export interface TrackEventData {
  entityType: string
  entityName: string
  objId?: string
  objType?: number
  position?: string
  entityLocation?: string
  [key: string]: any
}

/**
 * 自定义Hook：获取埋点数据并缓存
 * 解决每次渲染重新创建对象的问题
 */
export function useTrackEvent<T extends (...args: any[]) => TrackEventData>(
  eventFn: T,
  ...args: Parameters<T>
): TrackEventData {
  return useMemo(() => eventFn(...args), [args, eventFn])
}

/**
 * 为列表数据创建埋点数据映射表
 * 适用于循环渲染场景，避免在循环中直接调用 Hook
 *
 * @param items 数据项列表
 * @param keyExtractor 从项目中提取 key 的函数
 * @param createTrackData 为每个项目创建埋点数据的函数
 * @returns 键值映射的埋点数据
 */
export function useTrackDataMap<T>(
  items: T[],
  keyExtractor: (item: T) => string,
  createTrackData: (item: T) => TrackEventData,
): Record<string, TrackEventData> {
  return useMemo(() => {
    return items.reduce(
      (map, item) => {
        const key = keyExtractor(item)
        map[key] = createTrackData(item)
        return map
      },
      {} as Record<string, TrackEventData>,
    )
  }, [items, keyExtractor, createTrackData])
}

/**
 * 埋点事件
 * @param eventName 事件名称
 * @param options 埋点参数
 */
export const trackEvent = (eventName: string, options: TrackEventOptions) => {
  if (isDebugMode) {
    addTrackLog({ ...options, eventName })
  }

  // 在文件顶部创建一个变量缓存VIP状态
  // let isVipActive = userAssetsInfoStore.getState().isVipActive

  requestAnimationFrame(() => {
    const { pageId } = getPageLocationParams()
    // 获取当前和上一个路由信息
    const { current, previous } = RouteRecorder.getRoutes()

    // 获取服务端灰度配置
    const serviceConfig = JSON.parse(
      mmkv.getString(MMKVKeys.SERVICE_CONFIG) || '{}',
    )

    // 将服务端配置转换为key:value格式字符串
    const canary = convertJsonToKeyValueString(serviceConfig)

    const newData = {
      device_os: Platform.OS,
      device_name: Device.deviceName,
      page_life_id: mmkv.getString(MMKVKeys.START_UNIQUEID),
      country_code: mmkv.getString(MMKVKeys.USER_CURRENT_COUNTRY_CODE),
      ip: '',
      app_id: 'app_global_seaart',
      page_location: current,
      page_id: options?.pageId || pageId,
      front_operation: options?.frontOperation,
      ref_page_location: previous,
      entity_type: options?.entityType,
      entity_name: options?.entityName,
      entity_path: options?.entityPath,
      entity_location: options?.entityLocation,
      obj_id: options?.objId,
      obj_type: options?.objType,
      obj_pt: options?.objPt,
      position: options?.position,
      session_id: options?.sessionId,
      request_id: options?.requestId,
      // user_type: isVipActive ? 'VIP' : 'FREE',
      search_keyword: options?.searchKeywored,
      en_search_keyword: options?.enSearchKeywored,
      canary: canary,
      obj_info: options?.obj_info,
    }

    //samsung SM-G998U1 2016 samsung true 10812948480 Galaxy S21 Ultra 5G
    // console.log('%c ===newData===>>>>>>>>', 'color:orange;', newData)
    NativeModules.StarDataModule.reportWithEventName(
      eventName,
      JSON.stringify(newData),
    )
  })
}

/**
 * 市场测打点
 * @param eventName 事件名称
 * @param data 事件数据
 */
export const afLogEvent = (eventName: string, data?: object) => {
  if (__DEV__) {
    return
  }

  const newData: any = {
    ...data,
    account_id: mmkv.getString(MMKVKeys.USER_ID),
    st_account_id: mmkv.getString(MMKVKeys.USER_ID),
    st_role_id: mmkv.getString(MMKVKeys.USER_ID),
    device_id: mmkv.getString(MMKVKeys.UUID_KEY),
    st_distinct_id: mmkv.getString(MMKVKeys.UUID_KEY),
    device_os: Platform.OS,
    app_id: 'app_global_seaart',
  }

  console.log('eventName=', eventName)
  appsFlyer.logEvent(eventName, newData || {})
}

export const TRACK_EVENTS = {
  /**
   * 用户行为
   */
  USER_ACTION: {
    DETAIL: {
      /**
       * 展开/收起提示词
       */
      togglePrompt: (objId?: string): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_DETAIL_MORE_PROMPT,
        objId,
      }),

      /**
       * 复制提示词
       */
      copyPrompt: (objId?: string): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_DETAIL_COPY_PROMPT,
        objId,
      }),

      /**
       * 切换语言
       */
      toggleLanguage: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_CHILD_CHAT,
        objId,
        objType,
      }),

      /**
       * 用户信息
       */
      authorInfo: (): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_USER_INFO,
      }),
      /**
       * 展开/收起提示词
       */
      extendPrompt: (objId?: string): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_DETAIL_EXTEND_PROMPT,
        objId,
      }),
      /**
       * 展开/收起描述
       */
      extendDescription: (objId?: string): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_DETAIL_DESCRIPTION,
        objId,
      }),
      sameCreate: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_CREATE,
        objId,
        objType,
      }),
    },
    /**
     * 点赞/取消点赞评论
     */
    COMMENT: {
      toggleLike: (
        isActive: boolean,
        objId?: string,
        objType?: number,
        entityLocation?: string,
      ): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: isActive
          ? EntityName.USER_ACTION_UNZAN
          : EntityName.USER_ACTION_ZAN,
        objId,
        objType,
        entityLocation,
      }),
      childChat: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_CHILD_CHAT,
        objId,
        objType,
      }),
      childChatRightOperation: (
        objId?: string,
        objType?: number,
      ): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_CHILD_RIGHT_OPERATION,
        objId,
        objType,
      }),
      authorHeader: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_AUTHOR_HEADER,
        objId,
        objType,
      }),
      loadMore: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_LOAD_MORE,
        objId,
        objType,
      }),
      reply: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_REPLY,
        objId,
        objType,
      }),
      replyLoadMore: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_LOAD_MORE,
        objId,
        objType,
      }),
      /**
       * 翻译提示词
       */
      translatePrompt: (): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_DETAIL_TRANSLATE_PROMPT,
      }),
      /**
       * 评论作者头像
       */
      commentAuthorHeader: (
        objId?: string,
        objType?: number,
      ): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_AUTHOR_HEADER,
        objId,
        objType,
      }),
      /**
       * 翻译评论
       */
      translateComment: (
        isActive: boolean,
        objId?: string,
        objType?: number,
      ): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: isActive
          ? EntityName.USER_ACTION_COMMENT_REVERT
          : EntityName.USER_ACTION_COMMENT_TRANSLATE,
        objId,
        objType,
      }),
      /**
       * 评论聊天
       */
      commentChat: (objId?: string, objType?: number): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: EntityName.USER_ACTION_COMMENT_CHAT,
        objId,
        objType,
      }),
    },
    /**
     * 收藏/取消收藏
     */
    COLLECTION: {
      toggleCollection: (
        isActive: boolean,
        objId?: string,
        objType?: number,
      ): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: isActive
          ? EntityName.USER_ACTION_COLLECTION
          : EntityName.USER_ACTION_UNCOLLECTION,
        objId,
        objType,
      }),
    },
    /**
     * 关注/取消关注
     */
    FOLLOW: {
      toggleFollow: (
        isActive: boolean,
        objId?: string,
        objType?: number,
      ): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: isActive
          ? EntityName.USER_ACTION_FOLLOW
          : EntityName.USER_ACTION_UNFOLLOW,
        objId,
        objType,
      }),
    },
    /**
     * 举报
     */
    REPORT: {
      report: (entityName: string): TrackEventData => ({
        entityType: EntityType.USER_ACTION,
        entityName: entityName,
      }),
    },
    /**
     * 去商店评价
     */
    goToStore: (): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_GO_TO_STORE,
    }),
    /**
     * 不满意
     */
    notSatisfied: (): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_NOT_SATISFIED,
    }),
    /**
     * 下次再说
     */
    nextToTime: (): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_NEXT_TO_TIME,
    }),
    /**
     * 评价提交
     */
    evaluateSubmit: (): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_EVALUATE_SUBMIT,
    }),
  },
  /**
   * 首页
   */
  HOME: {
    /**
     * 版本更新视图更新按钮
     */
    versionUpdateViewUpdateButton: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.VERSION_UPDATE_VIEW_UPDATE_BUTTON,
    }),
    /**
     * 版本更新视图取消按钮
     */
    versionUpdateViewCancelButton: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.VERSION_UPDATE_VIEW_CANCEL_BUTTON,
    }),
    /**
     * 首页快速更新取消按钮
     */
    homeQuicklyUpdateCancelButton: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_QUICKLY_UPDATE_CANCEL_BUTTON,
    }),
    /**
     * 首页快速更新按钮
     */
    homeQuicklyUpdateButton: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_QUICKLY_UPDATE_BUTTON,
    }),
    /**
     * 首页搜索按钮
     */
    homeSearchButton: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_SEARCH_BUTTON,
    }),
    /**
     * 首页筛选按钮
     */
    homeFilterButton: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_FILTER_BUTTON,
    }),
    /**
     * 首页筛选确认按钮
     */
    homeFilterConfirmButton: (position?: string): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_FILTER_CONFIRM_BUTTON,
      position,
    }),
    /**
     * 首页筛选重置按钮
     */
    homeFilterResetButton: (position?: string): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_FILTER_RESET_BUTTON,
      position,
    }),
    /**
     * 首页顶部入口组件
     */
    homeEntrance: (
      entityName: string,
      entityLocation: string,
    ): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName,
      entityLocation,
    }),
    /**
     * 首页投稿入口组件
     */
    homePostEntrance: (): TrackEventData => ({
      entityType: EntityType.HOME,
      entityName: EntityName.HOME_POST_ENTRANCE,
    }),
  },
  /**
   * 商城
   */
  MALL: {
    /**
     * 黑色星期五活动按钮
     */
    blackFridayActivityButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.BLACK_FRIDAY_ACTIVITY_BUTTON,
    }),
    /**
     * 商城活动奖励按钮
     */
    mallActivityRewardButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_ACTIVITY_REWARD_BUTTON,
    }),
    /**
     * 新用户屏幕返回按钮
     */
    newUserScreenBackButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.NEW_USER_SCREEN_BACK_BUTTON,
    }),
    /**
     * 新用户屏幕页面按钮
     */
    newUserScreenPageButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.NEW_USER_SCREEN_PAGE_BUTTON,
    }),
    /**
     * VIP 力量不足按钮
     */
    vipPowerInsufficientButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.VIP_POWER_INSUFFICIENT_BUTTON,
    }),
    /**
     * VIP 获取更多积分按钮
     */
    vipGetMoreCreditsButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.VIP_GET_MORE_CREDITS_BUTTON,
    }),
    /**
     * 商城快速购买年订阅按钮
     */
    mallQuicklyYearlySubButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_QUICKLY_YEARLY_SUB_BUTTON,
    }),
    /**
     * 商城快速购买月订阅按钮
     */
    mallQuicklyMonthlySubButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_QUICKLY_MONTHLY_SUB_BUTTON,
    }),
    /**
     * 商城购买商品按钮
     */
    mallBuyProductButton: (position?: string): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_BUY_PRODUCT_BUTTON,
      position,
    }),
    /**
     * 商城购买限时商品按钮
     */
    mallBuyLimitedButton: (position?: string): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_BUY_LIMITED_BUTTON,
      position,
    }),
    /**
     * 商城购买订阅按钮
     */
    mallBuySubscriptionButton: (productId?: string): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_BUY_SUBSCRIPTION_BUTTON,
      productId,
    }),
    /**
     * 商城购买记录按钮
     */
    mallBuyRecordButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_BUY_RECORD_BUTTON,
    }),
    /**
     * 商城恢复购买按钮
     */
    mallResumePurchaseButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_RESUME_PURCHASE_BUTTON,
    }),
    /**
     * 商城订阅按钮
     */
    mallSubscriptionButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_SUBSCRIPTION_BUTTON,
    }),
    /**
     * 商城弹窗支付按钮
     */
    mallPaymentPopupButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_PAYMENT_POPUP_BUTTON,
    }),
    /**
     * 无限队列弹窗按钮
     */
    unlimitedQueueModalButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.UNLIMITED_QUEUE_MODAL_BUTTON,
    }),
    /**
     * 新用户48小时按钮
     */
    newUser48HoursButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.NEW_USER_48_HOURS_BUTTON,
    }),
    /**
     * 非VIP力量不足按钮
     */
    notVipPowerInsufficientButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.NOT_VIP_POWER_INSUFFICIENT_BUTTON,
    }),
    /**
     * 限时折扣按钮
     */
    limitedTimeDiscountButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.LIMITED_TIME_DISCOUNT_BUTTON,
    }),
    /**
     * 商城弹窗免费试用按钮
     */
    mallModalFreeTrialButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_MODAL_FREE_TRIAL_BUTTON,
    }),
    /**
     * 商城快速购买20%折扣按钮
     */
    mallQuickly20OffSubButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_QUICKLY_20OFF_SUB_BUTTON,
    }),
    /**
     * VIP支付继续按钮
     */
    vipPayContinueButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.VIP_PAY_CONTINUE_BUTTON,
    }),
    /**
     * VIP支付取消按钮
     */
    vipPayCancelButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.VIP_PAY_CANCEL_BUTTON,
    }),
    /**
     * 商城快速购买按钮
     */
    mallQuicklyBuyButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_QUICKLY_BUY_BUTTON,
    }),
    /**
     * 续订免费试用按钮
     */
    renewFreeTrySubButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.RENEW_FREE_TRY_SUB_BUTTON,
    }),
    /**
     * 首月折扣页面
     */
    firstMonthDiscountPage: (productId: string): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: productId,
    }),
    /**
     * 商城隐私政策视图按钮
     */
    mallPrivacyPolicyViewButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_PRIVACY_POLICY_VIEW_BUTTON,
    }),
    /**
     * 商城创作流顶部横幅
     */
    mallTaskTopBanner: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_TASK_TOP_BANNER,
    }),
    /**
     * 商城创作流顶部横幅关闭按钮
     */
    mallTaskTopBannerCloseButton: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_TASK_TOP_BANNER_CLOSE_BUTTON,
    }),
    /**
     * 创作免费生成按钮
     */
    createFreeGenerate: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_CREATE_FREE_GENERATE,
    }),
    /**
     * 数字人创作公有模式
     */
    mallDigitalCreatePublic: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_DIGITAL_CREATE_PUBLIC,
    }),
    /**
     * 数字人创作私密模式
     */
    mallDigitalCreatePrivate: (): TrackEventData => ({
      entityType: EntityType.MALL,
      entityName: EntityName.MALL_DIGITAL_CREATE_PRIVATE,
    }),
  },
  /**
   * 我的
   */
  MINE: {
    /**
     * 用户信息头像
     */
    userInfoAvatar: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.USER_INFO_HEAD,
    }),
    /**
     * 我的登录
     */
    mineLogin: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_LOGIN,
      entityLocation: EntityLocation.ACCOUNT_MINE_BUTTON,
    }),
    /**
     * 用户头像分享
     */
    userInfoHeadQRCode: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.USER_INFO_HEAD_QR_CODE,
    }),
    /**
     * 用户个人资料
     */
    userInfoProfile: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.USER_INFO_PROFILE,
    }),
    /**
     * 我的未整理作品
     */
    mineUnorganizedWorks: (objType: number): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_UNORGANIZED_WORKS,
      objType,
    }),
    /**
     * 我的文件点击
     */
    mineFileClick: (objType?: number): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_FILE_CLICK,
      objType,
    }),
    /**
     * 我的创作
     */
    mineCreatePost: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_CREATE_POST,
    }),
    /**
     * 我的创作编辑
     */
    mineEditPost: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_EDIT_POST,
    }),
    /**
     * 我的创作上传按钮
     */
    minePostUploadButton: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_POST_UPLOAD_BUTTON,
    }),
    /**
     * 我的创作图片item
     */
    minePostImageItem: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_POST_IMAGE_ITEM,
    }),
    /**
     * 我的创作图片生成按钮
     */
    mineImageGenerationPostButton: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_IMAGE_GENERATION_POST_BUTTON,
    }),
    /**
     * 我的创作视频生成按钮
     */
    mineVideoGenerationPostButton: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_VIDEO_GENERATION_POST_BUTTON,
    }),
    /**
     * 我的创作提交按钮
     */
    mineSubmitNowPost: (): TrackEventData => ({
      entityType: EntityType.MINE,
      entityName: EntityName.MINE_SUBMIT_NOW_POST,
    }),
  },
  /**
   * 组件
   */
  COMPONENT: {
    /**
     * 组件内
     */
    inner: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_INNER,
      objId,
      objType,
    }),
    /**
     * 组件banner
     */
    banner: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_BANNER,
      objId,
      objType,
    }),
    /**
     * 组件链接
     */
    link: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_LINK,
      objId,
      objType,
    }),
    /**
     * 组件历史
     */
    history: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_HISTORY,
      objId,
      objType,
    }),
    /**
     * 组件外
     */
    outer: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_OUTER,
      objId,
      objType,
    }),
    /**
     * AI应用历史
     */
    aiAppHistory: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_AI_APP_HISTORY,
      objId,
      objType,
    }),
    /**
     * 组件标签列表
     */
    tagList: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_TAG_LIST,
      objId,
      objType,
    }),
    /**
     * 组件组标题
     */
    groupTitle: (): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_GROUP_TITLE,
    }),
    /**
     * 组件模板
     */
    template: (
      objId?: string,
      objType?: number,
      position?: string,
    ): TrackEventData => ({
      entityType: EntityType.COMPONENT,
      entityName: EntityName.COMPONENT_TEMPLATE,
      objId,
      objType,
      position,
    }),
  },
  /**
   * 其他
   */
  OTHER: {
    clickPushCharacter: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.PUSH,
      entityName: EntityName.CLICK_MESSAGE_PUSH,
      objId,
      objType,
    }),
  },
  /**
   * 创作
   */
  CREATE: {
    /**
     * 创作同款
     */
    sameCreate: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.USER_ACTION_CREATE,
      objId,
      objType,
    }),
    /**
     * 确认创作同款
     */
    confirmSameCreate: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_CONFIRM,
      objId,
      objType,
    }),
    /**
     * 取消创作同款
     */
    cancelSameCreate: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_CANCEL,
      objId,
      objType,
    }),
    /**
     * 播放次数
     */
    playCount: (objId?: string, objType?: number): TrackEventData => ({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_PLAY_COUNT,
      objId,
      objType,
    }),
    /**
     * 创建模型类型
     */
    createModelType: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_TYPE,
    }),
    /**
     * 创建模型基础
     */
    createModelBase: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_BASE,
    }),
    /**
     * 创建重置按钮
     */
    createResetButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_RESET_BUTTON,
    }),
    /**
     * 创建确认按钮
     */
    createConfirmButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_CONFIRM_BUTTON,
    }),
    /**
     * 创建中心顶部订阅卡片关闭按钮
     */
    centerTopSubCardCloseButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CENTER_TOP_SUB_CARD_CLOSE_BUTTON,
    }),
    /**
     * 创建中心顶部订阅卡片按钮
     */
    centerTopSubCardButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CENTER_TOP_SUB_CARD_BUTTON,
    }),
    /**
     * 创建魔法按钮
     */
    createMagicButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MAGIC_BUTTON,
    }),
    /**
     * 创建高级按钮
     */
    createAdvancedButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_ADVANCED,
    }),
    /**
     * 创建提交按钮
     */
    createSubmitButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_SUBMIT_MODAL_BUTTON,
    }),
    /**
     * 创建添加图片按钮
     */
    createAddImageButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_ADD_IMAGE,
    }),
    /**
     * 创建随机提示词按钮
     */
    createRandomPromptButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_NEW_RANDOM_PROMPT_PRESS,
    }),
    /**
     * 创建随机颜色按钮
     */
    createRandomColorButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_RANDOM_COLOR_PRESS,
    }),
    /**
     * 创作中心快速队列
     */
    centerExperienceFastQueue: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CENTER_EXPERIENCE_FAST_QUEUE,
    }),
    /**
     * 创作右上角眼睛按钮
     */
    createRightMenuEyeButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_RIGHT_MENU_EYE_BUTTON,
    }),
    /**
     * 创作右上角批量操作按钮
     */
    createRightMenuBatchOperationButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_RIGHT_MENU_BATCH_OPERATION_BUTTON,
    }),
    /**
     * 创作右上角筛选按钮
     */
    createRightMenuFilterButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_RIGHT_MENU_FILTER_BUTTON,
    }),
    /**
     * 创作模型按钮
     */
    createModelPress: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_PRESS,
    }),
    /**
     * 创作模型版本按钮
     */
    createModelVersionPress: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_VERSION_PRESS,
    }),
    /**
     * 创作模型版本选择
     */
    createModelVersionSelect: (objId?: string): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_VERSION_SELECT,
      objId,
    }),
    /**
     * 创作重置按钮
     */
    createReset: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_RESET,
    }),
    /**
     * 创作金币按钮
     */
    createCoinPress: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_COIN_PRESS,
    }),
    /**
     * 创作提交按钮
     */
    createSubmit: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_SUBMIT,
    }),
    /**
     * 创作AI效果
     */
    createAiEffect: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_AI_EFFECT,
    }),
    /**
     * 创作AI创作
     */
    createAiCreateSearch: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_AI_CREATE_SEARCH,
    }),
    /**
     * 创作模型选择标签
     */
    createModelSelectTag: (position?: string): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_SELECT_TAG,
      position,
    }),
    /**
     * 创作任务筛选
     */
    createTaskFilter: (position?: string): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_TASK_FILTER,
      position,
    }),
    /**
     * 创作中心图片查看
     */
    centerImageView: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CENTER_IMAGE_VIEW,
    }),
    /**
     * 创作中心左侧菜单详情按钮
     */
    createLeftMenuDetailButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_LEFT_MENU_DETAIL_BUTTON,
    }),
    /**
     * 创作中心左侧菜单切换按钮
     */
    createLeftMenuSwitchButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_LEFT_MENU_SWITCH_BUTTON,
    }),
    /**
     * 创作免费生成按钮
     */
    createFreeGenerate: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_FREE_GENERATE,
    }),
    /**
     * 创作玩一玩
     */
    detailsPlayItEntrance: (
      objId?: string,
      objType?: number,
    ): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.DETAIL_PLAY_IT_ENTRANCE,
      objId,
      objType,
    }),
    /**
     * 创建笔记保存按钮
     */
    createNoteListSaveButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_NOTE_LIST_SAVE_BUTTON,
    }),
    /**
     * 创建笔记应用按钮
     */
    createNoteListApplyButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_NOTE_LIST_APPLY_BUTTON,
    }),
    /**
     * 创建笔记保存按钮
     */
    createEditNoteSaveButton: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_EDIT_NOTE_SAVE_BUTTON,
    }),
    /**
     * 玩一玩搜索快捷应用
     */
    playItSeachQuickApp: (): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.PLAY_IT_SEARCH_QUICK_APP,
    }),

    /**
     * 玩一玩图生视频
     */
    playItImageGenerateVideo: (): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.PLAY_IT_IMAGE_GENERATE_VIDEO,
    }),
    /**
     * 玩一玩生成数字人
     */
    playItGenerateDigitalHuman: (): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.PLAY_IT_GENERATE_DIGITAL_HUMAN,
    }),
    /**
     * 快应用创作随机提示词 点击
     */
    playItCreateRandomPromptClick: (): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.PLAY_IT_CREATE_RANDOM_PROMPT_CLICK,
    }),
    /**
     * 快应用创作提示词润色 点击
     */
    playItCreatePromptPolishClick: (): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.PLAY_IT_CREATE_PROMPT_POLISH_CLICK,
    }),
    /**
     * 快应用创作 跳转 提示词输入页
     */
    quickAppCreateToPromptInputPage: (): TrackEventData => ({
      entityType: EntityType.PLAY_IT,
      entityName: EntityName.QUICK_APP_CREATE_TO_PROMPT_INPUT_PAGE,
    }),

    /**
     * 创作模型搜索页 关闭
     */
    createModelSearchClose: (): TrackEventData => ({
      entityType: EntityType.CREATION,
      entityName: EntityName.CREATE_MODEL_SEARCH_WIN_CLOSE,
    }),
  },
  /**
   * 消息
   */
  MESSAGE: {
    /**
     * 消息系统
     */
    messageSystem: (
      objId?: string,
      objType?: number,
      entityLocation?: string,
    ): TrackEventData => ({
      entityType: EntityType.MESSAGE,
      entityName: EntityName.MESSAGE_SYSTEM,
      entityLocation: entityLocation || EntityName.MESSAGE_ACTIVITY,
      objId,
      objType,
    }),
    /**
     * 消息顶部
     */
    messageTop: (
      objId?: string,
      objType?: number,
      entityLocation?: string,
    ): TrackEventData => ({
      entityType: EntityType.MESSAGE,
      entityName: EntityName.MESSAGE_TOP,
      entityLocation: entityLocation,
      objId,
      objType,
    }),
    /**
     * 消息活动
     */
    messageActivity: (): TrackEventData => ({
      entityType: EntityType.MESSAGE,
      entityName: EntityName.MESSAGE_ACTIVITY,
    }),
  },
  /**
   * 数字人
   */
  DIGITAL: {
    /**
     * 数字人聊天返回
     */
    digitalChatBack: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_BACK,
    }),
    /**
     * 数字人聊天编辑
     */
    digitalChatEdit: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_EDIT,
    }),
    /**
     * 数字人交互事件
     */
    action: (entityName: string): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: entityName,
    }),
    /**
     * 数字人作者
     */
    digitalAuthor: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_AUTHOR,
    }),
    /**
     * 数字人创作
     */
    digitalCreate: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CREATE,
    }),
    /**
     * 数字人聊天顶部导航
     */
    digitalChatTopNav: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_TOP_NAV,
    }),
    /**
     * 数字人评论
     */
    digitalComment: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_COMMENT,
    }),
    /**
     * 数字人聊天输入思考点击
     */
    digitalChatInputThinkingClick: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_INPUT_THINKING_CLICK,
    }),
    /**
     * 数字人聊天输入添加点击
     */
    digitalChatInputAddClick: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_INPUT_ADD_CLICK,
    }),
    /**
     * 数字人聊天输入发送点击
     */
    digitalChatInputSendClick: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_INPUT_SEND_CLICK,
    }),
    /**
     * 数字人详情分享
     */
    digitalDetailShare: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_DETAIL_SHARE,
    }),
    /**
     * 数字人详情取消
     */
    digitalDetailCancel: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_DETAIL_CANCEL,
    }),
    /**
     * 数字人添加角色
     */
    digitalAddCharacter: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_ADD_CHARACTER,
    }),
    /**
     * 数字人搜索
     */
    digitalSearch: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_SEARCH,
    }),
    /**
     * 数字人重置
     */
    digitalReset: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_RESET,
    }),
    /**
     * 数字人发布
     */
    digitalPublish: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_PUBLISH,
    }),
    /**
     * 数字人聊天思考编辑
     */
    digitalChatThinkingEdit: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_THINKING_EDIT,
    }),
    /**
     * 数字人聊天思考切换
     */
    digitalChatThinkingSwitch: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_THINKING_SWITCH,
    }),
    /**
     * 数字人AI快速生成
     */
    digitalAiQuickGenerate: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_AI_QUICK_GENERATE,
    }),
    /**
     * 基础模型切换
     */
    baseModelChange: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.BASE_MODEL_CHANGE,
    }),
    /**
     * 高级模型切换
     */
    advancedModelChange: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.ADVANCED_MODEL_CHANGE,
    }),
    /**
     * 数字人模型选择保存
     */
    digitalModelSelectedSave: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_MODEL_SELECTED_SAVE,
    }),
    /**
     * 数字人模型切换
     */
    switchDigitalModel: (gptModel: string): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_MODEL_SWITCH,
      objId: gptModel,
    }),
    /**
     * 数字人聊天模型切换
     */
    switchDigitalChatModel: (workflowNo: string): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MODEL_SWITCH,
      objId: workflowNo,
    }),
    /**
     * 数字人模型选择取消
     */
    digitalModelSelectedCancel: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_MODEL_SELECTED_CANCEL,
    }),
    /**
     * 数字人聊天模型切换保存
     */
    digitalChatModelSwitchSave: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MODEL_SWITCH_SAVE,
    }),
    /**
     * 数字人聊天模型切换取消
     */
    digitalChatModelSwitchCancel: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MODEL_SWITCH_CANCEL,
    }),
    /**
     * 数字人聊天模型选择
     */
    digitalChatModelSelected: (workflowNo: string): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MODEL_SELECTED,
      objId: workflowNo,
    }),
    /**
     * 数字人特别推荐模型使用
     */
    digitalChatModelHighRecommendedUsed: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MODEL_HIGH_RECOMMENDED_USED,
    }),

    /**
     * 数字人聊天消息重新生成
     */
    digitalChatMessageRecreate: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MESSAGE_RECREATE,
    }),
    /**
     * 数字人聊天消息继续聊天
     */
    digitalChatMessageContinueToChat: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MESSAGE_CONTINUE_TO_CHAT,
    }),
    /**
     * 数字人聊天消息编辑
     */
    digitalChatMessageEdit: (): TrackEventData => ({
      entityType: EntityType.DIGITAL,
      entityName: EntityName.DIGITAL_CHAT_MESSAGE_EDIT,
    }),
  },
  /**
   * 抽屉
   */
  DRAWER: {
    /**
     * 问答
     */
    QUESTION: {
      previous: (): TrackEventData => ({
        entityType: EntityType.DRAWER,
        entityName: EntityName.DRAWER_QUESTION_PREVIOUS,
      }),
      next: (): TrackEventData => ({
        entityType: EntityType.DRAWER,
        entityName: EntityName.DRAWER_QUESTION_NEXT,
      }),
      submit: (): TrackEventData => ({
        entityType: EntityType.DRAWER,
        entityName: EntityName.DRAWER_QUESTION,
      }),
    },
    /**
     * 账号切换
     */
    accountSwitch: (): TrackEventData => ({
      entityType: EntityType.DRAWER,
      entityName: EntityName.DRAWER_ACCOUNT_SWITCH,
    }),
    /**
     * 设置项
     */
    settingItem: (entityName: string): TrackEventData => ({
      entityType: EntityType.DRAWER,
      entityName: entityName,
    }),
    /**
     * 联系我们
     */
    contactUs: (): TrackEventData => ({
      entityType: EntityType.DRAWER,
      entityName: EntityName.DRAWER_CONTACT_US,
    }),
    /**
     * 用户信息头像
     */
    userInfoHead: (): TrackEventData => ({
      entityType: EntityType.DRAWER,
      entityName: EntityName.USER_INFO_HEAD,
    }),
    /**
     * 反馈
     */
    feedback: (): TrackEventData => ({
      entityType: EntityType.DRAWER,
      entityName: EntityName.DRAWER_FEEDBACK,
    }),
  },
  /**
   * 登录注册
   */
  LOGIN_REGISTER: {
    agreementClose: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_PRIVACY_AGREEMENT_CLOSE,
    }),
    agreementRead: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_PRIVACY_AGREEMENT,
    }),
    agreementPrivacy: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_PRIVACY_AGREEMENT,
    }),
    agreementService: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_SERVICE_TERMS,
    }),
    agreementContinue: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_CONTINUE,
    }),
    loginChecked: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_CHECKED,
    }),
    loginForgetPassword: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_FORGET_PASSWORD,
    }),
    loginEmailLogin: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_EMAIL_LOGIN,
    }),
    loginBackToLogin: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_BACK_TO_LOGIN,
    }),
    loginActivateSkip: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_ACTIVATE_SKIP,
    }),
    loginActivateStart: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_ACTIVATE_START,
    }),
    sexNextStep: (entityName: string): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: entityName,
    }),
    interestNextStep: (entityName: string): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: entityName,
    }),
    tagNextStep: (entityName: string): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: entityName,
    }),
    loginResendEmail: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_RESEND_EMAIL,
    }),
    loginApple: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_APPLE,
    }),
    loginGoogle: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_GOOGLE,
    }),
    loginContinue: (): TrackEventData => ({
      entityType: EntityType.LOGIN_REGISTER,
      entityName: EntityName.LOGIN_CONTINUE,
    }),
  },
  /**
   * 音频
   */
  AUDIO: {
    /**
     * 音频试听
     */
    audioPreview: (objId: string, objType: number): TrackEventData => ({
      entityType: EntityType.AUDIO,
      entityName: EntityName.AUDIO_PREVIEW,
      objId,
      objType,
    }),
  },
}
