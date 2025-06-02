/**
 * @author 东昊
 * @filename ListImage.tsx
 * @date 2024-09-05 Thursday
 * @description 瀑布流图片 (使用 useNsfwContentLogic v3)
 */
import SVGOn from '@/assets/icons/svg/icon_show_questionable_on.svg'
import { SVGWrapper } from '@/components/common/SVGWrapper'
// import { useNsfwContentLogic } from '@/hooks/nwfs/useNsfwContentLogic'
import { Green, NSFW, NSFWRating } from '@/config/enum'
import { getRandomInteger } from '@/utils/helpers'
import { tw } from '@/utils/twcss/twrnc'
import * as Sentry from '@sentry/react-native'
import {
  Image as ExpoImage,
  ImageProps as ExpoImageProps,
  ImageSource,
} from 'expo-image'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { ImageStyle, StyleProp, Text, View, ViewStyle } from 'react-native'

const maxRetries = 2
/**
 * 瀑布流图片组件的属性类型定义
 * 继承自ExpoImage的属性，但排除了style属性
 */
export interface ListImageProps extends ExpoImageProps {
  // NSFW评级 (旧版逻辑 - 作为 fallback)
  rating?: NSFWRating
  // NSFW 等级 (新版逻辑，优先于 rating)
  nsfwLevel?: number
  // 是否强制显示原图
  forceShowOriginal?: boolean
  // 是否显示小眼睛
  enableShowEye?: boolean
  // 图片过渡动画时间（毫秒）
  transition?: number
  // 是否启用占位符背景色
  enablePlaceHolder?: boolean
  // 图片样式
  imageStyle?: StyleProp<ImageStyle>
  active?: boolean
  needControl?: boolean
  autoplay?: boolean
  /**
   * @deprecated 这个参数已被废弃，请使用 rating 或 nsfw_level
   */
  isGreen?: boolean
}

/**
 * 组件对外暴露的方法接口定义
 */
export interface SeaArtImageMethods {
  getExpoImage: () => ExpoImage | null
  // 开始动画
  startAnimating: () => void
  // 停止动画
  stopAnimating: () => void
}

/**
 * 瀑布流图片组件
 *
 * 使用 useNsfwContentLogic Hook 来决定显示内容和状态。
 * 支持随机占位符背景色和图片过渡动画。
 *
 * @param props 组件属性
 * @param ref 引用对象，用于暴露组件方法
 * @returns 渲染的图片组件
 */
