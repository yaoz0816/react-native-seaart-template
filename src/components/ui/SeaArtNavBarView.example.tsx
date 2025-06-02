/**
 * @author Assistant
 * @filename SeaArtNavBarView.example.tsx
 * @date 2024-12-29
 * @description SeaArtNavBarView 组件使用示例
 */
import { tw } from '@/utils/twcss/twrnc'
import { memo } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import SeaArtNavBarView from './SeaArtNavBarView'
import { goBack } from '@/navigation/configs/utils'
import { useColors } from '@/theme'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'

// 示例按钮组件
const NavButton = memo(
  ({
    title,
    onPress,
    color = '#007AFF',
  }: {
    title: string
    onPress: () => void
    color?: string
  }) => (
    <TouchableOpacity
      style={tw('px-3 py-1 rounded-md')}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={[tw('text-14 font-medium'), { color }]}>{title}</Text>
    </TouchableOpacity>
  ),
)

// 示例图标按钮
export const IconButton = memo(
  ({
    icon,
    onPress,
    color = '#007AFF',
  }: {
    icon: string
    onPress: () => void
    color?: string
  }) => (
    <TouchableOpacity
      style={tw('w-20 h-full items-center justify-center rounded-full')}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={[tw('text-18 font-bold'), { color }]}>{icon}</Text>
    </TouchableOpacity>
  ),
)

