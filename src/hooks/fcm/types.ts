/**
 * @author 曼巴
 * @filename types.ts
 * @date 2025-05-22 星期四
 * @description 推送类型和事件枚举
 */
// ===== 类型定义 =====
export interface PushData {
  obj_id?: string
  obj_type?: string
  title?: string
  intro?: string
  image?: string
  data?: {
    body?: string
    [key: string]: any
  }
  [key: string]: any
}

// ===== 事件枚举 =====
export const PushEvents = {
  MESSAGE_RECEIVED: 'onMessageReceived',
  TOKEN_RECEIVED: 'onTokenReceived',
  NOTIFICATION_CLICKED: 'onClickReceived',
  SOURCE: {
    FIREBASE_MESSAGE: 'firebaseMessage',
    NOTIFICATION_CLICK: 'notificationClick',
    FIREBASE_TOKEN: 'firebaseToken',
  },
} as const
