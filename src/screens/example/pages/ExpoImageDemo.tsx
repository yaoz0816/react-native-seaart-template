/**
 * @author 曼巴
 * @filename ExpoImageDemo.tsx
 * @description Expo Image 使用示例
 */
import { useRecommendData } from '@/screens/example/hooks/usePaginatedData'
import { MasonryFlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import React, { useCallback, useRef, useMemo } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface ItemProps {
  item: Common.ListItem
  onPress?: (item: Common.ListItem) => void
}

const ExpoImageListItem: React.FC<ItemProps> = ({ item, onPress }) => {
  const aspectRatio = item.cover ? item.cover.width / item.cover.height : 1

  const handlePress = useCallback(() => {
    onPress?.(item)
  }, [item, onPress])

  const placeholder =
    'https://via.placeholder.com/300x200/F0F0F0/CCCCCC?text=Loading...'

  return (
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      {item.cover && (
        <View style={styles.imageContainer}>
          <Image
            source={item.cover?.url}
            placeholder={placeholder}
            style={[styles.image, aspectRatio ? { aspectRatio } : {}]}
            contentFit={'cover'}
            cachePolicy={'memory-disk'}
            priority={'high'}
            recyclingKey={item.cover?.url}
            transition={200}
          />
        </View>
      )}

      {/* 内容信息 */}
      <View style={styles.contentContainer}>
        <View style={styles.authorContainer}>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{item.author?.name || '匿名'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const ExpoImageDemo: React.FC = () => {
  const listRef = useRef(null)

  const [state, actions] = useRecommendData()
  const { data, loading, refreshing, hasMore } = state
  const { loadMore, refresh } = actions

  // 数据去重处理，防止重复显示
  const displayData = useMemo(() => {
    if (!data || data.length === 0) {
      return []
    }

    // 使用 Map 来去重，以 id 为键
    const uniqueMap = new Map()
    data.forEach((item) => {
      if (item.id && !uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item)
      }
    })

    const uniqueData = Array.from(uniqueMap.values())
    console.log('📊 Data deduplication:', {
      originalCount: data.length,
      uniqueCount: uniqueData.length,
      duplicateCount: data.length - uniqueData.length,
    })

    return uniqueData
  }, [data])

  const getItemType = useCallback((item: Common.ListItem) => {
    return item.objType || 'default'
  }, [])

  const renderItem = useCallback(({ item }: { item: Common.ListItem }) => {
    return (
      <ExpoImageListItem
        item={item}
        onPress={() => {
          Alert.alert(
            '项目详情',
            `标题: ${item.title}\n作者: ${item.author?.name || '未知'}\n类型: ${
              item.objType
            }`,
            [{ text: '确定' }],
          )
        }}
      />
    )
  }, [])

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadMore()
    }
  }, [hasMore, loading, loadMore])

  const handleRefresh = useCallback(() => {
    refresh()
  }, [refresh])

  // 确保keyExtractor返回唯一值，添加索引作为备用
  const keyExtractor = useCallback((item: Common.ListItem, index: number) => {
    return item.id ? `${item.id}` : `item_${index}_${Date.now()}`
  }, [])

  const ListEmptyComponent = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size={'large'} color={'#007AFF'} />
          <Text style={styles.emptyText}>加载中...</Text>
        </View>
      )
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>暂无数据</Text>
        <Text style={styles.emptySubText}>请检查网络连接或稍后重试</Text>
        <Pressable style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>重新加载</Text>
        </Pressable>
      </View>
    )
  }, [loading, handleRefresh])

  const ListFooterComponent = useCallback(() => {
    if (!displayData.length) {
      return null
    }

    // 获取底部提示文本
    const getFooterText = () => {
      if (loading) {
        return '加载中...'
      }

      if (hasMore) {
        return '上拉加载更多'
      }

      return '没有更多数据了'
    }

    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>{getFooterText()}</Text>
      </View>
    )
  }, [displayData.length, loading, hasMore])

  return (
    <View style={styles.container}>
      <MasonryFlashList
        ref={listRef}
        data={displayData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        refreshing={refreshing}
        estimatedItemSize={250}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        drawDistance={300}
        removeClippedSubviews={true}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
      />
    </View>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  listContainer: {
    padding: 8,
  },
  itemContainer: {
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#6c757d',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorText: {
    fontSize: 32,
    marginBottom: 4,
    opacity: 0.8,
  },
  errorSubText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  contentContainer: {
    padding: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
    justifyContent: 'center',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  itemType: {
    fontSize: 10,
    color: '#6c757d',
    marginTop: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 16,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#6c757d',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#adb5bd',
    textAlign: 'center',
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
  },
  headerBanner: {
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
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
    textAlign: 'center',
  },
  bannerButton: {
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  retryButton: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginTop: 12,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  testImageContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  testImageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  testImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#f8f9fa',
  },
  retryImageButton: {
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    marginTop: 8,
  },
  retryImageButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  resetButton: {
    padding: 8,
    backgroundColor: '#6c757d',
    borderRadius: 6,
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
})

export default ExpoImageDemo
