/**
 * @author 曼巴
 * @filename ThemeExamplesDemo.tsx
 * @description 主题演示页面
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
import { useTheme, useColors, createThemedStyles } from '@/theme'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import { tw } from '@/utils/twcss/twrnc'

// 演示项目数据类型
interface DemoItem {
  id: string
  title: string
  subtitle?: string
  type: 'theme-toggle' | 'button' | 'card' | 'input' | 'text' | 'colors'
  icon?: string
  action?: () => void
}

const ThemeExamplesDemo: React.FC = () => {
  const { theme, isDark, themeMode, setThemeMode, toggleTheme } = useTheme()
  const colors = useColors()
  const themedStyles = createThemedStyles(theme)

  const [counter, setCounter] = useState(0)

  // 主题切换处理
  const handleThemeToggle = useCallback(() => {
    toggleTheme()
    Alert.alert('主题切换', `已切换到${isDark ? '亮色' : '暗色'}模式`, [
      { text: '确定' },
    ])
  }, [isDark, toggleTheme])

  // 创建演示数据
  const demoData: DemoItem[] = [
    {
      id: 'theme-toggle',
      title: '主题切换',
      subtitle: `当前: ${isDark ? '暗色模式' : '亮色模式'} (${themeMode})`,
      type: 'theme-toggle',
      icon: isDark ? '🌙' : '☀️',
      action: handleThemeToggle,
    },
    {
      id: 'primary-colors',
      title: '主色系展示',
      subtitle: '品牌主色和辅助色',
      type: 'colors',
      icon: '🎨',
    },
    {
      id: 'functional-colors',
      title: '功能色展示',
      subtitle: '成功、警告、错误、信息色',
      type: 'colors',
      icon: '🚥',
    },
    {
      id: 'text-demo',
      title: '文本样式演示',
      subtitle: '不同层级的文本颜色',
      type: 'text',
      icon: '📝',
    },
    {
      id: 'button-demo',
      title: '按钮样式演示',
      subtitle: '主要和次要按钮',
      type: 'button',
      icon: '🔘',
    },
    {
      id: 'card-demo',
      title: '卡片样式演示',
      subtitle: '带阴影的卡片组件',
      type: 'card',
      icon: '🃏',
    },
    {
      id: 'counter-demo',
      title: '计数器演示',
      subtitle: `当前计数: ${counter}`,
      type: 'button',
      icon: '🔢',
      action: () => setCounter((prev) => prev + 1),
    },
  ]

  // 渲染颜色展示
  const renderColorPalette = (item: DemoItem) => {
    const colorSets =
      item.id === 'primary-colors'
        ? [
            { name: '主色', color: colors.primary },
            { name: '主色浅', color: colors.primaryLight },
            { name: '主色深', color: colors.primaryDark },
            { name: '辅助色', color: colors.secondary },
          ]
        : [
            { name: '成功', color: colors.success },
            { name: '警告', color: colors.warning },
            { name: '错误', color: colors.error },
            { name: '信息', color: colors.info },
          ]

    return (
      <View style={styles.colorContainer}>
        {colorSets.map((colorSet, index) => (
          <View key={index} style={styles.colorItem}>
            <View
              style={[styles.colorBox, { backgroundColor: colorSet.color }]}
            />
            <Text style={[themedStyles.text.secondary, styles.colorName]}>
              {colorSet.name}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  // 渲染文本演示
  const renderTextDemo = () => (
    <View style={styles.textContainer}>
      <Text style={themedStyles.text.title}>标题文本</Text>
      <Text style={themedStyles.text.primary}>主要文本</Text>
      <Text style={themedStyles.text.secondary}>次要文本</Text>
      <Text
        style={[themedStyles.text.secondary, { color: colors.text.tertiary }]}>
        三级文本
      </Text>
    </View>
  )

  // 渲染按钮演示
  const renderButtonDemo = () => (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[themedStyles.button.primary, styles.demoButton]}
        onPress={() => Alert.alert('主要按钮', '这是一个主要按钮')}>
        <Text style={[themedStyles.text.primary, { color: colors.onPrimary }]}>
          主要按钮
        </Text>
      </Pressable>
      <Pressable
        style={[themedStyles.button.secondary, styles.demoButton]}
        onPress={() => Alert.alert('次要按钮', '这是一个次要按钮')}>
        <Text
          style={[themedStyles.text.primary, { color: colors.onSecondary }]}>
          次要按钮
        </Text>
      </Pressable>
    </View>
  )

  // 渲染卡片演示
  const renderCardDemo = () => (
    <View style={[themedStyles.card, styles.demoCard]}>
      <Text style={themedStyles.text.title}>卡片标题</Text>
      <Text style={themedStyles.text.secondary}>
        这是一个使用主题色系的卡片组件，会根据当前主题自动调整颜色和阴影。
      </Text>
    </View>
  )

  // 渲染单个演示项
  const renderDemoItem = ({ item }: { item: DemoItem }) => {
    return (
      <Pressable
        style={[
          themedStyles.card,
          styles.demoItem,
          { borderColor: colors.outline },
        ]}
        onPress={item.action}>
        <View style={styles.demoItemHeader}>
          <View style={styles.demoItemLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.primaryContainer },
              ]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={themedStyles.text.title}>{item.title}</Text>
              {item.subtitle && (
                <Text style={themedStyles.text.secondary}>{item.subtitle}</Text>
              )}
            </View>
          </View>
          {item.type === 'theme-toggle' && (
            <Switch
              value={isDark}
              trackColor={{ false: colors.outline, true: colors.primary }}
              thumbColor={isDark ? colors.onPrimary : colors.surface}
              onValueChange={handleThemeToggle}
            />
          )}
        </View>

        {/* 渲染特殊内容 */}
        {item.type === 'colors' && renderColorPalette(item)}
        {item.type === 'text' && renderTextDemo()}
        {item.type === 'button' && renderButtonDemo()}
        {item.type === 'card' && renderCardDemo()}
      </Pressable>
    )
  }

  return (
    <SeaArtBasePage style={{ backgroundColor: colors.background }}>
      <SeaArtNavBarView
        title={'🎨 主题演示'}
        backgroundColor={colors.navigation.background}
        titleStyle={tw(`text-[${colors.text.primary}]`)}
      />

      <FlatList
        data={demoData}
        renderItem={renderDemoItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SeaArtBasePage>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  demoItem: {
    marginBottom: 8,
    borderWidth: 1,
  },
  demoItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  demoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  colorItem: {
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 4,
  },
  colorName: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  demoButton: {
    flex: 1,
  },
  demoCard: {
    marginTop: 8,
  },
  separator: {
    height: 8,
  },
})

export default ThemeExamplesDemo
