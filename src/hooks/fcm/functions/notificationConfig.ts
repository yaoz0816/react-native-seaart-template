/**
 * @author 曼巴
 * @date 2025-05-22 星期四
 * @function 创建通知配置

 */

import { AndroidImportance } from '@notifee/react-native'
import { PushData } from '../types'

export const createNotificationConfig = (message: PushData) => {
  const androidConfig = {
    channelId: 'default',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    pressAction: { id: 'default' },
    ...(message?.image && { largeIcon: message.image }),
  }

  const iosConfig = {
    sound: 'default',
    foregroundPresentationOptions: {
      banner: true,
      sound: true,
      badge: true,
      list: true,
    },
  }

  return { androidConfig, iosConfig }
}
