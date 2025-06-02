/**
 * @author 曼巴
 * @filename SeaArtShow.tsx
 * @date 2024-08-21 星期三
 * @description 处理三元运算
 */
import { memo, ReactNode } from 'react'

type SeaArtShowProps = {
  when: boolean
  fallback?: ReactNode
  children: ReactNode
}

const SeaArtShow = ({ when, fallback = null, children }: SeaArtShowProps) => {
  return when ? children : fallback
}

export default memo(SeaArtShow)
