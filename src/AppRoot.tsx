/**
 * @author 曼巴
 * @filename AppRoot.tsx
 * @date 2025-05-27 星期二
 * @description 应用根组件 - 包含全局配置、导航、状态管理等
 */

import React from 'react'
import ErrorBoundary from './components/common/ErrorBoundary'
import { AppNavigator } from './navigation'
import SeaArtProviderToast from '@/components/ui/SeaArtProviderToast'
import { ThemeProvider } from '@/theme'

const AppRoot: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SeaArtProviderToast>
          <AppNavigator />
        </SeaArtProviderToast>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default AppRoot
