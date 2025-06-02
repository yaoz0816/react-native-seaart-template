#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}\n`),
}

const rootDir = path.resolve(__dirname, '..')

// 要清理的文件和目录
const filesToClean = [
  'node_modules',
  'ios/Pods',
  'ios/build',
  'android/build',
  'android/app/build',
  '.expo',
  'dist',
  'web-build',
  '.metro-health-check*',
  'coverage',
  'tmp',
  'temp',
  '.DS_Store',
  'npm-debug.log',
  'yarn-error.log',
  '*.log',
]

// 要重置的配置文件
const configFiles = [
  {
    file: 'package.json',
    updates: {
      name: 'react-native-scaffold',
      version: '1.0.0',
      description:
        'A minimal React Native scaffold with essential tools and libraries',
    },
  },
  {
    file: 'app.json',
    updates: {
      name: 'ReactNativeScaffold',
      displayName: 'React Native Scaffold',
    },
  },
]

function cleanFiles() {
  log.title('🧹 清理项目文件')

  filesToClean.forEach((pattern) => {
    const fullPath = path.join(rootDir, pattern)

    try {
      if (fs.existsSync(fullPath)) {
        if (fs.statSync(fullPath).isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true })
          log.success(`已删除目录: ${pattern}`)
        } else {
          fs.unlinkSync(fullPath)
          log.success(`已删除文件: ${pattern}`)
        }
      }
    } catch (error) {
      log.warning(`无法删除 ${pattern}: ${error.message}`)
    }
  })
}

function resetConfigs() {
  log.title('⚙️ 重置配置文件')

  configFiles.forEach(({ file, updates }) => {
    const filePath = path.join(rootDir, file)

    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        Object.assign(content, updates)
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
        log.success(`已重置: ${file}`)
      } catch (error) {
        log.error(`重置 ${file} 失败: ${error.message}`)
      }
    }
  })
}

function createScaffoldFiles() {
  log.title('📝 创建脚手架文件')

  // 替换 App.tsx 为简化版本
  const simpleAppPath = path.join(rootDir, 'App.simple.tsx')
  const appPath = path.join(rootDir, 'App.tsx')

  if (fs.existsSync(simpleAppPath)) {
    fs.copyFileSync(simpleAppPath, appPath)
    fs.unlinkSync(simpleAppPath)
    log.success('已使用简化版本替换 App.tsx')
  }

  // 替换 README
  const scaffoldReadmePath = path.join(rootDir, 'README.scaffold.md')
  const readmePath = path.join(rootDir, 'README.md')

  if (fs.existsSync(scaffoldReadmePath)) {
    fs.copyFileSync(scaffoldReadmePath, readmePath)
    fs.unlinkSync(scaffoldReadmePath)
    log.success('已使用脚手架版本替换 README.md')
  }

  // 使用模板 .gitignore
  const gitignoreTemplatePath = path.join(rootDir, '.gitignore.template')
  const gitignorePath = path.join(rootDir, '.gitignore')

  if (fs.existsSync(gitignoreTemplatePath)) {
    fs.copyFileSync(gitignoreTemplatePath, gitignorePath)
    fs.unlinkSync(gitignoreTemplatePath)
    log.success('已使用模板版本替换 .gitignore')
  }
}

function resetGit() {
  log.title('🔄 重置 Git 历史')

  try {
    // 删除现有的 .git 目录
    const gitDir = path.join(rootDir, '.git')
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true })
      log.success('已删除现有 Git 历史')
    }

    // 初始化新的 Git 仓库
    execSync('git init', { cwd: rootDir, stdio: 'ignore' })
    execSync('git add .', { cwd: rootDir, stdio: 'ignore' })
    execSync('git commit -m "Initial commit: React Native Scaffold"', {
      cwd: rootDir,
      stdio: 'ignore',
    })

    log.success('已初始化新的 Git 仓库')
  } catch (error) {
    log.warning('Git 操作失败，请手动处理')
  }
}

function createInstructions() {
  log.title('📋 创建使用说明')

  const instructionsContent = `# 🚀 React Native 脚手架使用说明

## 快速开始

1. **克隆或下载此项目**
   \`\`\`bash
   git clone <your-scaffold-repo>
   cd <project-name>
   \`\`\`

2. **安装依赖**
   \`\`\`bash
   npm install
   # 或
   pnpm install
   \`\`\`

3. **配置项目**
   \`\`\`bash
   npm run setup YourAppName com.yourcompany.yourapp
   \`\`\`

4. **启动开发**
   \`\`\`bash
   npm start
   npm run android  # 或 npm run ios
   \`\`\`

## 脚手架特性

✅ **开箱即用** - 无需复杂配置
✅ **自动化脚本** - 一键更新项目名称和包名
✅ **最佳实践** - 集成常用开发工具
✅ **类型安全** - 完整的 TypeScript 支持
✅ **代码规范** - ESLint + Prettier 配置
✅ **高性能** - 优化的组件和库选择

## 团队协作

1. **分发脚手架**: 将此项目作为模板分发给团队成员
2. **快速上手**: 团队成员只需运行 setup 脚本即可开始开发
3. **统一标准**: 确保所有项目使用相同的工具和配置

---

Happy Coding! 🎉
`

  fs.writeFileSync(
    path.join(rootDir, 'SCAFFOLD_INSTRUCTIONS.md'),
    instructionsContent,
  )
  log.success('已创建: SCAFFOLD_INSTRUCTIONS.md')
}

try {
  log.title('🎯 准备 React Native 脚手架')

  cleanFiles()
  resetConfigs()
  createScaffoldFiles()
  resetGit()
  createInstructions()

  log.title('🎉 脚手架准备完成！')
  log.success('项目已准备好作为脚手架分发')
  log.info('\n下一步:')
  log.info('1. 将项目推送到 Git 仓库')
  log.info('2. 团队成员克隆后运行 npm run setup <项目名>')
  log.info('3. 查看 SCAFFOLD_INSTRUCTIONS.md 了解详细说明')
} catch (error) {
  log.error(`准备脚手架时出现错误: ${error.message}`)
  process.exit(1)
}
