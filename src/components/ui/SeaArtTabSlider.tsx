/**
 * @author 曼巴
 * @filename SeaArtTabSlider.tsx
 * @date 2025-03-27 星期四
 * @description 标签滑动条
 */

import { tw } from '@/utils/twcss/twrnc'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface TabProps {
  tabs: string[] // 按钮标题数组
  onTabChange?: (index: number) => void // 按钮切换回调
  bottomColor?: string // 底部滑动线颜色 (单色模式)
  gradientColors?: string[] // 底部滑动线渐变色数组
  indicatorWidth?: number | string // 指示器宽度，可以是固定数字或百分比字符串(如 '60%')
  activeTextColor?: string // 激活状态的文字颜色
  inactiveTextColor?: string // 未激活状态的文字颜色
  initialIndex?: number // 初始激活的索引
  activeIndex?: number // 外部控制的激活索引（可选）
}

const SeaArtTabSlider: React.FC<TabProps> = ({
  tabs = [],
  onTabChange,
  bottomColor = '#007AFF',
  gradientColors = ['#007AFF', '#007AFF'],
  indicatorWidth,
  activeTextColor = '#000',
  inactiveTextColor = '#888',
  initialIndex = 0,
  activeIndex: externalActiveIndex, // 外部传入的激活索引
}) => {
  // 当前选中的索引
  const [activeIndex, setActiveIndex] = useState(
    externalActiveIndex ?? initialIndex,
  )

  // 使用ref来避免useEffect依赖问题
  const activeIndexRef = useRef(activeIndex)

  const updateIndicatorPositionRef =
    useRef<(index: number, animated: boolean) => void>()

  // 添加强制重新渲染的状态
  const [forceUpdate, setForceUpdate] = useState(0)

  // 更新ref
  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  // 容器宽度
  const [containerWidth, setContainerWidth] = useState(0)

  // 记录每个标签的宽度和位置
  const [tabMeasurements, setTabMeasurements] = useState<
    { width: number; x: number }[]
  >([])

  // 创建一个动画值用于横线的位移
  const slideAnim = useRef(new Animated.Value(0)).current

  // 屏幕宽度
  const screenWidth = Dimensions.get('window').width

  // 每个按钮的宽度
  const tabWidth =
    containerWidth > 0
      ? containerWidth / tabs.length
      : screenWidth / tabs.length

  // 获取指示器最终宽度
  const getIndicatorWidth = useCallback(
    (tabIndex: number) => {
      // 如果指定了固定宽度，则使用固定宽度
      if (typeof indicatorWidth === 'number') {
        return indicatorWidth
      }

      // 如果指定了百分比宽度
      if (typeof indicatorWidth === 'string' && indicatorWidth.includes('%')) {
        const percentage = parseFloat(indicatorWidth) / 100
        return (
          tabMeasurements[tabIndex]?.width * percentage || tabWidth * percentage
        )
      }

      // 默认使用标签宽度
      return tabMeasurements[tabIndex]?.width || tabWidth
    },
    [indicatorWidth, tabMeasurements, tabWidth],
  )

  // 更新指示器位置的函数
  const updateIndicatorPosition = useCallback(
    (targetIndex: number, animated: boolean = true) => {
      console.log(
        '🎯 SeaArtTabSlider: updateIndicatorPosition to index:',
        targetIndex,
      )
      console.log(
        '🎯 SeaArtTabSlider: tabMeasurements available:',
        tabMeasurements.length > 0,
      )
      console.log('🎯 SeaArtTabSlider: containerWidth:', containerWidth)
      console.log('🎯 SeaArtTabSlider: tabWidth calculated:', tabWidth)
      console.log('🎯 SeaArtTabSlider: tabMeasurements data:', tabMeasurements)

      // 确保索引有效
      if (targetIndex < 0 || targetIndex >= tabs.length) {
        console.log('❌ SeaArtTabSlider: Invalid targetIndex:', targetIndex)
        return
      }

      // 优先使用测量值，否则使用计算值
      let targetX = 0
      let indicatorWidthValue = 0

      if (tabMeasurements[targetIndex]) {
        // 有测量数据时使用精确值
        targetX = tabMeasurements[targetIndex].x
        indicatorWidthValue = getIndicatorWidth(targetIndex)
        console.log('🎯 SeaArtTabSlider: Using measured values')
      } else {
        // 没有测量数据时使用计算值
        targetX = targetIndex * tabWidth
        indicatorWidthValue = getIndicatorWidth(targetIndex)
        console.log('🎯 SeaArtTabSlider: Using calculated values')
      }

      // 计算居中位置
      const tabItemWidth = tabMeasurements[targetIndex]?.width || tabWidth
      const centerOffset = (tabItemWidth - indicatorWidthValue) / 2
      const finalX = targetX + centerOffset

      console.log('📏 SeaArtTabSlider: Position calculation:', {
        targetIndex,
        targetX,
        indicatorWidthValue,
        centerOffset,
        finalX,
        tabItemWidth,
        hasMeasurements: !!tabMeasurements[targetIndex],
      })

      // 强制停止之前的动画
      slideAnim.stopAnimation(() => {
        console.log('🛑 SeaArtTabSlider: Previous animation stopped')

        if (animated) {
          console.log('🚀 SeaArtTabSlider: Starting new animation to:', finalX)
          Animated.spring(slideAnim, {
            toValue: finalX,
            useNativeDriver: true,
            friction: 8, // 增加摩擦力，让动画更稳定
            tension: 100, // 增加张力，让动画更快
          }).start(() => {
            console.log(
              '✅ SeaArtTabSlider: Animation completed to position:',
              finalX,
            )
          })
        } else {
          console.log(
            '📍 SeaArtTabSlider: Setting position directly to:',
            finalX,
          )
          slideAnim.setValue(finalX)
        }
      })
    },
    [
      tabMeasurements,
      tabWidth,
      getIndicatorWidth,
      slideAnim,
      containerWidth,
      tabs.length,
    ],
  )

  // 监听外部传入的activeIndex变化 - 暂时注释掉，专注于点击功能
  useEffect(() => {
    console.log('🔄 SeaArtTabSlider: External state check')
    console.log('🔄 SeaArtTabSlider: externalActiveIndex:', externalActiveIndex)
    console.log(
      '🔄 SeaArtTabSlider: current activeIndex:',
      activeIndexRef.current,
    )

    // 只在外部索引确实不同时才更新
    if (
      externalActiveIndex !== undefined &&
      externalActiveIndex !== activeIndexRef.current
    ) {
      console.log(
        '🔄 SeaArtTabSlider: External activeIndex changed from',
        activeIndexRef.current,
        'to',
        externalActiveIndex,
      )
      setActiveIndex(externalActiveIndex)

      // 使用更长的延迟确保状态稳定
      setTimeout(() => {
        console.log(
          '🔄 SeaArtTabSlider: Updating position due to external change',
        )
        updateIndicatorPosition(externalActiveIndex, true)
      }, 50) // 增加延迟到50ms
    }
  }, [externalActiveIndex, updateIndicatorPosition])

  // 获取容器的宽度
  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout
    console.log('📐 SeaArtTabSlider: Container width:', width)
    setContainerWidth(width)
  }

  // 获取每个标签的宽度和位置
  const measureTab = (index: number, e: LayoutChangeEvent) => {
    const { width, x } = e.nativeEvent.layout
    console.log(`📏 SeaArtTabSlider: Tab ${index} measured:`, { width, x })

    setTabMeasurements((prev) => {
      const newMeasurements = [...prev]
      newMeasurements[index] = { width, x }

      // 如果这是最后一个tab的测量，立即更新位置
      if (
        newMeasurements.length === tabs.length &&
        newMeasurements.every((m) => m)
      ) {
        console.log('📏 SeaArtTabSlider: All tabs measured, updating position')
        setTimeout(() => updateIndicatorPosition(activeIndex, false), 0)
      }

      return newMeasurements
    })
  }

  // 处理按钮点击事件
  const handleTabPress = (index: number) => {
    console.log(
      '👆 SeaArtTabSlider: Tab pressed:',
      index,
      'current active:',
      activeIndex,
    )

    // 如果点击的是当前激活的标签，也要确保位置正确
    if (index === activeIndex) {
      console.log(
        '👆 SeaArtTabSlider: Same tab clicked, ensuring position is correct',
      )
      setForceUpdate((prev) => prev + 1) // 强制重新渲染
      updateIndicatorPosition(index, true)
      return
    }

    // 立即更新内部状态
    setActiveIndex(index)
    console.log('👆 SeaArtTabSlider: Internal activeIndex updated to:', index)

    // 强制重新渲染
    setForceUpdate((prev) => prev + 1)

    // 使用setTimeout确保状态更新后再更新位置
    setTimeout(() => {
      console.log('👆 SeaArtTabSlider: About to call updateIndicatorPosition')
      updateIndicatorPosition(index, true)
    }, 0)

    // 最后触发回调（避免回调影响指示器更新）
    if (onTabChange) {
      console.log('📢 SeaArtTabSlider: Calling onTabChange with index:', index)
      onTabChange(index)
    }
  }

  // 当测量数据完成时，初始化指示器位置
  useEffect(() => {
    if (
      tabMeasurements.length === tabs.length &&
      tabMeasurements.every((m) => m) &&
      activeIndex >= 0
    ) {
      console.log(
        '🔄 SeaArtTabSlider: Measurements complete, initializing position for index:',
        activeIndex,
      )
      updateIndicatorPosition(activeIndex, false)
    }
  }, [tabMeasurements, tabs.length, activeIndex, updateIndicatorPosition])

  console.log(
    '🎯 SeaArtTabSlider: Rendering with activeIndex:',
    activeIndex,
    'external:',
    externalActiveIndex,
  )
  console.log('🎯 SeaArtTabSlider: Rendering - forceUpdate:', forceUpdate)
  console.log(
    '🎯 SeaArtTabSlider: Rendering - indicatorWidth for activeIndex:',
    getIndicatorWidth(activeIndex),
  )

  return (
    <View style={tw('w-full')} onLayout={onLayout}>
      {/* 按钮区域 */}
      <View style={tw('flex-row items-center')}>
        {tabs.map((tab, index) => (
          <Pressable
            key={index}
            style={tw('flex-1 items-center py-[12px]')}
            onPress={() => handleTabPress(index)}
            onLayout={(e) => measureTab(index, e)}>
            <Text
              style={tw(
                'text-[16px]',
                activeIndex === index
                  ? `text-[${activeTextColor}] font-bold`
                  : `text-[${inactiveTextColor}]`,
              )}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 底部滑动线 */}
      <View style={tw('relative h-[3px] bg-[rgba(255,255,255,0.2)]')}>
        <Animated.View
          key={`indicator-${activeIndex}-${forceUpdate}`} // 添加key确保重新渲染
          style={[
            tw(`absolute bottom-0 left-0 h-[3px]`),
            {
              width: getIndicatorWidth(activeIndex),
              transform: [{ translateX: slideAnim }],
            },
          ]}>
          {gradientColors ? (
            <LinearGradient
              colors={gradientColors as [string, string, ...string[]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={tw('h-full w-full')}
            />
          ) : (
            <View style={tw('h-full w-full', `bg-[${bottomColor}]`)} />
          )}
        </Animated.View>
      </View>
    </View>
  )
}

export default SeaArtTabSlider
