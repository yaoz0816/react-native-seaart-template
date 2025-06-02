/**
 * @作者 东昊
 * @日期 2025/03/07
 * @用途 根据频道类型，返回对应的组件
 */

import React from 'react'
import { FeatureKey, APPGRAY_FEATURE } from './ChannelManager'
import { useChannelStore } from './useChannelStore'

/**
 * 根据频道类型返回对应的React组件
 * @param props 包含各个频道对应组件的对象
 * @param props.A A频道组件
 * @param props.B B频道组件
 * @param props.C C频道组件
 * ...等其他频道组件
 * @param featureKey 可选，灰度功能标识，不传则使用全局APP灰度状态
 * @returns 返回当前激活频道对应的组件，如果没有找到对应频道的组件，则返回A频道的组件作为默认组件
 * @example
 * // 基础用法
 * const MyComponent = withChannelComponent({
 *   A: ComponentA,
 *   B: ComponentB,
 * })
 *
 * // 指定特定功能的灰度
 * const SearchComponent = withChannelComponent({
 *   A: SearchComponentA,
 *   B: SearchComponentB,
 * }, 'search')
 */
export const withChannelComponent = <P extends object>(
  props: {
    [key in Channel]?: React.ComponentType<P>
  },
  featureKey?: FeatureKey,
) => {
  // 创建并返回一个新的函数组件
  const Component = (componentProps: P) => {
    // 获取灰度状态
    const store = useChannelStore.getState()

    const channel =
      !featureKey || featureKey === APPGRAY_FEATURE
        ? store.channel
        : store.featureChannels[featureKey]

    // 优先使用当前频道组件
    if (props[channel]) {
      const ChannelComponent = props[channel] as React.ComponentType<P>
      return React.createElement(ChannelComponent, componentProps)
    }

    // 如果当前频道组件不存在，则使用A频道组件作为默认值
    if (props.A) {
      if (channel !== 'A') {
        console.warn(
          `${channel}频道组件未提供，已回退使用A频道组件作为默认组件`,
        )
      }

      const DefaultComponent = props.A
      return React.createElement(DefaultComponent, componentProps)
    }

    // 两者都不存在时输出错误并返回null
    console.error(`A频道组件未提供，无法渲染组件`)
    return null
  }

  return Component
}

/**
 * 根据频道类型返回对应的函数
 * @param props 包含各个频道对应函数的对象
 * @param props.A A频道函数
 * @param props.B B频道函数
 * @param props.C C频道函数
 * ...等其他频道函数
 * @param featureKey 可选，灰度功能标识，不传则使用全局APP灰度状态
 * @returns 返回当前激活频道对应的函数，如果没有找到对应频道的函数，则返回A频道的函数作为默认函数
 * @example
 * const handleSubmit = withChannelFunction({
 *   A: handleSubmitA,
 *   B: handleSubmitB,
 * })
 *
 * // 指定特定功能的灰度
 * const processData = withChannelFunction({
 *   A: processDataA,
 *   B: processDataB,
 * }, 'data_processing')
 */
export const withChannelFunction = <T extends Function>(
  props: {
    [key in Channel]?: T
  },
  featureKey?: FeatureKey,
): T | null => {
  // 获取灰度状态
  const store = useChannelStore.getState()

  const channel =
    !featureKey || featureKey === APPGRAY_FEATURE
      ? store.channel
      : store.featureChannels[featureKey]

  // 优先使用当前频道函数
  if (props[channel]) {
    return props[channel]
  }

  // 如果当前频道函数不存在，则使用A频道函数作为默认值
  if (props.A) {
    if (channel !== 'A') {
      console.warn(`${channel}频道函数未提供，已回退使用A频道函数作为默认函数`)
    }

    return props.A
  }

  // 两者都不存在时输出错误并返回空函数
  console.error(`A频道函数未提供，无法使用默认函数`)
  return null
}

/**
 * 根据频道类型返回对应的值
 * @param props 包含各个频道对应值的对象
 * @param props.A A频道对应的值
 * @param props.B B频道对应的值
 * @param props.C C频道对应的值
 * ...等其他频道值
 * @param featureKey 可选，灰度功能标识，不传则使用全局APP灰度状态
 * @returns 返回当前激活频道对应的值，如果没有找到对应频道的值，则返回A频道的值作为默认值
 * @example
 * const config = withChannelValue({
 *   A: { color: 'red', size: 'large' },
 *   B: { color: 'blue', size: 'medium' },
 *   C: { color: 'green', size: 'small' },
 * })
 *
 * // 在代码中使用
 * const { color, size } = config
 *
 * // 指定特定功能的灰度
 * const searchConfig = withChannelValue({
 *   A: { algorithm: 'vector', maxResults: 20 },
 *   B: { algorithm: 'hybrid', maxResults: 30 },
 * }, 'search')
 */
export const withChannelValue = <T>(
  props: {
    [key in Channel]?: T
  },
  featureKey?: FeatureKey,
): T | null => {
  // 获取灰度状态
  const store = useChannelStore.getState()

  const channel =
    !featureKey || featureKey === APPGRAY_FEATURE
      ? store.channel
      : store.featureChannels[featureKey]

  // 优先使用当前频道值
  if (props[channel]) {
    return props[channel]
  }

  // 如果A频道值存在，则使用A作为默认
  if (props.A) {
    if (channel !== 'A') {
      console.warn(`${channel}频道值未提供，已回退使用A频道值作为默认值`)
    }

    return props.A
  }

  // 两者都不存在时输出错误并返回null
  console.error(`A频道值未提供，无法使用默认值`)
  return null
}
