/**
 * @filename MineScreen.tsx
 * @description 我的页面 - 按钮测试功能集合
 */

import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  Switch,
  StyleSheet,
} from 'react-native'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import { push } from '@/navigation'
import { useTheme } from '@/theme'

// 按钮测试项的数据类型
interface ButtonTestItem {
  id: string
  title: string
  subtitle?: string
  type: 'button' | 'switch' | 'counter' | 'navigation' | 'alert'
  icon?: string
  color?: string
  action?: () => void
}

const MineScreen: React.FC = () => {
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({
    notification: true,
    darkMode: false,
    autoPlay: true,
  })

  const [counter, setCounter] = useState(0)

  const { toggleTheme } = useTheme()

  // 处理开关切换
  const handleSwitchToggle = useCallback((id: string) => {
    setSwitchStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }, [])

  // 创建测试按钮数据
  const buttonTestData: ButtonTestItem[] = [
    {
      id: 'basic-button',
      title: '按钮使用示例',
      subtitle: '简单的点击按钮测试',
      type: 'button',
      icon: '🔘',
      color: '#007AFF',
      action: () => push('ButtonExamplesDemo'),
    },
    {
      id: 'danger-button',
      title: '导航栏使用示例',
      subtitle: '红色警告风格按钮',
      type: 'button',
      icon: '⚠️',
      color: '#FF3B30',
      action: () => push('NavBarExamplesDemo'),
    },
    {
      id: 'success-button',
      title: 'Toast使用示例',
      subtitle: '绿色成功风格按钮',
      type: 'button',
      icon: '✅',
      color: '#34C759',
      action: () => push('ToastExamplesDemo'),
    },
    {
      id: 'info-button',
      title: '导航使用示例',
      subtitle: '蓝色信息提示按钮',
      type: 'button',
      icon: 'ℹ️',
      color: '#5AC8FA',
      action: () => push('NavigatorExamplesDemo'),
    },

    {
      id: 'autoplay-switch',
      title: 'Zustand使用示例',
      subtitle: '视频自动播放设置',
      type: 'button',
      icon: '▶️',
      action: () => push('TodoListDemo'),
    },
    {
      id: 'navigation-test',
      title: 'PagerView使用示例',
      subtitle: '测试页面跳转功能',
      type: 'navigation',
      icon: '🧭',
      color: '#5856D6',
      action: () => push('PagerViewDemo'),
    },
    {
      id: 'notification-switch',
      title: '推送通知',
      subtitle: '开启或关闭推送通知',
      type: 'switch',
      icon: '🔔',
      // action: toggleTheme,
    },
    {
      id: 'darkmode-switch',
      title: '深色模式',
      subtitle: '切换应用主题',
      type: 'navigation',
      icon: '🌙',
      action: () => push('ThemeExamplesDemo'),
    },
    // {
    //   id: 'counter-test',
    //   title: '计数器测试',
    //   subtitle: `当前计数: ${counter}`,
    //   type: 'counter',
    //   icon: '🔢',
    //   color: '#FF9500',
    // },

    {
      id: 'share-test',
      title: '分享功能',
      subtitle: '测试分享相关功能',
      type: 'button',
      icon: '📤',
      color: '#00C7BE',
      action: () => Alert.alert('分享', '分享功能测试'),
    },
    {
      id: 'camera-test',
      title: '相机功能',
      subtitle: '拍照和相册选择',
      type: 'button',
      icon: '📷',
      color: '#FF2D92',
      action: () => Alert.alert('相机', '相机功能测试'),
    },
    {
      id: 'location-test',
      title: '定位功能',
      subtitle: '获取当前位置信息',
      type: 'button',
      icon: '📍',
      color: '#FF3B30',
      action: () => Alert.alert('定位', '定位功能测试'),
    },
    {
      id: 'download-test',
      title: '下载功能',
      subtitle: '文件下载进度测试',
      type: 'button',
      icon: '⬇️',
      color: '#30D158',
      action: () => Alert.alert('下载', '文件下载功能测试'),
    },
    {
      id: 'settings-test',
      title: '设置选项',
      subtitle: '应用设置相关功能',
      type: 'button',
      icon: '⚙️',
      color: '#8E8E93',
      action: () => Alert.alert('设置', '打开设置页面'),
    },
  ]

  // 渲染单个测试项
  const renderTestItem = useCallback(
    ({ item }: { item: ButtonTestItem }) => {
      const handleItemPress = () => {
        switch (item.type) {
          case 'counter':
            setCounter((prev) => prev + 1)
            break
          case 'switch':
            handleSwitchToggle(item.id.split('-')[0])
            break
          default:
            item.action?.()
        }
      }

      const renderRightContent = () => {
        switch (item.type) {
          case 'switch':
            const switchKey = item.id.split('-')[0]
            return (
              <Switch
                value={switchStates[switchKey] || false}
                trackColor={{ false: '#767577', true: item.color || '#34C759' }}
                thumbColor={switchStates[switchKey] ? '#fff' : '#f4f3f4'}
                onValueChange={() => handleSwitchToggle(switchKey)}
              />
            )
          case 'counter':
            return (
              <View style={styles.counterContainer}>
                <Pressable
                  style={[styles.counterButton, { backgroundColor: '#FF3B30' }]}
                  onPress={() => setCounter((prev) => Math.max(0, prev - 1))}>
                  <Text style={styles.counterButtonText}>-</Text>
                </Pressable>
                <Text style={styles.counterText}>{counter}</Text>
                <Pressable
                  style={[styles.counterButton, { backgroundColor: '#34C759' }]}
                  onPress={() => setCounter((prev) => prev + 1)}>
                  <Text style={styles.counterButtonText}>+</Text>
                </Pressable>
              </View>
            )
          default:
            return (
              <Text
                style={[styles.arrowText, { color: item.color || '#007AFF' }]}>
                →
              </Text>
            )
        }
      }

      return (
        <Pressable
          style={({ pressed }) => [
            styles.testItem,
            pressed && styles.testItemPressed,
          ]}
          onPress={handleItemPress}>
          <View style={styles.testItemLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color + '20' || '#007AFF20' },
              ]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.subtitleText}>
                  {item.type === 'counter'
                    ? `当前计数: ${counter}`
                    : item.subtitle}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.testItemRight}>{renderRightContent()}</View>
        </Pressable>
      )
    },
    [switchStates, counter, handleSwitchToggle],
  )

  return (
    <SeaArtBasePage>
      {/* <View style={styles.container}> */}
      <FlatList
        data={buttonTestData}
        renderItem={renderTestItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {/* </View> */}
    </SeaArtBasePage>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  testItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testItemPressed: {
    backgroundColor: '#f0f0f0',
    transform: [{ scale: 0.98 }],
  },
  testItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  testItemRight: {
    marginLeft: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 12,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
})

export default MineScreen
