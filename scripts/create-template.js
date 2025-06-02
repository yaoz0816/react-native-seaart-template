#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
}

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}\n`),
}

const rootDir = path.resolve(__dirname, '..')

// 创建极简版的 App.tsx
const simpleAppContent = `import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>🚀 React Native 脚手架</Text>
          <Text style={styles.subtitle}>
            项目已准备就绪，开始你的开发之旅！
          </Text>
          
          <View style={styles.features}>
            <Text style={styles.featureTitle}>✨ 已集成功能:</Text>
            <Text style={styles.feature}>• TypeScript 支持</Text>
            <Text style={styles.feature}>• ESLint + Prettier 代码规范</Text>
            <Text style={styles.feature}>• Expo Image 图片组件</Text>
            <Text style={styles.feature}>• FlashList 高性能列表</Text>
            <Text style={styles.feature}>• Zustand 状态管理</Text>
            <Text style={styles.feature}>• Axios 网络请求</Text>
            <Text style={styles.feature}>• i18next 国际化</Text>
            <Text style={styles.feature}>• Reanimated 动画库</Text>
          </View>
          
          <View style={styles.quickStart}>
            <Text style={styles.quickStartTitle}>🏃‍♂️ 快速开始:</Text>
            <Text style={styles.quickStartStep}>1. 运行 pnpm run setup YourAppName</Text>
            <Text style={styles.quickStartStep}>2. 修改 src/ 目录下的代码</Text>
            <Text style={styles.quickStartStep}>3. 运行 pnpm run android/ios</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  features: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
  },
  feature: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20,
  },
  quickStart: {
    width: '100%',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  quickStartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 12,
  },
  quickStartStep: {
    fontSize: 14,
    color: '#1565c0',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default App;
`

// 创建简化的 README
const readmeContent = `# React Native 极简脚手架

一个开箱即用的 React Native 项目模板，集成了常用的开发工具和库。

## 🚀 快速开始

### 1. 克隆项目
\`\`\`bash
git clone <repository-url>
cd <project-directory>
\`\`\`

### 2. 安装依赖
\`\`\`bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
\`\`\`

### 3. 配置项目
\`\`\`bash
# 使用 pnpm (推荐) - 脚本会自动检测包管理器
pnpm run setup YourAppName com.yourcompany.yourapp

# 或使用默认包名
pnpm run setup YourAppName

# 也可以使用其他包管理器
npm run setup YourAppName com.yourcompany.yourapp
yarn setup YourAppName com.yourcompany.yourapp
\`\`\`

### 4. 启动项目
\`\`\`bash
# 启动 Metro
pnpm start

# 运行 Android
pnpm run android

# 运行 iOS
pnpm run ios
\`\`\`

## 📦 已集成功能

- **TypeScript** - 类型安全的 JavaScript
- **ESLint + Prettier** - 代码规范和格式化
- **Expo Image** - 高性能图片组件
- **FlashList** - 高性能列表组件
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP 客户端
- **i18next** - 国际化支持
- **Reanimated** - 高性能动画库
- **TailwindCSS (twrnc)** - 实用优先的 CSS 框架

## 📁 项目结构

\`\`\`
src/
├── components/          # 通用组件
├── screens/            # 页面组件
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── types/              # TypeScript 类型定义
└── assets/             # 静态资源

scripts/
├── setup.js            # 项目配置脚本
└── create-template.js  # 模板生成脚本
\`\`\`

## 🛠️ 可用脚本

脚本会自动检测您使用的包管理器（npm/pnpm/yarn）并使用相应的命令。

- \`pnpm run setup <name> [package]\` - 配置项目名称和包名
- \`pnpm start\` - 启动 Metro bundler
- \`pnpm run android\` - 运行 Android 应用
- \`pnpm run ios\` - 运行 iOS 应用
- \`pnpm run lint\` - 运行 ESLint 检查
- \`pnpm test\` - 运行测试

## 🔧 自定义配置

### 修改应用图标
1. 替换 \`android/app/src/main/res/mipmap-*/ic_launcher.png\`
2. 替换 \`ios/YourApp/Images.xcassets/AppIcon.appiconset/\` 中的图标

### 修改启动屏
1. Android: 修改 \`android/app/src/main/res/drawable/launch_screen.xml\`
2. iOS: 修改 \`ios/YourApp/LaunchScreen.storyboard\`

### 添加新的依赖
\`\`\`bash
# 使用 pnpm
pnpm add <package-name>

# 如果是原生依赖，还需要：
cd ios && pod install
\`\`\`

## 📱 开发建议

1. **组件开发**: 在 \`src/components\` 中创建可复用组件
2. **页面开发**: 在 \`src/screens\` 中创建页面组件
3. **状态管理**: 使用 Zustand 进行全局状态管理
4. **网络请求**: 使用 \`src/utils/http\` 中的封装方法
5. **类型定义**: 在 \`src/types\` 中定义 TypeScript 类型

## 🐛 常见问题

### Metro 缓存问题
\`\`\`bash
npx react-native start --reset-cache
\`\`\`

### Android 构建问题
\`\`\`bash
cd android && ./gradlew clean
\`\`\`

### iOS 构建问题
\`\`\`bash
# 使用 pnpm
cd ios && rm -rf Pods && pnpm exec pod install

# 或使用 npm
cd ios && rm -rf Pods && pod install
\`\`\`

## 📄 许可证

MIT License
`

// 创建 package.json 脚本配置
const packageJsonScripts = {
  setup: 'node scripts/setup.js',
  template: 'node scripts/create-template.js',
  clean: 'npx react-native start --reset-cache',
  'clean:android': 'cd android && ./gradlew clean',
  'clean:ios':
    'cd ios && rm -rf build && rm -rf Pods && rm Podfile.lock && pod install',
}

try {
  log.title('🎨 创建脚手架模板')

  // 1. 创建简化的 App.tsx
  fs.writeFileSync(path.join(rootDir, 'App.simple.tsx'), simpleAppContent)
  log.success('已创建: App.simple.tsx (简化版本)')

  // 2. 创建 README
  fs.writeFileSync(path.join(rootDir, 'README.scaffold.md'), readmeContent)
  log.success('已创建: README.scaffold.md')

  // 3. 更新 package.json 脚本
  const packageJsonPath = path.join(rootDir, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  packageJson.scripts = {
    ...packageJson.scripts,
    ...packageJsonScripts,
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  log.success('已更新: package.json 脚本')

  log.title('✨ 模板创建完成！')
  console.log('使用方法:')
  console.log('1. 运行 pnpm run setup YourAppName 配置项目')
  console.log('2. 可选择使用 App.simple.tsx 替换 App.tsx 作为起始模板')
  console.log('3. 参考 README.scaffold.md 了解详细使用说明')
} catch (error) {
  console.error('创建模板时出现错误:', error.message)
  process.exit(1)
}
