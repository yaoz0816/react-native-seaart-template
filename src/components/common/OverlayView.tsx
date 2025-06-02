/**
 * @作者 东昊
 * @日期 2024/03/21
 * @用途 提供一个可点击穿透的全屏覆盖层组件
 */

import { tw } from '@/utils/twcss/twrnc'
import React from 'react'
import { View, ViewProps } from 'react-native'

const OverlayView: React.FC<ViewProps> = (props) => {
  return (
    <View
      {...props}
      style={[
        tw('absolute top-0 left-0 right-0 bottom-0 bg-transparent'),
        props.style,
      ]}
      pointerEvents={'box-none'}
    />
  )
}

export default React.memo(OverlayView)
