/**
 * @filename assets.d.ts
 * @description 资源文件类型声明
 */

// SVG 图标类型声明
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'

  const SVGComponent: React.FC<SvgProps>
  export default SVGComponent
}

// 图片资源类型声明
declare module '*.png' {
  import { ImageSourcePropType } from 'react-native'
  const content: ImageSourcePropType
  export default content
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native'
  const content: ImageSourcePropType
  export default content
}

declare module '*.jpeg' {
  import { ImageSourcePropType } from 'react-native'
  const content: ImageSourcePropType
  export default content
}

declare module '*.gif' {
  import { ImageSourcePropType } from 'react-native'
  const content: ImageSourcePropType
  export default content
}

declare module '*.webp' {
  import { ImageSourcePropType } from 'react-native'
  const content: ImageSourcePropType
  export default content
}

// 字体文件
declare module '*.ttf' {
  const content: string
  export default content
}

declare module '*.otf' {
  const content: string
  export default content
}

// JSON 数据文件
declare module '*.json' {
  const content: any
  export default content
}
