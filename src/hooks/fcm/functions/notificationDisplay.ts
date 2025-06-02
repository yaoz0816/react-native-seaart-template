/**
 * @author 曼巴
 * @filename notificationDisplay.ts
 * @date 2025-05-22 星期四
 * @description 通知显示函数
 */
import notifee from '@notifee/react-native'
import { PushData } from '../types'
import { createNotificationConfig } from './notificationConfig'

export const displayNotification = async (
  message?: PushData,
): Promise<void> => {
  if (!message) {
    return
  }

  try {
    const bodyData = message?.data?.body ? JSON.parse(message.data.body) : null
    const { androidConfig, iosConfig } = createNotificationConfig(message)

    await notifee.displayNotification({
      title: message.title,
      body: bodyData?.body || '',
      id: bodyData?.obj_type || 'default',
      data: {
        obj_type: bodyData?.obj_type,
        obj_id: bodyData?.obj_id,
        fullData: JSON.stringify(bodyData),
      },
      android: androidConfig,
      ios: iosConfig,
    })
  } catch (error) {
    console.error('Failed to display notification:', error)
  }
}
