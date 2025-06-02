/**
 * @author 曼巴
 * @filename TrackEventService.ts
 * @date 2025-04-18 星期五
 * @description 埋点服务
 */

import { trackEvent } from '@/utils/track/TrackEventHelper'
import {
  type TrackEventOptions,
  EntityName,
  EntityType,
  OperationType,
} from './TrackEventConstant'

/**事件名称枚举*/
export const EventName = {
  LOG_ACTION_FRONT: 'log_action_front',
  SEARCH: 'log_action_front_search',
  LOG_DEVICE_INFO_COLLECT: 'log_device_info_collect',
  LOG_GRAY_REPORT: 'log_gray_report',
  LOG_ORDER_PAY: 'log_order_pay',
}

class TrackEventService {
  // 曝光事件
  static trackExposure = (
    options: Omit<TrackEventOptions, 'front_operation'>,
  ) => {
    trackEvent(EventName.LOG_ACTION_FRONT, {
      ...options,
      frontOperation: OperationType.EXPOSURE,
    } as TrackEventOptions)
  }

  // 点击事件
  static trackClick = (options: Omit<TrackEventOptions, 'front_operation'>) => {
    trackEvent(EventName.LOG_ACTION_FRONT, {
      ...options,
      frontOperation: OperationType.CLICK,
    } as TrackEventOptions)
  }

  // 灰度上报
  static trackGrayReport = (
    options: Omit<TrackEventOptions, 'front_operation'>,
  ) => {
    trackEvent(EventName.LOG_GRAY_REPORT, {
      ...options,
      frontOperation: OperationType.EXPOSURE,
    } as TrackEventOptions)
  }

  // 订单支付
  static trackOrderPay = (
    options: Omit<TrackEventOptions, 'front_operation'>,
  ) => {
    trackEvent(EventName.LOG_ORDER_PAY, {
      ...options,
      frontOperation: OperationType.CLICK,
    } as TrackEventOptions)
  }
}

export {
  EntityName,
  EntityType,
  OperationType,
  TrackEventOptions,
  TrackEventService,
}
