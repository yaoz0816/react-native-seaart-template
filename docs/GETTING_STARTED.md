# 🚀 海艺RN开发模板 - 新人上手指南

欢迎加入海艺React Native开发团队！这份指南将帮助您快速掌握项目结构和开发流程。

## 📋 目录

- [项目介绍](#-项目介绍)
- [环境搭建](#️-环境搭建)
- [快速开始](#-快速开始)
- [项目架构](#-项目架构)
- [开发流程](#-开发流程)
- [常用功能](#-常用功能)
- [调试技巧](#-调试技巧)
- [常见问题](#-常见问题)

## 🎯 项目介绍

这是海艺团队的React Native开发模板，基于最新的RN 0.76.9版本构建，集成了：

### 核心技术栈

- **React Native 0.76.9** + **TypeScript** - 类型安全的移动端开发
- **Expo 52** - 现代化开发工具链
- **TailwindCSS (twrnc)** - 快速样式开发
- **Zustand** - 轻量级状态管理
- **React Navigation** - 专业导航解决方案

### 集成功能

- ✅ 网络请求库（优化版Axios）
- ✅ 图片缓存（expo-image）
- ✅ 高性能列表（FlashList）
- ✅ 动画库（Reanimated）
- ✅ 国际化（i18next）
- ✅ 本地存储（MMKV）
- ✅ 错误监控预设

## 🛠️ 环境搭建

### 1. 基础环境要求

```bash
# Node.js 版本要求：>=18.0.0
node --version

# 包管理器：推荐使用 pnpm
npm install -g pnpm

# React Native CLI
npm install -g @react-native-community/cli
```

### 2. 平台环境

#### Android 开发

```bash
# 安装 Android Studio
# 配置 ANDROID_HOME 环境变量
# 确保以下目录在 PATH 中：
# $ANDROID_HOME/tools
# $ANDROID_HOME/platform-tools
```

#### iOS 开发（仅 macOS）

```bash
# 安装 Xcode (App Store)
# 安装 CocoaPods
sudo gem install cocoapods

# 或使用 Homebrew
brew install cocoapods
```

### 3. 项目依赖安装

```bash
# 克隆项目
git clone <project-url>
cd MyRNApp

# 安装依赖
pnpm install

# iOS 依赖安装（仅 macOS）
cd ios && pod install && cd ..
```

## 🚀 快速开始

### 1. 启动开发服务器

```bash
# 启动 Metro 服务器（保持运行）
pnpm start
```

### 2. 运行应用

```bash
# Android 设备/模拟器
pnpm run android

# iOS 设备/模拟器（仅 macOS）
pnpm run ios
```

### 3. 开发模式

- **热重载**：保存文件自动刷新
- **快速刷新**：保持组件状态的更新
- **调试菜单**：设备摇一摇或 `Cmd+D` (iOS) / `Ctrl+M` (Android)

## 🏗️ 项目架构

### 核心目录结构

```
src/
├── AppRoot.tsx              # 应用根组件
├── navigation/              # 导航系统
│   ├── index.ts            # 导航统一导出
│   ├── types.ts            # 导航类型定义
│   ├── RootNavigator.tsx   # 根导航器
│   └── TabNavigator.tsx    # 底部标签导航
├── screens/                # 页面组件
│   ├── auth/               # 认证相关页面
│   ├── home/               # 首页
│   ├── mine/               # 个人中心
│   └── example/            # 示例页面
├── components/             # 通用组件
│   ├── ui/                 # UI基础组件
│   └── common/             # 通用业务组件
├── utils/                  # 工具函数
│   ├── http/               # 网络请求
│   ├── storage/            # 本地存储
│   └── twcss/              # TailwindCSS配置
├── types/                  # TypeScript类型定义
├── hooks/                  # 自定义Hooks
├── constants/              # 常量定义
└── assets/                 # 静态资源
    ├── images/             # 图片
    └── fonts/              # 字体
```

### 入口文件流程

```
index.js                    # RN入口，注册根组件
    ↓
src/AppRoot.tsx            # 应用根组件，包含全局配置
    ↓
src/navigation/            # 导航系统
    ↓
src/screens/               # 具体页面
```

## 📝 开发流程

### 1. 创建新页面

```bash
# 1. 在 src/screens/ 下创建页面文件
touch src/screens/profile/ProfileScreen.tsx
```

```tsx
// ProfileScreen.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { tw } from '@/utils/twcss/twrnc'

const ProfileScreen: React.FC = () => {
  return (
    <View style={tw('flex-1 items-center justify-center bg-gray-50')}>
      <Text style={tw('text-xl font-bold text-gray-800')}>个人资料页面</Text>
    </View>
  )
}

export default ProfileScreen
```

### 2. 添加导航

```tsx
// 在 navigation/types.ts 中添加路由类型
export type RootStackParamList = {
  // 现有路由...
  Profile: undefined
}

// 在 RootNavigator.tsx 中添加路由
;<Stack.Screen name='Profile' component={ProfileScreen} />
```

### 3. 使用导航跳转

```tsx
import { navigate } from '@/navigation'

const handleGoToProfile = () => {
  navigate('Profile')
}
```

### 4. 网络请求示例

```tsx
import { get, post } from '@/utils/http/request'

// GET 请求
const fetchUserData = async () => {
  try {
    const userData = await get<User>('/api/user/profile')
    setUser(userData)
  } catch (error) {
    console.error('获取用户数据失败:', error)
  }
}

// POST 请求
const updateProfile = async (data: UserProfile) => {
  try {
    await post('/api/user/profile', data)
    console.log('更新成功')
  } catch (error) {
    console.error('更新失败:', error)
  }
}
```

## 🔧 常用功能

### 1. 样式开发（TailwindCSS）

```tsx
import { tw } from '@/utils/twcss/twrnc'

// 基础样式
<View style={tw('flex-1 bg-gray-100 p-4')}>
  <Text style={tw('text-lg font-bold text-blue-600')}>
    标题文本
  </Text>
</View>

// 响应式样式
<View style={tw('w-full md:w-1/2 lg:w-1/3')}>
  响应式容器
</View>

// 动态样式
<Text style={tw(`text-base ${isActive ? 'text-blue-500' : 'text-gray-500'}`)}>
  动态颜色
</Text>
```

### 2. 状态管理（Zustand）

```tsx
// stores/userStore.ts
import { create } from 'zustand'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

// 在组件中使用
const { user, setUser } = useUserStore()
```

### 3. 图片显示

```tsx
import { Image } from 'expo-image'
;<Image
  source={{ uri: imageUrl }}
  style={tw('w-full h-48 rounded-lg')}
  placeholder={{ uri: placeholderUrl }}
  contentFit='cover'
  transition={200}
/>
```

### 4. 高性能列表

```tsx
import { FlashList } from '@shopify/flash-list'
;<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  estimatedItemSize={100}
  keyExtractor={(item) => item.id}
/>
```

## 🐛 调试技巧

### 1. 开发工具

- **Flipper** - 强大的调试工具
- **React DevTools** - 组件调试
- **Network Inspector** - 网络请求监控

### 2. 日志调试

```tsx
// 开发环境日志
if (__DEV__) {
  console.log('调试信息:', data)
}

// 网络请求自动日志（已集成）
// 在 utils/http/request.ts 中自动记录
```

### 3. 性能监控

```tsx
import { getMetrics } from '@/utils/http/request'

// 查看网络性能
const metrics = getMetrics()
console.log('平均响应时间:', metrics.averageResponseTime)
```

### 4. 错误边界

```tsx
// 组件级错误处理
import ErrorBoundary from '@/components/common/ErrorBoundary'
;<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## ❓ 常见问题

### 1. Metro 缓存问题

```bash
# 清理所有缓存
pnpm start --reset-cache

# 或使用项目脚本
pnpm run clean:metro
```

### 2. Android 构建问题

```bash
# 清理 Android 缓存
pnpm run clean:android

# 重新构建
pnpm run android
```

### 3. iOS 构建问题

```bash
# 清理 iOS 缓存
pnpm run clean:ios

# 重新构建
pnpm run ios
```

### 4. 依赖安装问题

```bash
# 删除 node_modules 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# iOS 重新安装 pods
cd ios && rm -rf Pods Podfile.lock && pod install
```

### 5. 类型错误

```bash
# 检查 TypeScript 类型
npx tsc --noEmit

# 修复 ESLint 问题
pnpm run lint --fix
```

### 6. 样式不生效

```tsx
// 确保正确导入 tw
import { tw } from '@/utils/twcss/twrnc'

// 检查类名是否正确
<View style={tw('flex-1 bg-red-500')} />

// 动态样式确保语法正确
<View style={tw(`bg-${color}-500`)} />
```

## 📚 进阶学习

### 推荐资源

- [React Native 官方文档](https://reactnative.dev/)
- [Expo 官方文档](https://docs.expo.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [TailwindCSS 官方文档](https://tailwindcss.com/)

### 团队规范

- [代码规范文档](./docs/CODE_STYLE.md)
- [Git 提交规范](./docs/GIT_CONVENTION.md)

## 🎯 下一步

1. **熟悉项目结构** - 仔细阅读现有代码
2. **运行示例页面** - 查看 `src/screens/example/`
3. **尝试修改样式** - 练习 TailwindCSS 语法
4. **创建简单页面** - 按照开发流程创建新页面
5. **学习网络请求** - 查看 `src/utils/http/examples.ts`

## 💬 获得帮助

- **技术问题**：在项目仓库提交 Issue
- **团队支持**：联系项目负责人
- **文档更新**：欢迎提交 PR 改进文档

---

**欢迎加入海艺团队！让我们一起创造优秀的移动应用！** 🚀
