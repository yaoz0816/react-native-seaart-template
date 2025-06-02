#!/usr/bin/env node
/**
 * @author 曼巴
 * @filename setup.js
 * @date 2025-05-28 星期三
 * @description 更新项目名和包名脚本
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
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

// 检测包管理器
function detectPackageManager() {
  const rootDir = path.resolve(__dirname, '..')

  if (fs.existsSync(path.join(rootDir, 'pnpm-lock.yaml'))) {
    return 'pnpm'
  } else if (fs.existsSync(path.join(rootDir, 'yarn.lock'))) {
    return 'yarn'
  } else {
    return 'npm'
  }
}

const packageManager = detectPackageManager()

// 获取命令行参数
const args = process.argv.slice(2)
const projectName = args[0]
const packageName = args[1]

if (!projectName) {
  log.error('请提供项目名称')
  log.info(`使用方法: ${packageManager} run setup <项目名称> [包名]`)
  log.info(
    `示例: ${packageManager} run setup MyAwesomeApp com.company.myawesomeapp`,
  )
  process.exit(1)
}

// 生成默认包名
const defaultPackageName =
  packageName ||
  `com.company.${projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}`

log.title('🚀 React Native 项目配置工具')
log.info(`包管理器: ${packageManager}`)
log.info(`项目名称: ${projectName}`)
log.info(`包名: ${defaultPackageName}`)

// 验证包名格式
if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/.test(defaultPackageName)) {
  log.error('包名格式不正确，应该类似: com.company.appname')
  process.exit(1)
}

const rootDir = path.resolve(__dirname, '..')

// 动态检测当前项目配置
function detectCurrentConfig() {
  const config = {
    currentName: null,
    currentDisplayName: null,
    currentPackageName: null,
    currentIOSProjectName: null,
  }

  // 从 package.json 获取当前名称
  const packageJsonPath = path.join(rootDir, 'package.json')

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    config.currentName = packageJson.name
  }

  // 从 app.json 获取当前显示名称
  const appJsonPath = path.join(rootDir, 'app.json')

  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'))
    config.currentDisplayName = appJson.displayName
  }

  // 从 Android build.gradle 获取当前包名
  const buildGradlePath = path.join(rootDir, 'android/app/build.gradle')

  if (fs.existsSync(buildGradlePath)) {
    const buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8')
    const namespaceMatch = buildGradleContent.match(/namespace\s+"([^"]+)"/)

    const applicationIdMatch = buildGradleContent.match(
      /applicationId\s+"([^"]+)"/,
    )

    if (namespaceMatch) {
      config.currentPackageName = namespaceMatch[1]
    } else if (applicationIdMatch) {
      config.currentPackageName = applicationIdMatch[1]
    }
  }

  // 检测当前 iOS 项目名称
  const iosDir = path.join(rootDir, 'ios')

  if (fs.existsSync(iosDir)) {
    const iosContents = fs.readdirSync(iosDir)
    const xcodeproj = iosContents.find((item) => item.endsWith('.xcodeproj'))

    if (xcodeproj) {
      config.currentIOSProjectName = xcodeproj.replace('.xcodeproj', '')
    }
  }

  return config
}

// 更新文件内容的工具函数
function updateFileContent(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    log.warning(`文件不存在: ${filePath}`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')
  let updated = false

  replacements.forEach(({ from, to }) => {
    if (content.includes(from)) {
      content = content.replace(new RegExp(escapeRegExp(from), 'g'), to)
      updated = true
    }
  })

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8')
    log.success(`已更新: ${path.relative(rootDir, filePath)}`)
  }
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 重命名目录
function renameDirectory(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    // 创建新目录结构
    const newDir = path.dirname(newPath)

    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true })
    }

    // 如果新路径已存在，先删除
    if (fs.existsSync(newPath)) {
      fs.rmSync(newPath, { recursive: true, force: true })
    }

    // 移动文件
    if (fs.statSync(oldPath).isDirectory()) {
      // 创建目标目录
      fs.mkdirSync(newPath, { recursive: true })

      // 移动所有文件
      const files = fs.readdirSync(oldPath)
      files.forEach((file) => {
        const oldFilePath = path.join(oldPath, file)
        const newFilePath = path.join(newPath, file)

        if (fs.statSync(oldFilePath).isDirectory()) {
          renameDirectory(oldFilePath, newFilePath)
        } else {
          fs.copyFileSync(oldFilePath, newFilePath)
        }
      })

      // 删除原目录
      fs.rmSync(oldPath, { recursive: true, force: true })
    } else {
      fs.copyFileSync(oldPath, newPath)
      fs.unlinkSync(oldPath)
    }

    log.success(
      `已重命名: ${path.relative(rootDir, oldPath)} -> ${path.relative(rootDir, newPath)}`,
    )
  }
}

// 查找当前 Android 包目录
function findCurrentAndroidPackageDir() {
  const javaDir = path.join(rootDir, 'android/app/src/main/java')

  if (!fs.existsSync(javaDir)) {
    return null
  }

  function findPackageDir(dir) {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const itemPath = path.join(dir, item)

      if (fs.statSync(itemPath).isDirectory()) {
        // 检查是否包含 MainActivity 或 MainApplication 文件
        const files = fs.readdirSync(itemPath)

        if (
          files.some(
            (file) =>
              file.includes('MainActivity') || file.includes('MainApplication'),
          )
        ) {
          return itemPath
        }

        // 递归查找
        const found = findPackageDir(itemPath)

        if (found) {
          return found
        }
      }
    }

    return null
  }

  return findPackageDir(javaDir)
}

try {
  log.title('🔍 检测当前项目配置')

  const currentConfig = detectCurrentConfig()
  log.info(`当前项目名称: ${currentConfig.currentName || '未检测到'}`)
  log.info(`当前显示名称: ${currentConfig.currentDisplayName || '未检测到'}`)
  log.info(`当前包名: ${currentConfig.currentPackageName || '未检测到'}`)
  log.info(
    `当前 iOS 项目名: ${currentConfig.currentIOSProjectName || '未检测到'}`,
  )

  log.title('🚀 更新配置文件')

  // 1. 更新 package.json
  if (currentConfig.currentName) {
    updateFileContent(path.join(rootDir, 'package.json'), [
      {
        from: `"name": "${currentConfig.currentName}"`,
        to: `"name": "${projectName}"`,
      },
    ])
  }

  // 2. 更新 app.json
  if (currentConfig.currentDisplayName) {
    updateFileContent(path.join(rootDir, 'app.json'), [
      {
        from: `"name": "${currentConfig.currentDisplayName}"`,
        to: `"name": "${projectName}"`,
      },
      {
        from: `"displayName": "${currentConfig.currentDisplayName}"`,
        to: `"displayName": "${projectName}"`,
      },
    ])
  }

  log.title('🤖 更新 Android 配置')

  // 3. 更新 Android build.gradle
  if (currentConfig.currentPackageName) {
    updateFileContent(path.join(rootDir, 'android/app/build.gradle'), [
      {
        from: `namespace "${currentConfig.currentPackageName}"`,
        to: `namespace "${defaultPackageName}"`,
      },
      {
        from: `applicationId "${currentConfig.currentPackageName}"`,
        to: `applicationId "${defaultPackageName}"`,
      },
    ])
  }

  // 4. 更新 Android strings.xml
  if (currentConfig.currentDisplayName) {
    updateFileContent(
      path.join(rootDir, 'android/app/src/main/res/values/strings.xml'),
      [
        {
          from: `<string name="app_name">${currentConfig.currentDisplayName}</string>`,
          to: `<string name="app_name">${projectName}</string>`,
        },
      ],
    )
  }

  // 5. 重命名 Android 包目录
  const currentPackageDir = findCurrentAndroidPackageDir()

  if (currentPackageDir) {
    const packageParts = defaultPackageName.split('.')

    const newPackagePath = path.join(
      rootDir,
      'android/app/src/main/java',
      ...packageParts,
    )

    if (currentPackageDir !== newPackagePath) {
      renameDirectory(currentPackageDir, newPackagePath)
    }

    // 6. 更新 Android Java/Kotlin 文件中的包名
    const androidSrcDir = path.join(
      rootDir,
      'android/app/src/main/java',
      ...packageParts,
    )

    if (fs.existsSync(androidSrcDir)) {
      const javaFiles = fs
        .readdirSync(androidSrcDir)
        .filter((file) => file.endsWith('.java') || file.endsWith('.kt'))

      javaFiles.forEach((file) => {
        if (currentConfig.currentPackageName) {
          updateFileContent(path.join(androidSrcDir, file), [
            {
              from: `package ${currentConfig.currentPackageName}`,
              to: `package ${defaultPackageName}`,
            },
          ])
        }

        // 更新 MainActivity 中的组件名称
        if (file.includes('MainActivity') && currentConfig.currentDisplayName) {
          updateFileContent(path.join(androidSrcDir, file), [
            {
              from: `override fun getMainComponentName(): String = "${currentConfig.currentDisplayName}"`,
              to: `override fun getMainComponentName(): String = "${projectName}"`,
            },
          ])
        }
      })
    }
  }

  log.title('🍎 更新 iOS 配置')

  if (currentConfig.currentIOSProjectName) {
    // 7. 重命名 iOS 项目目录
    const oldIOSDir = path.join(
      rootDir,
      `ios/${currentConfig.currentIOSProjectName}`,
    )

    const newIOSDir = path.join(rootDir, `ios/${projectName}`)

    if (fs.existsSync(oldIOSDir) && oldIOSDir !== newIOSDir) {
      renameDirectory(oldIOSDir, newIOSDir)
    }

    // 8. 更新 iOS Info.plist
    const infoPlistPath = path.join(rootDir, `ios/${projectName}/Info.plist`)

    if (fs.existsSync(infoPlistPath)) {
      updateFileContent(infoPlistPath, [
        {
          from: `<string>${currentConfig.currentIOSProjectName}</string>`,
          to: `<string>${projectName}</string>`,
        },
      ])
    }

    // 9. 重命名 iOS Tests 目录
    const oldTestsDir = path.join(
      rootDir,
      `ios/${currentConfig.currentIOSProjectName}Tests`,
    )

    const newTestsDir = path.join(rootDir, `ios/${projectName}Tests`)

    if (fs.existsSync(oldTestsDir)) {
      renameDirectory(oldTestsDir, newTestsDir)
    }

    // 10. 重命名 .xcodeproj 目录
    const oldXcodeProjDir = path.join(
      rootDir,
      `ios/${currentConfig.currentIOSProjectName}.xcodeproj`,
    )

    const newXcodeProjDir = path.join(rootDir, `ios/${projectName}.xcodeproj`)

    if (fs.existsSync(oldXcodeProjDir)) {
      renameDirectory(oldXcodeProjDir, newXcodeProjDir)
    }

    // 11. 重命名 .xcworkspace 目录 (如果存在)
    const oldXcworkspaceDir = path.join(
      rootDir,
      `ios/${currentConfig.currentIOSProjectName}.xcworkspace`,
    )

    const newXcworkspaceDir = path.join(
      rootDir,
      `ios/${projectName}.xcworkspace`,
    )

    if (fs.existsSync(oldXcworkspaceDir)) {
      renameDirectory(oldXcworkspaceDir, newXcworkspaceDir)
    }

    // 12. 更新 iOS 项目文件中的引用
    const iosProjectFiles = [
      `ios/${projectName}.xcodeproj/project.pbxproj`,
      `ios/${projectName}.xcworkspace/contents.xcworkspacedata`,
      'ios/Podfile',
    ]

    iosProjectFiles.forEach((file) => {
      const filePath = path.join(rootDir, file)
      updateFileContent(filePath, [
        { from: currentConfig.currentIOSProjectName, to: projectName },
      ])
    })
  }

  log.title('🧹 清理缓存')

  // 13. 清理缓存
  try {
    log.info('清理 Metro 缓存...')
    execSync(`${packageManager} run clean`, { stdio: 'ignore' })

    log.info('清理 Android 缓存...')
    execSync('cd android && ./gradlew clean', { stdio: 'ignore' })

    log.info('清理 iOS 缓存...')
    execSync('cd ios && rm -rf build && rm -rf Pods && rm -f Podfile.lock', {
      stdio: 'ignore',
    })

    if (packageManager === 'pnpm') {
      log.info('使用 pnpm 安装 iOS 依赖...')
      execSync('cd ios && pnpm exec pod install', { stdio: 'ignore' })
    } else if (packageManager === 'yarn') {
      log.info('使用 yarn 安装 iOS 依赖...')
      execSync('cd ios && yarn pod install', { stdio: 'ignore' })
    } else {
      log.info('使用 npm 安装 iOS 依赖...')
      execSync('cd ios && pod install', { stdio: 'ignore' })
    }
  } catch (error) {
    log.warning('清理缓存时出现错误，请手动清理')
    log.warning(`错误信息: ${error.message}`)
  }

  log.title('🎉 配置完成！')
  log.success(`项目名称已更新为: ${projectName}`)
  log.success(`包名已更新为: ${defaultPackageName}`)
  log.info('\n下一步:')
  log.info(`1. 运行 ${packageManager} start 启动 Metro`)
  log.info(
    `2. 运行 ${packageManager} run android 或 ${packageManager} run ios 启动应用`,
  )
} catch (error) {
  log.error(`配置过程中出现错误: ${error.message}`)
  log.error(`错误堆栈: ${error.stack}`)
  process.exit(1)
}