const SeaArtNavBarViewExample = () => {
  const handleBackPress = () => {
    // Alert.alert('提示', '返回按钮被点击')
    goBack()
  }

  const handleMenuPress = () => {
    Alert.alert('提示', '菜单按钮被点击')
  }

  const handleSearchPress = () => {
    Alert.alert('提示', '搜索按钮被点击')
  }

  const handleMorePress = () => {
    Alert.alert('提示', '更多按钮被点击')
  }

  const colors = useColors()

  const TitleGroup = ({ title }: { title: string }) => {
    return (
      <Text
        style={tw(
          `text-16 font-medium px-4 mb-2 text-[${colors.text.primary}]`,
        )}>
        {title}
      </Text>
    )
  }

  return (
    <SeaArtBasePage style={tw('flex-1')}>
      <ScrollView>
        <View style={tw('pb-20')}>
          <SeaArtNavBarView
            title={'导航栏 使用示例'}
            backgroundColor={colors.background}
            titleStyle={tw(`text-[${colors.text.primary}]`)}
            leftView={
              <IconButton
                icon={'←'}
                color={colors.text.primary}
                onPress={handleBackPress}
              />
            }
          />

          {/* 示例1: 基本导航栏 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'1. 基本导航栏'} />
            <SeaArtNavBarView title={'基本标题'} backgroundColor={'#007AFF'} />
          </View>

          {/* 示例2: 带返回按钮的导航栏 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'2. 带返回按钮'} />
            <SeaArtNavBarView
              title={'详情页面'}
              backgroundColor={'#34C759'}
              leftView={
                <IconButton
                  icon={'←'}
                  color={'#FFF'}
                  onPress={handleBackPress}
                />
              }
            />
          </View>

          {/* 示例3: 带左右按钮的导航栏 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'3. 完整导航栏'} />
            <SeaArtNavBarView
              title={'主页面'}
              backgroundColor={'#FF9500'}
              leftView={
                <NavButton
                  title={'取消'}
                  color={'#FFF'}
                  onPress={handleBackPress}
                />
              }
              rightView={
                <NavButton
                  title={'保存'}
                  color={'#FFF'}
                  onPress={handleMenuPress}
                />
              }
            />
          </View>

          {/* 示例4: 多个右侧按钮 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'4. 多个操作按钮'} />
            <SeaArtNavBarView
              title={'编辑页面'}
              backgroundColor={'#FF3B30'}
              leftView={
                <IconButton
                  icon={'←'}
                  color={'#FFF'}
                  onPress={handleBackPress}
                />
              }
              rightView={
                <View style={tw('flex-row items-center gap-5')}>
                  <IconButton
                    icon={'🔍'}
                    color={'#FFF'}
                    onPress={handleSearchPress}
                  />
                  <IconButton
                    icon={'⋯'}
                    color={'#FFF'}
                    onPress={handleMorePress}
                  />
                </View>
              }
            />
          </View>

          {/* 示例5: 自定义标题视图 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={' 5. 自定义标题视图'} />
            <SeaArtNavBarView
              backgroundColor={'#5856D6'}
              leftView={
                <IconButton
                  icon={'←'}
                  color={'#FFF'}
                  onPress={handleBackPress}
                />
              }
              titleView={
                <View style={tw('items-center')}>
                  <Text style={tw('text-16 font-bold text-white')}>
                    自定义标题
                  </Text>
                  <Text style={tw('text-12 text-white opacity-80')}>
                    副标题信息
                  </Text>
                </View>
              }
              rightView={
                <IconButton
                  icon={'⚙️'}
                  color={'#FFF'}
                  onPress={handleMenuPress}
                />
              }
            />
          </View>

          {/* 示例6: 透明背景 */}
          {/* <View style={tw('mb-6 bg-blue-500 p-4 rounded-lg mx-4')}>
          <Text style={tw('text-16 font-medium mb-2 text-white')}>
            6. 透明背景导航栏
          </Text>
          <SeaArtNavBarView
            title={'透明导航栏'}
            backgroundColor={'transparent'}
            titleStyle={tw('text-white')}
            leftView={
              <IconButton icon={'←'} color={'#FFF'} onPress={handleBackPress} />
            }
            rightView={
              <IconButton
                icon={'⭐'}
                color={'#FFF'}
                onPress={handleMenuPress}
              />
            }
          />
        </View> */}

          {/* 示例6: 渐变背景效果 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'6. 深色主题'} />
            <SeaArtNavBarView
              title={'深色导航栏'}
              backgroundColor={'#1C1C1E'}
              titleStyle={tw('text-white')}
              leftView={
                <NavButton
                  title={'返回'}
                  color={'#007AFF'}
                  onPress={handleBackPress}
                />
              }
              rightView={
                <NavButton
                  title={'完成'}
                  color={'#007AFF'}
                  onPress={handleMenuPress}
                />
              }
            />
          </View>

          {/* 示例7: 自定义高度和样式 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'7. 自定义样式'} />
            <SeaArtNavBarView
              title={'自定义样式'}
              backgroundColor={'#FF2D92'}
              style={tw('border-b-2 border-white/20')}
              titleStyle={tw('text-white font-bold text-18')}
              leftView={
                <IconButton
                  icon={'←'}
                  color={'#FFF'}
                  onPress={handleBackPress}
                />
              }
              rightView={
                <View style={tw('bg-white/20 px-3 py-1 rounded-full')}>
                  <Text style={tw('text-white text-12 font-medium')}>PRO</Text>
                </View>
              }
            />
          </View>

          {/* 示例8: 长标题处理 */}
          <View style={tw('mb-6')}>
            <TitleGroup title={'8. 长标题省略'} />
            <SeaArtNavBarView
              title={'这是一个非常非常长的标题，用于测试省略号的显示效果'}
              backgroundColor={'#AF52DE'}
              leftView={
                <IconButton
                  icon={'←'}
                  color={'#FFF'}
                  onPress={handleBackPress}
                />
              }
              rightView={
                <IconButton
                  icon={'ℹ️'}
                  color={'#FFF'}
                  onPress={handleMorePress}
                />
              }
            />
          </View>

          {/* 使用提示 */}
          <View
            style={tw(
              'mx-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200',
            )}>
            <Text style={tw('text-14 font-medium text-yellow-800 mb-2')}>
              💡 使用提示：
            </Text>
            <Text style={tw('text-13 text-yellow-700')}>
              • 导航栏高度在 iOS 和 Android 上会自动适配{'\n'}•
              左右视图会自动添加合适的内边距{'\n'}• 标题过长时会自动省略{'\n'}•
              支持自定义背景色和样式{'\n'}• 可以传入自定义的标题视图组件
            </Text>
          </View>
        </View>
      </ScrollView>
    </SeaArtBasePage>
  )
}

export default memo(SeaArtNavBarViewExample)
