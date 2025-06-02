const resolverConfig = {
  root: ['./'],
  extensions: ['.js', '.ts', '.tsx', '.tsx', '.json'],
  alias: {
    '@': './src',
  },
}

const importConfig = {
  libraryName: 'ahooks',
  // 是否需要驼峰转短线
  camel2DashComponentName: false,
  // 是否需要驼峰转下划线
  camel2UnderlineComponentName: false,
}

module.exports = {
  presets: ['@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    ['module-resolver', resolverConfig],
    ['import', importConfig],
    'react-native-reanimated/plugin',
  ],
}
