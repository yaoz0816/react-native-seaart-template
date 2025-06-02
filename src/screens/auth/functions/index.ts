import { LOGIN_TYPE, PopUpType } from '@/config/enum'
import { mmkv } from '@/utils/mmkv/StorageMMKV'
import { AppsflyerEnumEventName } from '@/utils/track/AppsflyerEnumEventName'
import { afLogEvent } from '@/utils/track/TrackEventHelper'

//点击底部标签
export enum Bottom_Tabs_Name {
  首页 = 'HomePage',
  赛博酒吧 = 'DigitalNewPage',
  创作 = 'CreateButton',
  任务流 = 'MessageCenter',
  我的 = 'Mine',
}

/**登录失败打点*/
export const loginFailureTrack = (loginType: LOGIN_TYPE, msg?: string) => {
  afLogEvent(AppsflyerEnumEventName.sdk登录失败)
  afLogEvent(AppsflyerEnumEventName.登陆失败)

  if (loginType === LOGIN_TYPE.FACEBOOK) {
    afLogEvent(AppsflyerEnumEventName.facebook注册失败, {
      reason: 'LoginFailed' + msg || '',
    })
  } else if (loginType === LOGIN_TYPE.GOOGLE) {
    afLogEvent(AppsflyerEnumEventName.谷歌注册失败, {
      reason: 'LoginFailed' + msg || '',
    })
  } else if (loginType === LOGIN_TYPE.DiscordToken) {
    afLogEvent(AppsflyerEnumEventName.discord注册失败, {
      reason: 'LoginFailed' + msg || '',
    })
  } else if (loginType === LOGIN_TYPE.EMAIL) {
    afLogEvent(AppsflyerEnumEventName.邮箱注册失败, {
      reason: 'LoginFailed' + msg || '',
    })
  }
}

/**登录成功打点*/
export const loginSuccessTrack = (loginType: LOGIN_TYPE) => {
  afLogEvent(AppsflyerEnumEventName.sdk登录成功)

  if (loginType === LOGIN_TYPE.FACEBOOK) {
    afLogEvent(AppsflyerEnumEventName.facebook登录)
    afLogEvent(AppsflyerEnumEventName.登录sdk结束)
  } else if (loginType === LOGIN_TYPE.GOOGLE) {
    afLogEvent(AppsflyerEnumEventName.谷歌登录)
    afLogEvent(AppsflyerEnumEventName.登录sdk结束)
  } else if (loginType === LOGIN_TYPE.DiscordToken) {
    afLogEvent(AppsflyerEnumEventName.discord登录)
  }
}

/**注册失败打点*/
export const registerFailureTrack = (loginType: LOGIN_TYPE, reason: string) => {
  if (loginType === LOGIN_TYPE.FACEBOOK) {
    afLogEvent(AppsflyerEnumEventName.facebook注册失败, { reason })
    afLogEvent(AppsflyerEnumEventName.登录sdk结束)
  } else if (loginType === LOGIN_TYPE.GOOGLE) {
    afLogEvent(AppsflyerEnumEventName.谷歌注册失败, { reason })
    afLogEvent(AppsflyerEnumEventName.登录sdk结束)
  } else if (loginType === LOGIN_TYPE.DiscordToken) {
    afLogEvent(AppsflyerEnumEventName.discord注册失败, { reason })
  } else if (loginType === LOGIN_TYPE.EMAIL) {
    afLogEvent(AppsflyerEnumEventName.邮箱注册失败, { reason })
  }
}

/**注册成功打点*/
export const registerSuccessTrack = (loginType: LOGIN_TYPE) => {
  if (loginType === LOGIN_TYPE.FACEBOOK) {
    afLogEvent(AppsflyerEnumEventName.facebook注册成功)
    afLogEvent(AppsflyerEnumEventName.登录sdk结束)
  } else if (loginType === LOGIN_TYPE.GOOGLE) {
    afLogEvent(AppsflyerEnumEventName.谷歌注册成功)
    afLogEvent(AppsflyerEnumEventName.登录sdk结束)
  } else if (loginType === LOGIN_TYPE.DiscordToken) {
    afLogEvent(AppsflyerEnumEventName.discord注册成功)
  } else if (loginType === LOGIN_TYPE.EMAIL) {
    afLogEvent(AppsflyerEnumEventName.邮箱注册成功)
  }
}

///判断注册时间是否大于5天
export function isRegisteredMoreThan5Days(create_at: number) {
  // 获取当前时间的时间戳
  const now = Date.now()
  // 计算差值（单位：毫秒）
  let diff = 0

  if (create_at) {
    diff = now - create_at
  }

  // 将毫秒转换为天数
  const days = diff / (1000 * 60 * 60 * 24)
  // 判断是否超过5天
  return days < 5
}

///判断是否是48小时内注册
export const isNewUserIn48hours = (create_at: number) => {
  const now = new Date().getTime()
  const hoursDiff = (now - create_at) / (1000 * 60 * 60)

  return hoursDiff < 48
}

///判断是否是24小时内注册
export const isNewUserIn24hours = (create_at: number) => {
  const now = new Date().getTime()
  const hoursDiff = (now - create_at) / (1000 * 60 * 60)

  return hoursDiff < 24
}

