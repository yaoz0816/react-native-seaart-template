/**
 * @author 曼巴
 * @filename RNImageDemo.tsx
 * @description RN Image 使用示例
 */
import { MasonryFlashList } from '@shopify/flash-list'
import React, { useCallback, useRef } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useRecommendData } from '../hooks/usePaginatedData'

interface ItemProps {
  item: Common.ListItem
  onPress?: (item: Common.ListItem) => void
}

const ListItem: React.FC<ItemProps> = ({ item, onPress }) => {
  const handlePress = useCallback(() => {
    onPress?.(item)
  }, [item, onPress])

  return (
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      {item.cover && (
        <Image
          source={{ uri: item.cover.url }}
          style={[
            styles.image,
            { aspectRatio: item.cover.width / item.cover.height },
          ]}
          resizeMode={'cover'}
        />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.author?.name}
        </Text>
        {item.description && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
    </Pressable>
  )
}

const RNImageDemo = () => {
  const listRef = useRef(null)

  const [state, actions] = useRecommendData()

  const { loadMore, refresh } = actions

  const currentState = state
  const currentLoadMore = loadMore
  const currentRefresh = refresh

  const handleLoadMore = useCallback(() => {
    if (!currentState.loading && currentState.hasMore) {
      currentLoadMore()
    }
  }, [currentState.loading, currentState.hasMore, currentLoadMore])

  const handleRefresh = useCallback(() => {
    if (!currentState.refreshing) {
      currentRefresh()
    }
  }, [currentState.refreshing, currentRefresh])

  const handleItemPress = useCallback((item: Common.ListItem) => {
    console.log('Item pressed:', item.id)
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Common.ListItem }) => (
      <ListItem item={item} onPress={handleItemPress} />
    ),
    [handleItemPress],
  )

  const keyExtractor = useCallback((item: Common.ListItem) => item.id, [])

  const getItemType = useCallback((item: Common.ListItem) => {
    return item.objType || 'default'
  }, [])

  const ListEmptyComponent = useCallback(() => {
    if (currentState.loading) {
      return null
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>暂无数据</Text>
      </View>
    )
  }, [currentState.loading])

  const getFooterText = useCallback(() => {
    if (currentState.loading) {
      return '加载中...'
    }

    if (!currentState.hasMore) {
      return '没有更多数据了'
    }

    return '上拉加载更多'
  }, [currentState.loading, currentState.hasMore])

  const ListFooterComponent = useCallback(() => {
    if (!currentState.data.length) {
      return null
    }

    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>{getFooterText()}</Text>
      </View>
    )
  }, [currentState.data.length, getFooterText])

  return (
    <View style={styles.container}>
      <MasonryFlashList
        ref={listRef}
        data={currentState.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        numColumns={2}
        estimatedItemSize={200}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        refreshing={currentState.refreshing}
        contentContainerStyle={styles.listContainer}
        drawDistance={200}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 8,
  },
  itemContainer: {
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
})

export default RNImageDemo
