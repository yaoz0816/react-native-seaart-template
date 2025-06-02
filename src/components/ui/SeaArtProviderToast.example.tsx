/**
 * @author 曼巴
 * @filename SeaArtProviderToast.example.tsx
 * @date 2025-05-31 星期六
 * @description SeaArtProviderToast 组件使用示例 - 简洁清新版
 */
import { tw } from '@/utils/twcss/twrnc'
import { memo, useState, useCallback } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Toast } from '@/utils/toast'
import { goBack } from '@/navigation/configs/utils'
import SeaArtNavBarView from './SeaArtNavBarView'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import { IconButton } from '@/components/ui/SeaArtNavBarView.example'
import { useColors } from '@/theme'

// 简洁的示例按钮组件
const ActionButton = memo(
  ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
  }: {
    title: string
    onPress: () => void
    variant?: 'primary' | 'secondary' | 'danger' | 'success'
    disabled?: boolean
  }) => {
    const getVariantStyle = () => {
      if (disabled) {
        return 'bg-gray-100 border-gray-200'
      }

      switch (variant) {
        case 'primary':
          return 'bg-blue-500 border-blue-500'
        case 'secondary':
          return 'bg-gray-50 border-gray-200'
        case 'danger':
          return 'bg-red-500 border-red-500'
        case 'success':
          return 'bg-green-500 border-green-500'
        default:
          return 'bg-blue-500 border-blue-500'
      }
    }

    const getTextStyle = () => {
      if (disabled) {
        return 'text-gray-400'
      }

      switch (variant) {
        case 'primary':
        case 'danger':
        case 'success':
          return 'text-white'
        case 'secondary':
          return 'text-gray-700'
        default:
          return 'text-white'
      }
    }

    return (
      <TouchableOpacity
        disabled={disabled}
        style={tw(
          `px-4 py-3 rounded-xl border ${getVariantStyle()} ${disabled ? 'opacity-50' : ''}`,
        )}
        activeOpacity={0.8}
        onPress={onPress}>
        <Text style={tw(`text-15 font-medium text-center ${getTextStyle()}`)}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  },
)