export const SeaArtImage = memo(
  forwardRef<SeaArtImageMethods, ListImageProps>((props, ref) => {
    const {
      rating = NSFWRating.Safe,
      nsfwLevel,
      forceShowOriginal = false,
      enableShowEye = true,
      enablePlaceHolder = true,
      transition = 300,
      style,
      imageStyle,
      recyclingKey,
      ...restProps
    } = props

    // Get display logic from the hook
    // const { displaySource, displayEye } = useNsfwContentLogic({
    //   nsfwLevel,
    //   rating,
    //   originalSource: props.source as ImageSource | null,
    //   forceShowOriginal,
    // })

    // Determine if controls should be shown based on displayEye from hook
    // const shouldShowControls = useMemo(() => {
    //   // Show controls only when hook says displayEye is true,
    //   return displayEye && enableShowEye
    // }, [displayEye, enableShowEye])

    const imageRef = useRef<ExpoImage>(null)

    const { t } = useTranslation()

    // Expose component methods (remains the same)
    useImperativeHandle(
      ref,
      () => ({
        startAnimating: () => imageRef.current?.startAnimating(),
        stopAnimating: () => imageRef.current?.stopAnimating(),
        getExpoImage: () => imageRef.current,
      }),
      [imageRef],
    )

    // Placeholder color generation (remains the same)
    const placeholder = useRef(getRandomPlaceholder()).current
    // 添加计时器引用追踪重试操作
    const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // 将重试信息合并为一个对象，包含计数和时间戳
    const [retryInfo, setRetryInfo] = useState({ count: 0, timestamp: 0 })

    // 在displaySource变化时重置重试信息
    // useEffect(() => {
    //   setRetryInfo({ count: 0, timestamp: 0 })

    //   return () => {
    //     // 取消正在进行的重试操作
    //     if (retryTimerRef.current) {
    //       clearTimeout(retryTimerRef.current)
    //       retryTimerRef.current = null
    //     }
    //   }
    // }, [displaySource])

    // 使用useMemo计算最终的图片源
    // const finalSource = useMemo(() => {
    //   // 如果没有重试，直接使用displaySource
    //   if (retryInfo.count === 0) {
    //     return displaySource
    //   }

    //   // 如果正在重试，生成带重试参数的URL
    //   if (
    //     typeof displaySource === 'object' &&
    //     displaySource?.uri &&
    //     typeof displaySource.uri === 'string'
    //   ) {
    //     const separator = displaySource.uri.includes('?') ? '&' : '?'
    //     return {
    //       ...displaySource,
    //       uri: `${displaySource.uri}${separator}_retry=${retryInfo.count}`,
    //     }
    //   }

    //   if (displaySource && typeof displaySource === 'string') {
    //     const separator = (displaySource as string).includes('?') ? '&' : '?'
    //     const newSource = `${displaySource}${separator}_retry=${retryInfo.count}`
    //     console.log('newSource ', newSource)
    //     return newSource
    //   }

    //   return displaySource
    // }, [displaySource, retryInfo])

    // 修改后的错误处理回调
    // const handleLoadError = useCallback(() => {
    //   // Log an error message when image loading fails
    //   console.error('SeaArtImage: Failed to load image source:', displaySource)

    //   setRetryInfo((prev) => {
    //     const nextCount = prev.count + 1

    //     if (nextCount <= maxRetries) {
    //       // Log retry attempt
    //       console.log(
    //         `SeaArtImage: Retrying image load (${nextCount}/${maxRetries})...`,
    //       )

    //       // 清除之前可能存在的计时器
    //       if (retryTimerRef.current) {
    //         clearTimeout(retryTimerRef.current)
    //       }

    //       // 保存新的计时器引用
    //       retryTimerRef.current = setTimeout(() => {
    //         // 重试时只需要触发重新渲染，不需要修改时间戳
    //         setRetryInfo((current) => ({
    //           count: current.count,
    //           timestamp: current.timestamp, // 保持原有时间戳
    //         }))
    //         retryTimerRef.current = null
    //       }, 1000)

    //       // 立即返回新的计数
    //       return { count: nextCount, timestamp: prev.timestamp }
    //     } else {
    //       // Report to Sentry (only 20% of errors)
    //       if (Math.random() < 0.2) {
    //         Sentry.captureMessage('Image load failed', {
    //           level: 'error',
    //           tags: {
    //             component: 'SeaArtImage',
    //           },
    //           extra: {
    //             displaySource,
    //           },
    //         })
    //       }

    //       // Log that retries have been exhausted
    //       console.error(
    //         `SeaArtImage: Image load failed after ${maxRetries} retries.`,
    //       )

    //       return prev
    //     }
    //   })
    // }, [displaySource])

    // Memoize styles (remains the same)
    const viewStyle: StyleProp<ViewStyle> = useMemo(
      () => [
        {
          backgroundColor: enablePlaceHolder ? placeholder : 'transparent',
          overflow: 'hidden',
          position: 'relative',
        },
        style,
      ],
      [enablePlaceHolder, placeholder, style],
    ) as ViewStyle[]

    const expoImageStyle: StyleProp<ImageStyle> = useMemo(
      () => [{ width: '100%', height: '100%' }, imageStyle],
      [imageStyle],
    )

    return (
      <View style={viewStyle}>
        <ExpoImage
          ref={imageRef}
          cachePolicy={'disk'}
          contentFit={'cover'}
          contentPosition={'center'}
          transition={transition}
          {...restProps}
          // source={finalSource}
          recyclingKey={recyclingKey}
          style={expoImageStyle}
          // onError={handleLoadError}
        />

        {/* {shouldShowControls && (
          <View
            style={tw(
              'absolute bottom-0 left-0 right-0 top-0 z-10 flex-1 items-center justify-center',
            )}
            // 本期暂不支持点击查看原图
            // onPress={() => setShowOriginalImage(true)}
          >
            <View style={tw('flex-1 items-center justify-center')}>
              <SVGWrapper
                svg={SVGOn}
                svgWidth={20}
                svgHeight={20}
                color={'white'}
              />
              <Text style={tw('mt-[4px] text-[12px] text-[#fff]')}>
                {t('Check')}
              </Text>
            </View>
          </View>
        )} */}
      </View>
    )
  }),
  // Custom comparison function
  (prevProps, nextProps) => {
    const isSame =
      prevProps.rating === nextProps.rating &&
      prevProps.nsfwLevel === nextProps.nsfwLevel &&
      prevProps.source === nextProps.source &&
      prevProps.enablePlaceHolder === nextProps.enablePlaceHolder &&
      prevProps.transition === nextProps.transition &&
      prevProps.style === nextProps.style &&
      prevProps.imageStyle === nextProps.imageStyle &&
      prevProps.recyclingKey === nextProps.recyclingKey

    return isSame
  },
)

/**
 * NSFW评级计算规则：
 * 1. 当NSFW = 1 时，显示为粉图，不支持下载。
 * 2. 当NSFW != 1 时，且 nsfwPlus = true 时，图片显示模糊蒙版，支持下载。
 * 3. 当NSFW != 1 时，且 nsfwPlus = false 时，图片正常显示，支持下载。
 * @param nsfw
 * @param nsfwPlus
 */
export const getRating = (
  nsfw: WillNull<NSFW> = NSFW.Safe,
  nsfwPlus: WillNull<boolean> = false,
): NSFWRating => {
  if (nsfw === NSFW.Explicit) {
    return NSFWRating.Explicit
  }

  if (nsfwPlus) {
    return NSFWRating.Questionable
  }

  return NSFWRating.Safe
}

/**
 * 获取是否为绿色图片
 *
 * @param green 绿色枚举值，默认为Default
 * @returns 布尔值，表示是否为绿色图片
 */
export const getGreen = (green: WillNull<Green> = Green.Default): boolean => {
  return green !== Green.NotGreen
}

/**
 * 占位符颜色列表
 * 提供多种深色系背景色作为图片加载时的占位符
 */
const ColorList: string[] = [
  '#595555',
  '#393130',
  '#45404E',
  '#434645',
  '#3E4346',
  '#4B4A42',
  '#474246',
  '#505059',
  '#444444',
  '#524E4B',
  '#36393D',
  '#362D24',
]

/**
 * 获取随机占位符颜色
 *
 * @returns 从颜色列表中随机选择的一个颜色代码
 */
const getRandomPlaceholder = () => {
  return ColorList[getRandomInteger(0, 11)]
}