///判断SVip过期后3天内
export const isExpiredAfterThree = (big_expiry_time: number) => {
  // 过期时间戳
  const futureTimestamp = big_expiry_time
  // 当前时间戳
  const currentTimestamp = Date.now()

  if (!futureTimestamp) {
    return false
  }

  const diff = currentTimestamp - futureTimestamp <= 3 * 24 * 60 * 60 * 1000

  // 计算给定时间后3天的时间戳
  // 检查当前时间是否已经超过给定时间后3天
  if (currentTimestamp - futureTimestamp < 0) {
    console.log('还没有过期')
    return false
  } else {
    if (diff) {
      console.log('已过期但是还没有到3天')
      return true
    } else {
      console.log('已过期超过3天')
      return false
    }
  }
}

/**
 * 获取从1970年1月1日至今的天数
 * @returns 天数
 */
export const getDayExpire1970 = (): number => {
  const now = new Date()

  // 使用UTC时间，避免时区问题
  const utcDay =
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) /
    (1000 * 60 * 60 * 24)

  return Math.floor(utcDay)
}

/**
 * 根据用户创建时间计算实际留存天数
 * @param createAt 用户创建时间（毫秒时间戳）
 * @returns 实际留存天数
 */
export const calculateActualRetentionDays = (createAt: number): number => {
  if (!createAt) {
    return 0
  }

  const now = Date.now()
  const diffInMs = now - createAt
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  return diffInDays
}

/**
 * 跟踪用户登录后的留存情况
 * 在特定的留存天数（2天、3天、7天、14天、30天）触发相应的事件
 *
 * @param id 用户ID
 * @param createAt 用户创建时间（毫秒时间戳）
 * @returns 触发的留存事件天数，如果没有触发则返回null
 */
export const doTrackEventAfterLoginRetention = (
  id: string,
  createAt: number,
): number | null => {
  try {
    if (!id) {
      console.error('用户ID不能为空')
      return null
    }

    // 存储键
    const key = `TRACK_LOGIN_${id}`

    // 获取当前日期（天数）
    const currentDayCount = getDayExpire1970()

    // 获取上次登录日期
    const lastLoginDay = mmkv.getNumber(key)

    // 首次登录，记录当前日期并返回
    if (!lastLoginDay) {
      mmkv.set(key, currentDayCount)
      return null
    }

    // 如果是同一天登录，不做处理
    if (lastLoginDay === currentDayCount) {
      return null
    }

    // 计算天数差
    const dayDifference = currentDayCount - lastLoginDay

    // 定义需要跟踪的留存天数和对应的事件
    const retentionTracking = [
      { days: 1, event: AppsflyerEnumEventName.次日留存 },
      { days: 2, event: AppsflyerEnumEventName.三日留存 },
      { days: 6, event: AppsflyerEnumEventName.七日留存 },
      { days: 13, event: AppsflyerEnumEventName.十四日留存 },
      { days: 29, event: AppsflyerEnumEventName.三十日留存 },
    ]

    // 查找匹配的留存天数
    const matchedTracking = retentionTracking.find(
      (item) => item.days === dayDifference,
    )

    // 如果找到匹配的留存天数，触发相应事件
    if (matchedTracking) {
      afLogEvent(matchedTracking.event)

      // 使用用户创建时间计算实际留存天数（用于日志和调试）
      if (__DEV__) {
        const actualRetentionDays = calculateActualRetentionDays(createAt)
        console.log(
          `用户 ${id} 触发 ${
            dayDifference + 1
          } 天留存事件，实际注册天数: ${actualRetentionDays}`,
        )
      }

      // 更新最后登录日期
      mmkv.set(key, currentDayCount)

      return dayDifference + 1 // 返回实际留存天数（比如1对应2天留存）
    }

    // 不是特定的留存天数，只更新登录日期
    mmkv.set(key, currentDayCount)
    return null
  } catch (error) {
    console.error('跟踪用户留存事件失败:', error)
    return null
  }
}

/**
 * 将登录类型转换为字符串
 * @param loginType 登录类型
 * @returns 登录类型字符串
 */
export const loginTypeString = (loginType: LOGIN_TYPE | number | undefined) => {
  switch (loginType) {
    case LOGIN_TYPE.EMAIL:
      return 'email'
    case LOGIN_TYPE.GOOGLE:
      return 'google'
    case LOGIN_TYPE.FACEBOOK:
      return 'facebook'
    case LOGIN_TYPE.DiscordToken:
      return 'discord'
    case LOGIN_TYPE.APPLE:
      return 'apple'
    default:
      return ''
  }
}

/**
 * 底部标签页类型映射
 * 使用对象映射代替 switch 语句，提高执行效率
 */
const TAB_TYPE_MAP: Record<Bottom_Tabs_Name, number> = {
  [Bottom_Tabs_Name.首页]: 1,
  [Bottom_Tabs_Name.赛博酒吧]: 2,
  [Bottom_Tabs_Name.创作]: 3,
  [Bottom_Tabs_Name.任务流]: 4,
  [Bottom_Tabs_Name.我的]: 5,
}

/**
 * 获取底部标签页类型值
 * @param type 标签页名称
 * @returns 对应的类型值
 */
export const bottomTabType = (type: Bottom_Tabs_Name): number | undefined => {
  return TAB_TYPE_MAP[type]
}

/**
 * 计算折扣
 * @param popType 弹窗类型
 * @param isReviewMode 是否是审核模式
 * @returns 是否可以享受折扣
 */
export const calculateDiscount = (
  popType: PopUpType,
  isReviewMode: boolean,
) => {
  return (
    (popType === PopUpType.唤醒去新付费用户 ||
      popType === PopUpType.年升年用户 ||
      popType === PopUpType.月升年用户 ||
      popType === PopUpType.未付过费的老用户破冰) &&
    !isReviewMode
  )
}
