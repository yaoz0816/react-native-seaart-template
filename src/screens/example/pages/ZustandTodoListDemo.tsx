/**
 * @author 曼巴
 * @filename TodoListDemo.tsx
 * @date 2025-05-31 星期六
 * @description Todo列表Demo - 展示Zustand最佳实践
 */

import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native'
import { useTodoStore, Todo, TodoFilter } from '@/stores/todoStore'
import { Toast } from '@/utils/toast'
import SeaArtBasePage from '@/components/ui/SeaArtBasePage'
import SeaArtNavBarView from '@/components/ui/SeaArtNavBarView'
import { goBack } from '@/navigation/configs/utils'
import { useColors } from '@/theme'
import { IconButton } from '@/components/ui/SeaArtNavBarView.example'
import { tw } from '@/utils/twcss/twrnc'

// Todo项组件
interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return '#ff4757'
      case 'medium':
        return '#ffa502'
      case 'low':
        return '#2ed573'
      default:
        return '#747d8c'
    }
  }

  const getPriorityLabel = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return '高'
      case 'medium':
        return '中'
      case 'low':
        return '低'
      default:
        return '中'
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleTogglePress = () => {
    console.log('TodoItem toggle pressed for:', todo.id)
    onToggle(todo.id)
  }

  const handleEditPress = () => {
    console.log('TodoItem edit pressed for:', todo.id)
    onEdit(todo)
  }

  const handleDeletePress = () => {
    console.log('TodoItem delete pressed for:', todo.id)
    onDelete(todo.id)
  }

  return (
    <View style={[styles.todoItem, todo.completed && styles.completedTodo]}>
      <Pressable style={styles.todoContent} onPress={handleTogglePress}>
        <View style={styles.todoCheckbox}>
          <Text style={styles.checkboxText}>{todo.completed ? '✓' : '○'}</Text>
        </View>

        <View style={styles.todoInfo}>
          <Text
            style={[styles.todoText, todo.completed && styles.completedText]}>
            {todo.text}
          </Text>

          <View style={styles.todoMeta}>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(todo.priority) },
              ]}>
              <Text style={styles.priorityText}>
                {getPriorityLabel(todo.priority)}
              </Text>
            </View>

            <Text style={styles.categoryText}>{todo.category}</Text>
            <Text style={styles.dateText}>{formatDate(todo.createdAt)}</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.todoActions}>
        <Pressable style={styles.actionButton} onPress={handleEditPress}>
          <Text style={styles.actionText}>编辑</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDeletePress}>
          <Text style={[styles.actionText, styles.deleteText]}>删除</Text>
        </Pressable>
      </View>
    </View>
  )
}

