module.exports = {
  root: true,
  // 继承的规则集
  extends: [
    // React Native 基础规则
    '@react-native',
    // React 推荐规则
    'plugin:react/recommended',
    // 支持 React 17+ 的 JSX 转换运行时
    'plugin:react/jsx-runtime',
    // i18next 国际化推荐规则
    'plugin:i18next/recommended',
    // Prettier 格式化规则
    'plugin:prettier/recommended',
    // React Hooks 推荐规则
    'plugin:react-hooks/recommended',
  ],

  // 使用的插件
  plugins: [
    // React Hooks 规则
    'react-hooks',
    // Prettier 插件
    'prettier',
  ],

  rules: {
    // React Hooks 规则
    // 强制 Hooks 规则，确保 Hooks 的正确使用
    'react-hooks/rules-of-hooks': 'error',
    // 强制检查 Hooks 的依赖项完整性
    'react-hooks/exhaustive-deps': 'error',

    // 基础规则
    // 强制使用严格相等
    eqeqeq: 'error',
    // 禁止使用嵌套的三元表达式
    'no-nested-ternary': 'error',
    // 强制所有控制语句使用一致的括号风格
    curly: 'error',

    // React & React Native 规则
    // 禁止使用内联样式，使用警告级别
    'react-native/no-inline-styles': 'warn',
    // 关闭组件显示名称检查
    'react/display-name': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
        noSortAlphabetically: true,
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'always', children: 'never' },
    ],
    'react/jsx-curly-spacing': ['error', { when: 'never' }],
    // 变量重复定义检查
    // 禁止重复声明变量
    'no-redeclare': 'error',
    // 禁止变量覆盖
    // 这里是ESLint有Bug，必须关闭ESLint的no-shadow，然后启用typescript的no-shadow
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // 禁止函数参数重名
    'no-dupe-args': 'error',
    // 禁止对象字面量中出现重复的键
    'no-dupe-keys': 'error',
    // 禁止类成员重复定义
    'no-dupe-class-members': 'error',
    // 禁止重复导入
    'no-duplicate-imports': 'error',

    // TypeScript 未使用变量检查
    // 使用 TypeScript 的未使用变量检查，支持更多选项
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        // 检查所有变量
        vars: 'all',
        // 检查使用后的参数
        args: 'after-used',
        // 允许解构剩余参数
        ignoreRestSiblings: true,
        // 忽略以下划线开头的变量
        varsIgnorePattern: '^_',
        // 忽略以下划线开头的参数
        argsIgnorePattern: '^_',
      },
    ],
    // 关闭 ESLint 原生的未使用变量检查
    'no-unused-vars': 'off',

    // i18n 规则
    // 允许使用字面量字符串
    'i18next/no-literal-string': 'off',

    // 导入限制规则
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['^node:*'],
            message: '\n不要导入任何 node 原生模块\n',
          },
          {
            group: ['^lodash$', '^lodash/*'],
            message: '\n不要直接导入 lodash，请使用 lodash-es 作为替代\n',
          },
          {
            group: ['^lodash-es$'],
            message:
              '\n请使用命名导入方式\n例如：\nimport { chunk } from "lodash-es/chunk"\n',
          },
          {
            group: ['^svgs/*'],
            message: '\n不要导入根目录的 svg 资源，这是 svg 资源的原始文件"\n',
          },
          {
            group: ['*uuid'],
            importNames: ['makeUUID'],
            message:
              '\n不要使用 makeUUID 函数，这个函数仅为创建设备 ID 使用，如果需要根据字符串创建唯一 ID，请使用 makeNanoID 函数\n',
          },
        ],
      },
    ],

    // React PropTypes 规则
    // 在使用 TypeScript 的情况下关闭 prop-types 检查
    'react/prop-types': 'off',
    // 关闭默认 props 定义检查
    'react/require-default-props': 'off',
    // 关闭 props 类型验证检查
    'react/default-props-match-prop-types': 'off',

    // React Memo 相关规则
    // 允许在 memo 中使用函数组件而不检查 prop-types
    'react/function-component-definition': [
      'error',
      {
        // 允许箭头函数和函数声明
        namedComponents: ['arrow-function', 'function-declaration'],
        // 允许箭头函数作为未命名组件
        unnamedComponents: 'arrow-function',
      },
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'multiline-const',
          'multiline-block-like',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'block-like',
          'multiline-const',
          'multiline-block-like',
        ],
        next: '*',
      },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],
  },

  // 添加特定的解析器选项
  settings: {
    react: {
      // 自动检测 React 版本
      version: 'detect',
    },
  },
}