// 返回按钮
const BackButton = memo(({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={tw('w-10 h-10 items-center justify-center')}
    activeOpacity={0.7}
    onPress={onPress}>
    <Text style={tw('text-white text-18')}>←</Text>
  </TouchableOpacity>
))

// 卡片容器
const Card = memo(
  ({
    children,
    className = '',
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <View
      style={tw(
        `bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 ${className}`,
      )}>
      {children}
    </View>
  ),
)

// 功能分组标题
const SectionTitle = memo(
  ({ icon, title }: { icon: string; title: string }) => (
    <View style={tw('flex-row items-center mb-4')}>
      <Text style={tw('text-20 mr-2')}>{icon}</Text>
      <Text style={tw('text-18 font-semibold text-gray-800')}>{title}</Text>
    </View>
  ),
)

// 按钮网格
const ButtonGrid = memo(({ children }: { children: React.ReactNode }) => (
  <View style={tw('flex-row flex-wrap -mx-1')}>{children}</View>
))

const ButtonGridItem = memo(({ children }: { children: React.ReactNode }) => (
  <View style={tw('w-1/2 px-1 mb-2')}>{children}</View>
))

const SeaArtProviderToastExample = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleBackPress = useCallback(() => {
    goBack()
  }, [])

  // 基础Toast示例
  const showNormalToast = useCallback(() => {
    Toast.show('这是一个普通的提示消息')
  }, [])

  const showLongMessage = useCallback(() => {
    Toast.show('这是一个比较长的提示消息，用来测试文本换行和显示效果', 2000)
  }, [])

  // 成功Toast示例
  const showSuccessToast = useCallback(() => {
    Toast.success('操作成功完成！')
  }, [])

  const showSuccessWithDuration = useCallback(() => {
    Toast.success('保存成功，3秒后消失', 3000)
  }, [])

  // 错误Toast示例
  const showErrorToast = useCallback(() => {
    Toast.error('操作失败，请重试')
  }, [])

  const showNetworkError = useCallback(() => {
    Toast.error('网络连接失败，请检查网络设置')
  }, [])

  // 加载Toast示例
  const showLoadingToast = useCallback(() => {
    setIsLoading(true)
    Toast.loading('正在处理中...')

    setTimeout(() => {
      Toast.success('处理完成！')
      setIsLoading(false)
    }, 3000)
  }, [])

  const showCustomLoading = useCallback(() => {
    Toast.loading('正在上传文件...')
    setTimeout(() => {
      Toast.hideAll()
    }, 2000)
  }, [])

  // 高级功能测试
  const testRapidClicks = useCallback(() => {
    Toast.show('第一个消息')
    setTimeout(() => Toast.success('第二个消息'), 100)
    setTimeout(() => Toast.error('第三个消息'), 200)
  }, [])

  const simulateFormSubmit = useCallback(() => {
    Toast.loading('正在提交表单...')
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3

      if (isSuccess) {
        Toast.success('提交成功！')
      } else {
        Toast.error('提交失败，请重试')
      }
    }, 2000)
  }, [])

  const hideAllToasts = useCallback(() => {
    Toast.hideAll()
  }, [])

  const colors = useColors()
  return (
    <SeaArtBasePage style={tw('flex-1 bg-gray-50')}>
      <SeaArtNavBarView
        title={'Toast 使用示例'}
        backgroundColor={colors.background}
        titleStyle={tw(`text-[${colors.text.primary}]`)}
        leftView={
          <IconButton icon={'←'} color={colors.text.primary} onPress={goBack} />
        }
      />

      <ScrollView
        style={tw('flex-1')}
        contentContainerStyle={tw('p-4 pb-20')}
        showsVerticalScrollIndicator={false}>
        {/* 基础功能 */}
        <Card>
          <SectionTitle icon={'💬'} title={'基础提示'} />
          <ButtonGrid>
            <ButtonGridItem>
              <ActionButton title={'普通提示'} onPress={showNormalToast} />
            </ButtonGridItem>
            <ButtonGridItem>
              <ActionButton
                title={'长文本提示'}
                variant={'secondary'}
                onPress={showLongMessage}
              />
            </ButtonGridItem>
          </ButtonGrid>
        </Card>

        {/* 状态反馈 */}
        <Card>
          <SectionTitle icon={'🎯'} title={'状态反馈'} />
          <ButtonGrid>
            <ButtonGridItem>
              <ActionButton
                title={'成功提示'}
                variant={'success'}
                onPress={showSuccessToast}
              />
            </ButtonGridItem>
            <ButtonGridItem>
              <ActionButton
                title={'自定义时长'}
                variant={'success'}
                onPress={showSuccessWithDuration}
              />
            </ButtonGridItem>
            <ButtonGridItem>
              <ActionButton
                title={'错误提示'}
                variant={'danger'}
                onPress={showErrorToast}
              />
            </ButtonGridItem>
            <ButtonGridItem>
              <ActionButton
                title={'网络错误'}
                variant={'danger'}
                onPress={showNetworkError}
              />
            </ButtonGridItem>
          </ButtonGrid>
        </Card>

        {/* 加载状态 */}
        <Card>
          <SectionTitle icon={'⏳'} title={'加载状态'} />
          <ButtonGrid>
            <ButtonGridItem>
              <ActionButton
                title={'模拟处理'}
                disabled={isLoading}
                onPress={showLoadingToast}
              />
            </ButtonGridItem>
            <ButtonGridItem>
              <ActionButton
                title={'自定义加载'}
                variant={'secondary'}
                onPress={showCustomLoading}
              />
            </ButtonGridItem>
          </ButtonGrid>
        </Card>

        {/* 高级功能 */}
        <Card>
          <SectionTitle icon={'⚡'} title={'高级功能'} />
          <ButtonGrid>
            <ButtonGridItem>
              <ActionButton title={'连续点击测试'} onPress={testRapidClicks} />
            </ButtonGridItem>
            <ButtonGridItem>
              <ActionButton title={'表单提交'} onPress={simulateFormSubmit} />
            </ButtonGridItem>
          </ButtonGrid>
          <View style={tw('mt-2')}>
            <ActionButton
              title={'隐藏所有 Toast'}
              variant={'secondary'}
              onPress={hideAllToasts}
            />
          </View>
        </Card>

        {/* 代码示例 */}
        <Card>
          <SectionTitle icon={'💻'} title={'代码示例'} />
          <View style={tw('bg-gray-900 rounded-xl p-4 pb-30')}>
            <Text style={tw('text-green-400 text-13')}>
              {`// 基础用法
Toast.show('普通提示')
Toast.success('成功提示')  
Toast.error('错误提示')
Toast.loading('加载中...')

// 自定义时长
Toast.success('成功', 3000)

// 隐藏Toast
Toast.hide()
Toast.hideAll()

// 异步操作示例
const handleSubmit = async () => {
  Toast.loading('提交中...')
  try {
    await submitData()
    Toast.success('提交成功！')
  } catch (error) {
    Toast.error('提交失败')
  }

}`}
            </Text>
          </View>
        </Card>

        {/* 特性说明 */}
        <Card>
          <SectionTitle icon={'✨'} title={'核心特性'} />
          <View style={tw('space-y-3')}>
            <FeatureItem
              title={'全局单例'}
              desc={'同时只显示一个Toast，新的会替换旧的'}
            />
            <FeatureItem
              title={'自动管理'}
              desc={'无需手动管理Toast生命周期'}
            />
            <FeatureItem
              title={'类型丰富'}
              desc={'支持普通、成功、错误、加载等类型'}
            />
            <FeatureItem title={'响应式设计'} desc={'自动适配不同屏幕尺寸'} />
          </View>
        </Card>

        {/* 使用提示 */}
        <Card className={'bg-blue-50 border-blue-200'}>
          <SectionTitle icon={'💡'} title={'使用提示'} />
          <Text style={tw('text-14 text-gray-600')}>
            • 需要在App根组件包装 SeaArtProviderToast{'\n'}•
            加载Toast需要手动调用 Toast.hide() 来隐藏{'\n'}•
            避免短时间内连续调用多个Toast{'\n'}• 确保在组件卸载前隐藏Loading状态
          </Text>
        </Card>
      </ScrollView>
    </SeaArtBasePage>
  )
}

// 特性条目组件
const FeatureItem = memo(({ title, desc }: { title: string; desc: string }) => (
  <View style={tw('flex-row')}>
    <View style={tw('w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3')} />
    <View style={tw('flex-1')}>
      <Text style={tw('text-15 font-medium text-gray-800 mb-1')}>{title}</Text>
      <Text style={tw('text-14 text-gray-600')}>{desc}</Text>
    </View>
  </View>
))

export default memo(SeaArtProviderToastExample)