// 主组件
const ZustandTodoListDemo: React.FC = () => {
  // Zustand store hooks - 统一使用箭头函数格式
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)
  const sort = useTodoStore((state) => state.sort)
  const searchQuery = useTodoStore((state) => state.searchQuery)
  const selectedCategory = useTodoStore((state) => state.selectedCategory)
  const categories = useTodoStore((state) => state.categories)
  const stats = useTodoStore((state) => state.stats)

  // Zustand actions - 统一使用箭头函数格式
  const addTodo = useTodoStore((state) => state.addTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const updateTodo = useTodoStore((state) => state.updateTodo)
  const setFilter = useTodoStore((state) => state.setFilter)

  const setSearchQuery = useTodoStore((state) => state.setSearchQuery)
  const toggleAllTodos = useTodoStore((state) => state.toggleAllTodos)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)
  const removeAllTodos = useTodoStore((state) => state.removeAllTodos)
  const exportTodos = useTodoStore((state) => state.exportTodos)
  const updateStats = useTodoStore((state) => state.updateStats)

  // 本地状态
  const [newTodoText, setNewTodoText] = useState('')
  const [newTodoCategory, setNewTodoCategory] = useState('工作')

  const [newTodoPriority, setNewTodoPriority] =
    useState<Todo['priority']>('medium')

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  // 获取过滤后的todos（修复依赖问题）
  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) => {
        // 状态过滤
        const statusMatch =
          filter === 'all' ||
          (filter === 'active' && !todo.completed) ||
          (filter === 'completed' && todo.completed)

        // 搜索过滤
        const searchMatch =
          !searchQuery ||
          todo.text.toLowerCase().includes(searchQuery.toLowerCase())

        // 分类过滤
        const categoryMatch =
          !selectedCategory || todo.category === selectedCategory

        return statusMatch && searchMatch && categoryMatch
      })
      .sort((a, b) => {
        switch (sort) {
          case 'createdAt':
            return b.createdAt - a.createdAt
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 }
            return priorityOrder[b.priority] - priorityOrder[a.priority]
          case 'dueDate':
            if (!a.dueDate && !b.dueDate) {
              return 0
            }

            if (!a.dueDate) {
              return 1
            }

            if (!b.dueDate) {
              return -1
            }

            return a.dueDate - b.dueDate
          case 'text':
            return a.text.localeCompare(b.text)
          default:
            return 0
        }
      })
  }, [todos, filter, searchQuery, selectedCategory, sort])

  // 初始化统计信息
  React.useEffect(() => {
    updateStats()

    // 添加一些示例数据（仅在没有数据时）
    if (todos.length === 0) {
      addTodo('完成项目需求文档', '工作', 'high')
      addTodo('学习React Native新特性', '学习', 'medium')
      addTodo('买菜做饭', '生活', 'low')
      addTodo('整理代码仓库', '工作', 'medium')
      addTodo('写技术博客', '学习', 'low')
    }
  }, [updateStats, addTodo, todos.length])

  // 添加新Todo
  const handleAddTodo = () => {
    if (!newTodoText.trim()) {
      Toast.error('请输入Todo内容')
      return
    }

    addTodo(newTodoText, newTodoCategory, newTodoPriority)
    setNewTodoText('')
    setNewTodoCategory('工作')
    setNewTodoPriority('high')
    Toast.success('添加成功')
  }

  // 删除Todo
  const handleDeleteTodo = (id: string) => {
    console.log('Deleting todo with id:', id)
    removeTodo(id)
    Toast.success('删除成功')

    // Alert.alert('确认删除', '确定要删除这个Todo吗？', [
    //   { text: '取消', style: 'cancel' },
    //   {
    //     text: '删除',
    //     style: 'destructive',
    //     onPress: () => {
    //       removeTodo(id)
    //       Toast.success('删除成功')
    //     },
    //   },
    // ])
  }

  // 编辑Todo
  const handleEditTodo = (todo: Todo) => {
    console.log('Editing todo:1111', todo)

    setEditingTodo({ ...todo })
    setTimeout(() => {
      setEditModalVisible(true)
    }, 0)
  }

  // 切换Todo状态
  const handleToggleTodo = (id: string) => {
    console.log('Toggling todo with id:', id)
    toggleTodo(id)
  }

  // 保存编辑
  const handleSaveEdit = () => {
    if (!editingTodo) {
      return
    }

    updateTodo(editingTodo.id, {
      text: editingTodo.text,
      category: editingTodo.category,
      priority: editingTodo.priority,
    })

    setEditModalVisible(false)
    setEditingTodo(null)
    Toast.success('更新成功')
  }

  // 批量操作
  const handleBatchAction = (
    action: 'toggleAll' | 'clearCompleted' | 'removeAll',
  ) => {
    switch (action) {
      case 'toggleAll':
        toggleAllTodos()
        Toast.success('批量切换完成')
        break
      case 'clearCompleted':
        if (stats.completed === 0) {
          Toast.error('没有已完成的Todo')
          return
        }

        Alert.alert(
          '清除已完成',
          `确定要删除 ${stats.completed} 个已完成的Todo吗？`,
          [
            { text: '取消', style: 'cancel' },
            {
              text: '确定',
              onPress: () => {
                clearCompleted()
                Toast.success('清除完成')
              },
            },
          ],
        )
        break
      case 'removeAll':
        if (stats.total === 0) {
          Toast.error('没有Todo可删除')
          return
        }

        Alert.alert('清空所有', `确定要删除所有 ${stats.total} 个Todo吗？`, [
          { text: '取消', style: 'cancel' },
          {
            text: '确定',
            style: 'destructive',
            onPress: () => {
              removeAllTodos()
              Toast.success('清空完成')
            },
          },
        ])
        break
    }
  }

  // 导出数据
  const handleExport = () => {
    try {
      const jsonData = exportTodos()
      console.log('导出的数据:', jsonData)
      Toast.success('数据已导出到控制台')
    } catch (error) {
      Toast.error('导出失败')
    }
  }

  const colors = useColors()

  return (
    <>
      <SeaArtBasePage>
        <SeaArtNavBarView
          title={'📝 Todo List Demo'}
          backgroundColor={colors.background}
          titleStyle={tw(`text-[${colors.text.primary}]`)}
          leftView={
            <IconButton
              icon={'←'}
              color={colors.text.primary}
              onPress={goBack}
            />
          }
          rightView={
            <Pressable onPress={handleExport}>
              <Text style={tw(`text-[${colors.text.primary}]`)}>导出</Text>
            </Pressable>
          }
        />

        <ScrollView style={styles.container}>
          {/* 统计信息 */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>总计</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.active}</Text>
              <Text style={styles.statLabel}>待办</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.completed}</Text>
              <Text style={styles.statLabel}>已完成</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.highPriority}</Text>
              <Text style={styles.statLabel}>高优先级</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {stats.total > 0
                  ? ((stats.completed / stats.total) * 100).toFixed(1)
                  : '0'}
                %
              </Text>
              <Text style={styles.statLabel}>完成率</Text>
            </View>
          </View>

          {/* 添加新Todo */}
          <View style={styles.addTodoContainer}>
            <TextInput
              multiline
              style={styles.addTodoInput}
              placeholder={'添加新的Todo...'}
              value={newTodoText}
              onChangeText={setNewTodoText}
            />

            <View style={styles.addTodoOptions}>
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>分类:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.optionButtons}>
                    {categories.map((category) => (
                      <Pressable
                        key={category}
                        style={[
                          styles.optionButton,
                          newTodoCategory === category && styles.activeOption,
                        ]}
                        onPress={() => setNewTodoCategory(category)}>
                        <Text
                          style={[
                            styles.optionText,
                            newTodoCategory === category &&
                              styles.activeOptionText,
                          ]}>
                          {category}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>优先级:</Text>
                <View style={styles.optionButtons}>
                  {[
                    { key: 'high', label: '高', color: '#ff4757' },
                    { key: 'medium', label: '中', color: '#ffa502' },
                    { key: 'low', label: '低', color: '#2ed573' },
                  ].map((priority) => (
                    <Pressable
                      key={priority.key}
                      style={[
                        styles.optionButton,
                        { borderColor: priority.color },
                        newTodoPriority === priority.key && {
                          backgroundColor: priority.color,
                        },
                      ]}
                      onPress={() =>
                        setNewTodoPriority(priority.key as Todo['priority'])
                      }>
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color:
                              newTodoPriority === priority.key
                                ? '#fff'
                                : priority.color,
                          },
                        ]}>
                        {priority.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            <Pressable style={styles.addButton} onPress={handleAddTodo}>
              <Text style={styles.addButtonText}>添加 Todo</Text>
            </Pressable>
          </View>

          {/* 简化的过滤器 */}
          <View style={styles.filterContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={'搜索Todo...'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterRow}>
                {[
                  { key: 'all' as TodoFilter, label: '全部' },
                  { key: 'active' as TodoFilter, label: '待办' },
                  { key: 'completed' as TodoFilter, label: '已完成' },
                ].map((option) => (
                  <Pressable
                    key={option.key}
                    style={[
                      styles.filterButton,
                      filter === option.key && styles.activeFilter,
                    ]}
                    onPress={() => setFilter(option.key)}>
                    <Text
                      style={[
                        styles.filterText,
                        filter === option.key && styles.activeFilterText,
                      ]}>
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* 批量操作 */}
          <View style={styles.batchActionsContainer}>
            <Pressable
              style={styles.batchButton}
              onPress={() => handleBatchAction('toggleAll')}>
              <Text style={styles.batchButtonText}>全选/取消</Text>
            </Pressable>

            <Pressable
              style={[styles.batchButton, styles.warningButton]}
              onPress={() => handleBatchAction('clearCompleted')}>
              <Text style={styles.batchButtonText}>清除已完成</Text>
            </Pressable>

            <Pressable
              style={[styles.batchButton, styles.dangerButton]}
              onPress={() => handleBatchAction('removeAll')}>
              <Text style={styles.batchButtonText}>清空所有</Text>
            </Pressable>
          </View>

          {/* Todo列表 */}
          <View style={styles.todoListContainer}>
            {filteredTodos.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchQuery
                    ? '没有找到匹配的Todo'
                    : '还没有Todo，快来添加一个吧！'}
                </Text>
              </View>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SeaArtBasePage>

      {/* 编辑弹窗 - 使用View替换Modal */}
      {editModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>编辑 Todo</Text>

            {editingTodo && (
              <>
                {/* 编辑文本 */}
                <TextInput
                  multiline
                  style={styles.modalInput}
                  placeholder={'编辑Todo内容...'}
                  value={editingTodo.text}
                  onChangeText={(text) =>
                    setEditingTodo({ ...editingTodo, text })
                  }
                />

                {/* 编辑分类 */}
                <View style={styles.modalOptionGroup}>
                  <Text style={styles.modalOptionLabel}>分类:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.modalOptionButtons}>
                      {categories.map((category) => (
                        <Pressable
                          key={category}
                          style={[
                            styles.modalOptionButton,
                            editingTodo.category === category &&
                              styles.modalActiveOption,
                          ]}
                          onPress={() =>
                            setEditingTodo({ ...editingTodo, category })
                          }>
                          <Text
                            style={[
                              styles.modalOptionText,
                              editingTodo.category === category &&
                                styles.modalActiveOptionText,
                            ]}>
                            {category}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                </View>

                {/* 编辑优先级 */}
                <View style={styles.modalOptionGroup}>
                  <Text style={styles.modalOptionLabel}>优先级:</Text>
                  <View style={styles.modalOptionButtons}>
                    {[
                      { key: 'high', label: '高', color: '#ff4757' },
                      { key: 'medium', label: '中', color: '#ffa502' },
                      { key: 'low', label: '低', color: '#2ed573' },
                    ].map((priority) => (
                      <Pressable
                        key={priority.key}
                        style={[
                          styles.modalOptionButton,
                          { borderColor: priority.color },
                          editingTodo.priority === priority.key && {
                            backgroundColor: priority.color,
                          },
                        ]}
                        onPress={() =>
                          setEditingTodo({
                            ...editingTodo,
                            priority: priority.key as Todo['priority'],
                          })
                        }>
                        <Text
                          style={[
                            styles.modalOptionText,
                            {
                              color:
                                editingTodo.priority === priority.key
                                  ? '#fff'
                                  : priority.color,
                            },
                          ]}>
                          {priority.label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <Pressable
                    style={styles.modalButton}
                    onPress={() => {
                      setEditModalVisible(false)
                      setEditingTodo(null)
                    }}>
                    <Text style={styles.modalButtonText}>取消</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.modalButton, styles.saveButton]}
                    onPress={handleSaveEdit}>
                    <Text
                      style={[styles.modalButtonText, styles.saveButtonText]}>
                      保存
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  navButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // 统计信息样式
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },

  // 添加Todo样式
  addTodoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  addTodoInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 44,
    textAlignVertical: 'top',
  },
  addTodoOptions: {
    marginTop: 12,
  },
  optionGroup: {
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  optionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  activeOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#495057',
  },
  activeOptionText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // 过滤器样式
  filterContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#495057',
  },
  activeFilterText: {
    color: '#fff',
  },

  // 批量操作样式
  batchActionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    gap: 12,
  },
  batchButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  warningButton: {
    backgroundColor: '#ffc107',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  batchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Todo列表样式
  todoListContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  completedTodo: {
    backgroundColor: '#f8f9fa',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCheckbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    fontSize: 18,
    color: '#007AFF',
  },
  todoInfo: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  todoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  categoryText: {
    fontSize: 12,
    color: '#6c757d',
  },
  dateText: {
    fontSize: 12,
    color: '#adb5bd',
  },
  todoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
  },
  deleteButton: {
    backgroundColor: '#f8d7da',
  },
  actionText: {
    fontSize: 12,
    color: '#495057',
  },
  deleteText: {
    color: '#721c24',
  },

  // 空状态样式
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },

  // 模态框样式
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalOptionGroup: {
    marginBottom: 12,
  },
  modalOptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  modalOptionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalOptionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  modalActiveOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#495057',
  },
  modalActiveOptionText: {
    color: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
  },
})

export default ZustandTodoListDemo
