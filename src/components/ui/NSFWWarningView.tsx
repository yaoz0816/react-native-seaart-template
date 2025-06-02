/**
 * @author wengu
 * @filename NSFWWarningView.tsx
 * @date 2025-03-19 Wednesday
 * @description NSFW内容警告组件
 */
import { useNSFWSettings } from '@/hooks/nwfs/useNSFWSetting'
import {
  EntityName,
  EntityType,
  TrackEventService,
} from '@/utils/track/TrackEventService'
import { tw } from '@/utils/twcss/twrnc'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, Pressable, Text, View } from 'react-native'
import { navigate } from '@/navigation/configs/utils'

type NSFWWarningViewSource = 'search_sensitive_words' | 'createflow_nsfw_work'

type NSFWWarningViewProps = {
  source: NSFWWarningViewSource
}

export const NSFWWarningView = memo(({ source }: NSFWWarningViewProps) => {
  const { t } = useTranslation()

  const { openSystemSettings } = useNSFWSettings()

  useEffect(() => {
    ///曝光打点
    TrackEventService.trackExposure({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_18_SENSITIVE_WORDS,
      entityLocation: source,
    })
  }, [source])

  const handleGoToSettings = () => {
    ///点击打点

    TrackEventService.trackClick({
      entityType: EntityType.USER_ACTION,
      entityName: EntityName.USER_ACTION_18_SENSITIVE_WORDS,
      entityLocation: source,
    })

    if (Platform.OS === 'ios') {
      openSystemSettings()
    } else {
      // 导航到设置页面
      navigate('SettingPage')
    }
  }

  return (
    <View style={tw('mb-[8px] mt-[12px] rounded-[6px] bg-[#1E1E1E] p-[10px]')}>
      <Text style={tw('mb-[4px] text-[14px] font-medium text-[#DEE9F1]')}>
        {t('Adult_Content_2')}
      </Text>
      <Text style={tw('mb-[10px] text-[12px] font-medium text-[#69737B]')}>
        {t('Adult_Content_3')}
      </Text>
      <Pressable
        style={tw('self-start rounded-[4px] bg-[#4D515A] px-[16px] py-[8px]')}
        onPress={handleGoToSettings}>
        <Text style={tw('text-[12px] text-[#DEE9F1]')}>{t('settings')}</Text>
      </Pressable>
    </View>
  )
})

export default NSFWWarningView
