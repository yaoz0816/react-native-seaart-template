/**
 * @description React Native 应用入口文件
 * @author SeaArt Team
 * @copyright Copyright (C), SeaArt CO.Ltd 2025.
 */

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import AppRoot from './src/AppRoot'

// 注册应用主组件
AppRegistry.registerComponent(appName, () => AppRoot)

/* 
📝 新人须知：
1. 此文件是应用的最初入口点，原生系统会首先加载这里
2. AppRoot 是应用的根组件，包含了导航、状态管理等核心功能
3. 应用名称从 app.json 中读取，确保与原生配置一致
4. __DEV__ 是 RN 提供的开发环境标识
5. LogBox 用于控制开发时的警告显示
6. ErrorUtils 提供全局错误处理能力
*/
