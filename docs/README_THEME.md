# 🎨 海艺主题系统配置指南

## 📋 概述

这是一个完整的 React Native 主题系统，支持亮色/暗色主题切换，并与现有的 `twrnc` 样式系统集成。

## 🏗️ 系统架构

```
src/theme/
├── tokens/
│   └── colors.ts              # 颜色设计Token
├── themes/
│   ├── light.ts              # 亮色主题
│   └── dark.ts               # 暗色主题
├── ThemeProvider.tsx         # 主题提供者组件
└── index.ts                  # 统一导出
```

## 🚀 快速开始

### 1. 基础设置

主题系统已经在 `AppRoot.tsx` 中集成：

```tsx
import { ThemeProvider } from '@/theme'

const AppRoot = () => (
  <ThemeProvider>
    {/* 你的应用内容 */}
  </ThemeProvider>
)
```

### 2. 使用主题Hook

```tsx
import { useTheme, useColors, useIsDark } from '@/theme'

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme()
  const colors = useColors()
  const isDark = useIsDark()
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text.primary }}>
        当前是 {isDark ? '暗色' : '亮色'} 模式
      </Text>
      <Button title="切换主题" onPress={toggleTheme} />
    </View>
  )
}
```

### 3. 使用预设样式

```tsx
import { createThemedStyles } from '@/theme'

const MyComponent = () => {
  const { theme } = useTheme()
  const themedStyles = createThemedStyles(theme)
  
  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.card}>
        <Text style={themedStyles.text.title}>卡片标题</Text>
        <Text style={themedStyles.text.secondary}>卡片内容</Text>
      </View>
    </View>
  )
}
```

### 4. 与 twrnc 集成使用

现在可以在 tw 中直接使用主题色：

```tsx
import { tw } from '@/utils/twcss/twrnc'

const MyComponent = () => (
  <View style={tw('bg-theme-background')}>
    <Text style={tw('text-theme-text-primary')}>主题文本</Text>
    <Button style={tw('bg-theme-primary')} />
  </View>
)
```

## 🎨 颜色系统

### 品牌色系
- **海艺蓝色系**: `seaBlue[50-900]` - 主要品牌色
- **海艺绿色系**: `seaGreen[50-900]` - 成功/确认色
- **海艺橙色系**: `seaOrange[50-900]` - 警告色
- **海艺红色系**: `seaRed[50-900]` - 错误/危险色

### 功能色
- **成功**: `colors.success`
- **警告**: `colors.warning`
- **错误**: `colors.error`
- **信息**: `colors.info`

### 语义化颜色
- **主色**: `colors.primary`
- **辅助色**: `colors.secondary`
- **背景色**: `colors.background`
- **表面色**: `colors.surface`
- **文本色**: `colors.text.primary/secondary/tertiary`

## 🔧 高级配置

### 1. 自定义主题

创建新的主题文件：

```tsx
// src/theme/themes/custom.ts
import { Theme } from './light'

export const customTheme: Theme = {
  isDark: false,
  colors: {
    // 自定义颜色配置
    primary: '#FF6B6B',
    // ... 其他配置
  }
}
```

### 2. 扩展颜色Token

```tsx
// src/theme/tokens/colors.ts
export const customColors = {
  brand: {
    coral: '#FF6B6B',
    mint: '#4ECDC4',
    // ... 更多自定义色
  }
}
```

### 3. 主题切换模式

支持三种主题模式：
- `'light'`: 强制亮色模式
- `'dark'`: 强制暗色模式  
- `'system'`: 跟随系统设置（默认）

```tsx
const { setThemeMode } = useTheme()

// 设置特定模式
setThemeMode('dark')

// 跟随系统
setThemeMode('system')
```

## 📱 响应式设计

主题系统与现有的 `dp` 缩放函数兼容：

```tsx
import { dp } from '@/utils/twcss/twrnc'

const styles = StyleSheet.create({
  container: {
    padding: dp(16),
    backgroundColor: colors.background,
  }
})
```

## 🎯 最佳实践

### 1. 优先使用语义化颜色
```tsx
// ✅ 好的做法
<Text style={{ color: colors.text.primary }} />

// ❌ 避免直接使用具体颜色
<Text style={{ color: '#000000' }} />
```

### 2. 使用预设样式函数
```tsx
// ✅ 推荐
const themedStyles = createThemedStyles(theme)
<View style={themedStyles.card} />

// ❌ 手动创建
<View style={{ backgroundColor: colors.surface, padding: 16 }} />
```

### 3. 条件样式处理
```tsx
const MyComponent = () => {
  const { isDark } = useTheme()
  
  return (
    <View style={[
      styles.container,
      isDark && styles.darkContainer
    ]} />
  )
}
```

## 🧪 测试和演示

运行应用并导航到 "消息中心" 查看完整的主题演示，包括：

- 主题切换开关
- 颜色展示面板
- 文本样式演示
- 按钮样式演示
- 卡片组件演示

## 🔄 状态持久化

主题设置会自动保存到本地存储（MMKV），应用重启后会恢复用户的主题选择。

## 📦 导出API

```tsx
// 从 @/theme 可以导入
export {
  ThemeProvider,        // 主题提供者
  useTheme,            // 主题Hook
  useColors,           // 颜色Hook
  useIsDark,           // 暗色模式检测Hook
  lightTheme,          // 亮色主题
  darkTheme,           // 暗色主题
  createThemedStyles,  // 样式创建函数
  brandColors,         // 品牌色
  neutralColors,       // 中性色
  functionalColors,    // 功能色
  alpha,              // 透明度工具
  type Theme,         // 主题类型
  type ThemeColors,   // 颜色类型
  type ThemeMode,     // 主题模式类型
}
```

---

## 🎉 结语

这个主题系统为海艺应用提供了完整的设计系统基础，支持：

- 🌓 自动暗色模式切换
- 🎨 完整的品牌色系
- 📱 响应式设计支持
- 💾 设置持久化
- 🔧 高度可定制化
- 🚀 与现有系统无缝集成

让你的应用界面更加现代化和用户友好！ 