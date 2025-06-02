# 🎨 海艺 React Native 开发模板

> 🚀 一个专为海艺团队打造的现代化 React Native 开发模板，让新人快速上手移动端开发！

## ⭐ 特色亮点

- ✅ **最新技术栈** - RN 0.76.9 + TypeScript + Expo 52
- ✅ **开箱即用** - 集成导航、网络、状态管理、样式系统
- ✅ **企业级网络库** - 缓存、重试、去重、性能监控
- ✅ **TailwindCSS** - 快速样式开发，响应式设计
- ✅ **完整示例** - 从登录到列表，覆盖常见业务场景
- ✅ **新人友好** - 详细文档，代码模板，快速参考

## 🚀 30秒快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm start

# 3. 运行应用
pnpm run android  # Android
pnpm run ios       # iOS (仅 macOS)
```

## 📱 预览效果

<table>
  <tr>
    <td align="center"><strong>首页列表</strong></td>
    <td align="center"><strong>导航切换</strong></td>
    <td align="center"><strong>网络请求</strong></td>
  </tr>
  <tr>
    <td align="center">高性能FlashList<br/>图片缓存优化</td>
    <td align="center">流畅的标签导航<br/>TypeScript类型安全</td>
    <td align="center">智能缓存重试<br/>错误处理完善</td>
  </tr>
</table>

## 🏗️ 核心架构

```
📱 海艺RN模板
├── 🧭 导航系统        # React Navigation 7 + TypeScript
├── 🌐 网络请求        # 优化版Axios + 缓存 + 重试
├── 🎨 样式系统        # TailwindCSS + 响应式
├── 🔄 状态管理        # Zustand + 持久化
├── 📸 图片处理        # Expo Image + 缓存优化
├── 📋 高性能列表       # FlashList + 虚拟化
└── 🛠️ 开发工具        # ESLint + Prettier + TypeScript
```

## 📚 文档导航

| 文档                                               | 适用人群   | 描述                             |
| -------------------------------------------------- | ---------- | -------------------------------- |
| **[新人上手指南](./GETTING_STARTED.md)**           | 🔰 新手必读 | 从环境搭建到第一个页面的完整流程 |
| **[快速参考手册](./QUICK_REFERENCE.md)**           | 📖 日常开发 | 常用代码片段、API速查、样式参考  |
| **[使用场景详解](./USE_CASES.md)**                 | 🎯 决策参考 | 详细介绍脚手架适用场景和选择建议 |
| **[方案对比分析](./COMPARISON.md)**                | ⚖️ 技术选型 | 与其他技术方案的客观对比分析     |
| **[网络库使用示例](./src/utils/http/examples.ts)** | 🌐 接口开发 | 登录、上传、批量请求等完整示例   |

## 🎯 核心功能演示

### 🌐 智能网络请求

```tsx
import { get, post } from '@/utils/http/request'

// 带缓存的GET请求
const userData = await get('/api/user', params, {
  cache: { ttl: 5 * 60 * 1000 }, // 5分钟缓存
  retry: { retries: 2 }, // 自动重试
  deduplication: true, // 请求去重
})

// 文件上传进度
await upload('/api/upload', file, {
  onProgress: (progress) => console.log(`${progress}%`),
})
```

### 🎨 快速样式开发

```tsx
import { tw } from '@/utils/twcss/twrnc'
;<View style={tw('flex-1 bg-gray-100 p-4')}>
  <Text style={tw('text-xl font-bold text-blue-600 text-center')}>
    TailwindCSS 让样式开发飞起来！
  </Text>
</View>
```

### 🧭 类型安全导航

```tsx
import { navigate, goBack } from '@/navigation'

// 类型安全的导航跳转
navigate('UserProfile', { userId: '123' })

// 一键返回
goBack()
```

### 📋 高性能列表

```tsx
import { FlashList } from '@shopify/flash-list'
;<FlashList
  data={posts}
  renderItem={({ item }) => <PostCard post={item} />}
  estimatedItemSize={200}
  // 自动优化性能
