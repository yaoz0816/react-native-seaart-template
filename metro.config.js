/**
 * Metro 配置文件
 * https://reactnative.dev/docs/metro
 *
 * 该配置文件处理React Native项目的打包和转换规则
 *
 * @type {import('metro-config').MetroConfig}
 */

// 导入必要的依赖
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const path = require('path')
const os = require('os')

const { withSentryConfig } = require('@sentry/react-native/metro')

// 项目根目录路径
const ROOT_FOLDER = path.resolve(__dirname, '.')
const config = getDefaultConfig(__dirname)

// 获取默认配置
const defaultConfig = withSentryConfig(config)
const { assetExts, sourceExts } = defaultConfig.resolver

// 计算可用的工作线程数
const AVAILABLE_WORKERS = Math.floor(os.cpus().length)

// 自定义Metro配置
const customConfig = {
  // 项目根目录设置
  projectRoot: ROOT_FOLDER,

  // 全局最大工作线程数
  maxWorkers: AVAILABLE_WORKERS,

  // 转换器配置
  transformer: {
    // 配置SVG转换器
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),

    // 转换选项
    getTransformOptions: async () => ({
      transform: {
        inlineRequires: true,
      },
    }),
  },

  // 解析器配置
  resolver: {
    // 从资源扩展名列表中移除SVG
    assetExts: assetExts.filter((ext) => ext !== 'svg'),

    // 将SVG添加到源代码扩展名列表
    sourceExts: [...sourceExts, 'svg'],
  },
}

// 合并默认配置和自定义配置并导出
module.exports = mergeConfig(defaultConfig, customConfig)
