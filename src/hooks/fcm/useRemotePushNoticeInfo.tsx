/**
 * @author 曼巴
 * @filename useRemotePushNoticeInfo.tsx
 * @date 2024-02-27 星期二
 * @description FCM推送通知
 * @description 2025-05-08 17:00 修改-使用平台推送
 */

import { displayNotification } from '@/hooks/fcm/functions/notificationDisplay'
import { handleNotificationClick } from '@/hooks/fcm/functions/notificationHandlers'
import {
  requestAndroidPermission,
  requestIOSPermission,
} from '@/hooks/fcm/functions/permissionHandlers'
import { PushData, PushEvents } from '@/hooks/fcm/types'
import notifee, { EventType } from '@notifee/react-native'
import { useEffect } from 'react'
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native'

export const useRemotePushNoticeInfo = () => {
  useEffect(() => {
    // 初始化权限和前台服务
    const initializeNotifications = async () => {
      // 注册前台服务
      notifee.registerForegroundService((notification) => {
        return displayNotification(notification.data as PushData)
      })

      // 请求权限
      if (Platform.OS === 'android') {
        await requestAndroidPermission()
      } else {
        await requestIOSPermission()
      }
    }

    initializeNotifications()
  }, [])

  useEffect(() => {
    // 前台通知点击监听
    const unsubscribe = notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification?.data) {
        await handleNotificationClick(detail.notification.data)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.SeaArtPushModule)
    const subscriptions: EmitterSubscription[] = []

    // 1. 消息接收监听
    subscriptions.push(
      eventEmitter.addListener(PushEvents.MESSAGE_RECEIVED, (data) => {
        console.log('Message received:', data)

        if (Platform.OS === 'android') {
          displayNotification(data)
        }
      }),
    )

    // 2. 点击事件监听
    subscriptions.push(
      eventEmitter.addListener(PushEvents.NOTIFICATION_CLICKED, (data) => {
        console.log('Notification clicked:', data)

        if (Platform.OS === 'android') {
          try {
            // 基础检查
            if (!data?.message) {
              return
            }

            const messageData = JSON.parse(data.message)

            if (!messageData?.body) {
              return
            }

            const bodyData = JSON.parse(messageData.body)

            handleNotificationClick(bodyData)
          } catch (error) {
            console.error('Error processing notification data:', error)
          }
        } else {
          handleNotificationClick(JSON.parse(data.data.body))
        }
      }),
    )

    // 3. Token接收监听
    // subscriptions.push(
    //   eventEmitter.addListener(PushEvents.TOKEN_RECEIVED, (data) => {
    //     console.log('Token received:', data)

    //     // 更新设备Token
    //     useLoginStore.getState().onUpdateDeviceToken(data.token)
    //   }),
    // )

    // 清理所有订阅
    return () => {
      subscriptions.forEach((subscription) => subscription.remove())
    }
  }, [])

  return null
}