/>
```

## 🛠️ 开发环境要求

| 工具             | 版本要求 | 说明                  |
| ---------------- | -------- | --------------------- |
| Node.js          | ≥ 18.0.0 | JavaScript运行环境    |
| pnpm             | ≥ 8.0.0  | 推荐的包管理器        |
| React Native CLI | 最新版   | RN开发工具            |
| Android Studio   | 最新版   | Android开发环境       |
| Xcode            | 最新版   | iOS开发环境 (仅macOS) |

## 🎨 内置功能清单

### 📱 UI组件

- ✅ 导航栏组件 (SeaArtNavBarView)
- ✅ 渐变按钮 (SeaArtGradientButton)
- ✅ 侧滑菜单 (SeaArtSlideMenu)
- ✅ 错误边界 (ErrorBoundary)
- ✅ 图片优化组件 (OptimizedExpoImage)

### 🌐 网络功能

- ✅ 智能缓存系统 (LRU + TTL)
- ✅ 请求重试机制 (指数退避)
- ✅ 请求去重防抖
- ✅ 性能监控统计
- ✅ 错误分类处理
- ✅ Token自动管理

### 🎯 开发工具

- ✅ TypeScript 完整支持
- ✅ ESLint + Prettier 代码规范
- ✅ 路径别名 (@/ 导入)
- ✅ 热重载 + 快速刷新
- ✅ 性能分析工具

## 📋 可用脚本

```bash
# 开发相关
pnpm start                    # 启动Metro服务器
pnpm run android             # 运行Android应用
pnpm run ios                 # 运行iOS应用

# 代码质量
pnpm run lint                # 代码检查
pnpm run lint --fix          # 自动修复
pnpm test                    # 运行测试

# 清理缓存
pnpm start --reset-cache     # 重置Metro缓存
pnpm run clean:android       # 清理Android缓存
pnpm run clean:ios           # 清理iOS缓存

# 构建分析
pnpm run bundle:visualizer:android  # Android包分析
pnpm run bundle:visualizer:ios      # iOS包分析
```

## 🔧 项目配置

### 修改应用名称

```bash
# 使用脚本一键修改
pnpm run setup YourAppName com.seaart.yourapp
```

### 自定义配置

- **应用图标**: `android/app/src/main/res/` + `ios/*/Images.xcassets/`
- **启动页**: `android/app/src/main/res/drawable/` + `ios/*/LaunchScreen.storyboard`
- **环境变量**: `seaart-config.json`
- **TailwindCSS**: `src/utils/twcss/twrnc.ts`

## 🚨 常见问题解决

### Metro缓存问题

```bash
pnpm start --reset-cache
```

### Android构建失败

```bash
pnpm run clean:android && pnpm run android
```

### iOS构建失败

```bash
pnpm run clean:ios && pnpm run ios
```

### 依赖安装问题

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
cd ios && pod install
```

## 🎉 开始你的第一个功能

1. **📖 阅读文档** - 查看 [新人上手指南](./GETTING_STARTED.md)
2. **🔍 探索代码** - 研究 `src/screens/example/` 示例页面
3. **🎨 修改样式** - 在示例页面练习 TailwindCSS
4. **🌐 测试网络** - 查看 `src/utils/http/examples.ts` 网络示例
5. **📱 创建页面** - 按照文档创建你的第一个页面

## 💬 获得帮助

- 🐛 **Bug反馈**: 在项目仓库提交Issue
- 💡 **功能建议**: 提交Feature Request
- 📚 **文档改进**: 欢迎提交PR
- 👥 **团队支持**: 联系项目负责人

## 📈 版本历史

- **v1.0.0** - 基础模板发布
- **v1.1.0** - 网络库优化
- **v1.2.0** - 导航系统重构
- **v1.3.0** - TailwindCSS集成
- **v1.4.0** - 性能优化和文档完善

---

<div align="center">

**🎨 海艺AI - 让创意触手可及**

[![React Native](https://img.shields.io/badge/React%20Native-0.76.9-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-52-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>
