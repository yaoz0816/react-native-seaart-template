/**
 * @author 曼巴
 * @filename NavigatorExamplesDemo.tsx
 * @description 导航使用示例 - 展示各种导航用法
 */

import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RootNavigationProp } from '@/navigation/types'
import {
  goBack,
  navigate,
  navigateToTab,
  replace,
  reset,
} from '@/navigation/configs/utils'
import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import { IconButton } from '@/components/ui/SeaArtNavBarView.example'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import { useColors } from '@/theme'
import { tw } from '@/utils/twcss/twrnc'

interface NavigationDemoProps {
  title: string
  description: string
  onPress: () => void
  buttonColor?: string
}

const NavigationButton: React.FC<NavigationDemoProps> = ({
  title,
  description,
  onPress,
  buttonColor = '#007AFF',
}) => (
  <Pressable
    style={[styles.demoButton, { borderColor: buttonColor }]}
    onPress={onPress}>
    <View style={styles.buttonContent}>
      <Text style={[styles.buttonTitle, { color: buttonColor }]}>{title}</Text>
      <Text style={styles.buttonDescription}>{description}</Text>
    </View>
  </Pressable>
)

const NavigatorExamplesDemo: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>()
  const [inputValue, setInputValue] = useState('')
  const [focusCount, setFocusCount] = useState(0)

  // 监听页面焦点变化
  useFocusEffect(
    React.useCallback(() => {
      setFocusCount((prev) => prev + 1)
      console.log('📱 NavigatorExamplesDemo 获得焦点')

      return () => {
        console.log('📱 NavigatorExamplesDemo 失去焦点')
      }
    }, []),
  )

  // 基础导航示例
  const handleBasicNavigation = () => {
    navigation.navigate('ToastExamplesDemo')
  }

  // 带参数导航
  const handleNavigationWithParams = () => {
    if (!inputValue.trim()) {
      Alert.alert('提示', '请输入要传递的参数')
      return
    }

    // 跳转到专门的详情页面并传递参数
    navigate('NavigationDetailDemo', {
      title: '来自导航示例页面',
      message: inputValue,
      userId: 'user_123',
      data: {
        source: 'NavigatorExamplesDemo',
        timestamp: Date.now(),
        extraInfo: '这是额外的数据',
      },
      timestamp: Date.now(),
      callback: (value: string) => {
        console.log('callback')
        setInputValue(value)
      },
    })
  }

  // 返回上一页
  const handleGoBack = () => {
    goBack()
  }

  // 重置导航栈
  const handleResetStack = () => {
    reset('MainTabs')
  }

  // 替换当前页面
  const handleReplaceScreen = () => {
    replace('ToastExamplesDemo')
  }

  // 检查导航状态
  const handleCheckNavigationState = () => {
    const state = navigation.getState()
    const canGoBack = navigation.canGoBack()

    Alert.alert(
      '导航状态',
      `当前路由: ${state.routes[state.index]?.name}\n` +
        `路由索引: ${state.index}\n` +
        `栈深度: ${state.routes.length}\n` +
        `可以返回: ${canGoBack ? '是' : '否'}\n` +
        `页面焦点次数: ${focusCount}`,
      [{ text: '确定' }],
    )
  }

  const colors = useColors()
  return (
    <SeaArtBasePage>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SeaArtNavBarView
          title={'导航 使用示例'}
          backgroundColor={colors.background}
          titleStyle={tw(`text-[${colors.text.primary}]`)}
          leftView={
            <IconButton
              icon={'←'}
              color={colors.text.primary}
              onPress={goBack}
            />
          }
        />
        <View style={styles.header}>
          <Text style={styles.title}>🧭 导航使用示例</Text>
          <Text style={styles.subtitle}>
            展示React Navigation的各种用法和最佳实践
          </Text>
          <Text style={styles.focusCounter}>页面焦点次数: {focusCount}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 基础导航</Text>

          <NavigationButton
            title={'基础跳转'}
            description={'跳转到Toast示例页面'}
            onPress={handleBasicNavigation}
          />

          <NavigationButton
            title={'返回上一页'}
            description={'调用goBack()'}
            buttonColor={'#FF6B6B'}
            onPress={handleGoBack}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 参数传递</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>输入要传递的参数:</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              placeholder={'请输入参数内容...'}
              multiline={false}
              onChangeText={setInputValue}
            />
          </View>

          <NavigationButton
            title={'带参数跳转'}
            description={'跳转并传递上面输入的参数'}
            buttonColor={'#4ECDC4'}
            onPress={handleNavigationWithParams}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 高级导航</Text>

          <NavigationButton
            title={'TodoList Demo'}
            description={'Zustand状态管理最佳实践示例'}
            buttonColor={'#8B5CF6'}
            onPress={() => navigate('TodoListDemo')}
          />

          <NavigationButton
            title={'替换当前页面'}
            description={'使用replace替换当前页面'}
            buttonColor={'#FFB74D'}
            onPress={handleReplaceScreen}
          />

          <NavigationButton
            title={'重置导航栈'}
            description={'清除历史记录并跳转到主页'}
            buttonColor={'#F06292'}
            onPress={handleResetStack}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 调试工具</Text>

          <NavigationButton
            title={'检查导航状态'}
            description={'查看当前导航栈信息'}
            buttonColor={'#90A4AE'}
            onPress={handleCheckNavigationState}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 提示: 使用这些示例可以学习各种导航模式和最佳实践
          </Text>
        </View>
      </ScrollView>
    </SeaArtBasePage>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  focusCounter: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 16,
  },
  demoButton: {
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  buttonContent: {
    padding: 16,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#495057',
  },
  footer: {
    padding: 20,
    marginTop: 12,
    backgroundColor: '#e3f2fd',
  },
  footerText: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
    lineHeight: 20,
  },
})

export default NavigatorExamplesDemo
