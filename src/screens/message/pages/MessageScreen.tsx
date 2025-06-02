/**
 * @filename MessageScreen.tsx
 * @description 消息页面组件
 */

import React from 'react'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import DemoListScreen from '@/screens/message/pages/DemoListScreen'
import { tw } from '@/utils/twcss/twrnc'
import { useColors } from '@/theme'

const MessageScreen: React.FC = () => {
  const colors = useColors()
  return (
    <SeaArtBasePage>
      <SeaArtNavBarView
        title={'欢迎来到消息中心 🎉'}
        backgroundColor={colors.background}
        titleStyle={tw(`text-[${colors.text.primary}]`)}
      />

      <DemoListScreen />
    </SeaArtBasePage>
  )
}

export default MessageScreen
