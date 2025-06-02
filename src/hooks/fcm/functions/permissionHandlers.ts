/**
 * @author 曼巴
 * @filename permissionHandlers.ts
 * @date 2025-05-22 星期四
 * @description 权限处理函数
 */
import { PermissionsAndroid } from 'react-native'
import notifee, { AuthorizationStatus } from '@notifee/react-native'

export const requestIOSPermission = async () => {
  try {
    const settings = await notifee.requestPermission()
    return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED
  } catch (error) {
    console.error('Failed to request iOS notification permission:', error)
    return false
  }
}

export const requestAndroidPermission = async () => {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )

    return result === PermissionsAndroid.RESULTS.GRANTED
  } catch (error) {
    console.error('Failed to request Android notification permission:', error)
    return false
  }
}
