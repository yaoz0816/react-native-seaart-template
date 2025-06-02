# React Native 脚手架使用示例

## 🎯 使用场景

这个脚手架适用于以下场景：

- 团队需要快速启动新的 React Native 项目
- 希望统一项目结构和开发工具
- 需要自动化配置项目名称和包名

## 📋 完整使用流程

### 1. 准备脚手架（项目负责人）

```bash
# 在当前项目中运行
pnpm run prepare-scaffold
```

这个命令会：

- 清理开发过程中的临时文件
- 重置项目配置为脚手架默认值
- 替换为简化版的 App.tsx
- 重置 Git 历史
- 生成使用说明文档

### 2. 分发脚手架

将准备好的脚手架推送到团队的 Git 仓库：

```bash
git remote add origin <your-scaffold-repo-url>
git push -u origin main
```

### 3. 团队成员使用脚手架

```bash
# 克隆脚手架
git clone <your-scaffold-repo-url> MyNewProject
cd MyNewProject

# 安装依赖 (选择其中一种)
npm install
# 或使用 pnpm (推荐，更快更节省空间)
pnpm install
# 或使用 yarn
yarn install

# 配置项目 (脚本会自动检测包管理器)
pnpm run setup MyNewProject com.company.mynewproject
# 或
npm run setup MyNewProject com.company.mynewproject
# 或
yarn setup MyNewProject com.company.mynewproject

# 开始开发
pnpm start
pnpm run android  # 或 pnpm run ios
```

## 🛠️ 可用脚本说明

| 脚本                        | 用途                                  | 使用时机                    |
| --------------------------- | ------------------------------------- | --------------------------- |
| `pnpm run setup`            | 配置项目名称和包名 (自动检测包管理器) | 团队成员首次使用脚手架时    |
| `pnpm run template`         | 生成脚手架模板文件                    | 准备脚手架时                |
| `pnpm run prepare-scaffold` | 准备脚手架分发                        | 项目负责人准备脚手架时      |
| `pnpm run clean`            | 清理 Metro 缓存                       | 遇到缓存问题时              |
| `pnpm run clean:android`    | 清理 Android 构建缓存                 | Android 构建问题时          |
| `pnpm run clean:ios`        | 清理 iOS 构建缓存 (npm)               | iOS 构建问题时              |
| `pnpm run clean:ios:pnpm`   | 清理 iOS 构建缓存 (pnpm)              | 使用 pnpm 时的 iOS 构建问题 |
| `pnpm run clean:ios:yarn`   | 清理 iOS 构建缓存 (yarn)              | 使用 yarn 时的 iOS 构建问题 |

> **注意**: 可以将 `pnpm` 替换为 `npm` 或 `yarn`，脚本会自动检测您使用的包管理器。

## 📁 脚手架包含的功能

### 核心功能

- ✅ React Native 0.76.9 (最新稳定版)
- ✅ TypeScript 支持
- ✅ Expo 52 集成
- ✅ 新架构支持 (Fabric + TurboModules)

### 开发工具

- ✅ ESLint + Prettier 代码规范
- ✅ Babel 配置优化
- ✅ Metro 配置优化
- ✅ VS Code 配置

### 常用库

- ✅ **expo-image** - 高性能图片组件
- ✅ **@shopify/flash-list** - 高性能列表
- ✅ **zustand** - 轻量级状态管理
- ✅ **axios** - HTTP 客户端
- ✅ **i18next** - 国际化
- ✅ **react-native-reanimated** - 动画库
- ✅ **twrnc** - TailwindCSS 支持

### 项目结构

```
src/
├── components/     # 通用组件
├── screens/       # 页面组件
├── hooks/         # 自定义 Hooks
├── utils/         # 工具函数
├── types/         # TypeScript 类型
└── assets/        # 静态资源

scripts/
├── setup.js              # 项目配置脚本
├── create-template.js    # 模板生成脚本
└── prepare-scaffold.js   # 脚手架准备脚本
```

## 🔧 自定义配置

### 修改默认包名格式

编辑 `scripts/setup.js` 中的 `defaultPackageName` 生成逻辑：

```javascript
const defaultPackageName =
  packageName ||
  `com.yourcompany.${projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}`
```

### 添加更多依赖

在 `package.json` 中添加团队常用的依赖包，这样新项目就会自动包含这些库。

### 自定义项目模板

修改 `scripts/create-template.js` 中的 `simpleAppContent` 来自定义默认的 App.tsx 内容。

## 🚀 最佳实践

1. **版本管理**: 为脚手架创建版本标签，方便团队使用特定版本
2. **文档维护**: 及时更新 README 和使用说明
3. **依赖更新**: 定期更新依赖包到最新稳定版本
4. **团队反馈**: 收集团队使用反馈，持续改进脚手架

## 🐛 常见问题

### Q: setup 脚本执行失败

A: 检查 Node.js 版本是否 >= 18，确保有文件写入权限

### Q: Android 包名修改后无法运行

A: 运行 `pnpm run clean:android` 清理构建缓存

### Q: iOS 项目名称修改后无法运行

A: 运行 `pnpm run clean:ios:pnpm` 重新安装 Pods

### Q: 如何添加新的脚本到脚手架

A: 在 `scripts/create-template.js` 的 `packageJsonScripts` 中添加

---

💡 **提示**: 建议团队建立脚手架使用规范，确保所有成员都能正确使用脚手架开始新项目。
