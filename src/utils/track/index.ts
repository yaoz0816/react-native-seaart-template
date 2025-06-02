/**
 * @author 曼巴
 * @filename index.ts
 * @date 2025-05-31 星期六
 * @description 埋点事件工具导出
 */

export {
  trackEvent,
  afLogEvent,
  TRACK_EVENTS,
  useTrackEvent,
  useTrackDataMap,
} from './TrackEventHelper'
export { TrackEventService, EventName } from './TrackEventService'
export {
  EntityType,
  EntityName,
  EntityLocation,
  OperationType,
} from './TrackEventConstant'
export { AppsflyerEnumEventName } from './AppsflyerEnumEventName'
export {
  getPageLocationParams,
  buildTrackPath,
  updateRouteHistory,
  getCurrentPageTrackParams,
  getDetailType,
  getMsgListType,
  getFollowType,
  getTaskType,
} from './PageRouteParams'
export {
  WorksTypeMap,
  MessageTypeMap,
  TabKeyToValueMap,
  OuterItemTypeMap,
} from './AllObjTypeMapValue'
export type { TrackEventOptions } from './TrackEventConstant'
export type { TrackEventData } from './TrackEventHelper'
