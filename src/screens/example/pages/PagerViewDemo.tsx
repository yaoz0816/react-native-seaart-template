/**
 * @author 曼巴
 * @filename PagerViewDemo.tsx
 * @description PagerView + SeaArtTabSlider + ExpoImageDemo + RNImageDemo 组合演示
 */
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import SeaArtTabSlider from '@/components/ui/SeaArtTabSlider'
import ExpoImageDemo from './ExpoImageDemo'
import RNImageDemo from './RNImageDemo'
import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import { IconButton } from '@/components/ui/SeaArtNavBarView.example'
import { goBack } from '@/navigation'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'

// 标签页配置
const TAB_CONFIG = [
  {
    title: 'Expo Image',
    key: 'expo-image',
    component: ExpoImageDemo,
  },
  {
    title: 'RN Image',
    key: 'rn-image',
    component: RNImageDemo,
  },
]

const PagerViewDemo: React.FC = () => {
  const pagerRef = useRef<PagerView>(null)
  const [currentPage, setCurrentPage] = useState(0)

  // 打印当前页面状态变化
  useEffect(() => {
    console.log('📍 PagerViewDemo: currentPage changed to:', currentPage)
  }, [currentPage])

  // 处理标签切换（点击触发）
  const handleTabChange = useCallback(
    (index: number) => {
      console.log('🔄 PagerViewDemo: handleTabChange called with index:', index)
      console.log('🔄 PagerViewDemo: current page before change:', currentPage)
      console.log('🔄 PagerViewDemo: source: TAB_CLICK')

      // 暂时注释掉页面切换，专注于测试指示器
      setCurrentPage(index)
      setTimeout(() => {
        console.log('🔄 PagerViewDemo: setting pager page to:', index)
        pagerRef.current?.setPage(index)
      }, 0)
    },
    [currentPage],
  )

  // 处理页面滑动（手势触发） - 暂时简化
  const handlePageSelected = useCallback((e: any) => {
    const { position } = e.nativeEvent
    console.log('🔄 PagerViewDemo: page selected, position:', position)
    // 暂时不更新状态，避免与点击测试冲突
  }, [])

  // 渲染页面内容
  const renderPage = useCallback(
    (config: (typeof TAB_CONFIG)[0], index: number) => {
      const PageComponent = config.component

      return (
        <View key={config.key} style={styles.pageContainer}>
          <PageComponent />
        </View>
      )
    },
    [],
  )

  // 获取标签标题数组
  const tabTitles = TAB_CONFIG.map((tab) => tab.title)

  return (
    <SeaArtBasePage>
      <SeaArtNavBarView
        title={'🎉 PagerView 演示'}
        backgroundColor={'#000'}
        leftView={<IconButton icon={'←'} color={'#FFF'} onPress={goBack} />}
      />

      {/* 标签滑动器 */}
      <View style={styles.tabContainer}>
        <SeaArtTabSlider
          tabs={tabTitles}
          activeIndex={currentPage} // 暂时注释掉，测试内部功能
          gradientColors={['#007AFF', '#0056CC']}
          indicatorWidth={'60%'}
          activeTextColor={'#007AFF'}
          inactiveTextColor={'#888'}
          onTabChange={handleTabChange}
        />
      </View>

      {/* 页面内容 */}
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={false}
        offscreenPageLimit={1}
        keyboardDismissMode={'on-drag'}
        orientation={'horizontal'}
        onPageSelected={handlePageSelected}>
        {/* 动态渲染配置的页面 */}
        {TAB_CONFIG.map(renderPage)}
      </PagerView>

      {/* 页面指示器 */}
      {/* <View style={styles.indicatorContainer}>
        {Array.from({ length: TAB_CONFIG.length }).map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentPage && styles.activeDot]}
          />
        ))}
      </View> */}
    </SeaArtBasePage>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 12,
    lineHeight: 22,
  },
  featureList: {
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    lineHeight: 20,
  },
  tabContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dee2e6',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    transform: [{ scale: 1.2 }],
  },
})

export default PagerViewDemo
