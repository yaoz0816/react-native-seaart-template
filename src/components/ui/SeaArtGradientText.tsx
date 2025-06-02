/**
 * @author 曼巴
 * @description: 文字渐变
 * @date 2023-07-24 14:59
 */
import { tw } from '@/utils/twcss/twrnc'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

type IProps = {
  title: string
  colors: string[]
  textFont?: StyleProp<TextStyle>
}

const SeaArtGradientText = ({ title, colors, textFont }: IProps) => (
  <MaskedView
    maskElement={
      <Text style={[tw('text-20 text-black font-bold'), textFont]}>
        {title}
      </Text>
    }>
    <LinearGradient
      colors={colors as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <Text style={[tw('text-20 text-transparent font-bold'), textFont]}>
        {title}
      </Text>
    </LinearGradient>
  </MaskedView>
)

export default memo(SeaArtGradientText)
