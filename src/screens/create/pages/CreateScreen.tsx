/**
 * @filename CreateScreen.tsx
 * @description 创作页面组件
 */

import React from 'react'
import { Text, View } from 'react-native'
import { tw } from '../../../utils/twcss/twrnc'
import RNImageDemo from '../../example/pages/RNImageDemo'

const CreateScreen: React.FC = () => {
  return (
    <View style={tw('flex-1 bg-gray-100')}>
      <Text style={tw('text-24 font-bold mx-10 mt-20 text-gray-800')}>
        RN-Image
      </Text>
      <RNImageDemo />
    </View>
  )
}

export default CreateScreen
