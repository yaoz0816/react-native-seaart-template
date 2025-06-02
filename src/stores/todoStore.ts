/**
 * @author 曼巴
 * @filename todoStore.ts
 * @date 2025-05-31 星期六
 * @description Todo列表状态管理 - Zustand最佳实践示例
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// Todo 数据类型定义
export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: number
  updatedAt: number
  dueDate?: number
}

// 过滤器类型
export type TodoFilter = 'all' | 'active' | 'completed'
export type TodoSort = 'createdAt' | 'priority' | 'dueDate' | 'text'

// Store 状态类型
export interface TodoState {
  todos: Todo[]
  filter: TodoFilter
  sort: TodoSort
  searchQuery: string
  selectedCategory: string
  categories: string[]

  // 统计信息
  stats: {
    total: number
    completed: number
    active: number
    highPriority: number
  }
}

// Store 操作类型
export interface TodoActions {
  // 基础 CRUD 操作
  addTodo: (
    text: string,
    category?: string,
    priority?: Todo['priority'],
  ) => void
  removeTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (
    id: string,
    updates: Partial<Omit<Todo, 'id' | 'createdAt'>>,
  ) => void

  // 批量操作
  toggleAllTodos: () => void
  clearCompleted: () => void
  removeAllTodos: () => void

  // 过滤和排序
  setFilter: (filter: TodoFilter) => void
  setSort: (sort: TodoSort) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void

  // 分类管理
  addCategory: (category: string) => void
  removeCategory: (category: string) => void

  // 工具方法
  getTodoById: (id: string) => Todo | undefined
  getFilteredTodos: () => Todo[]
  updateStats: () => void
  exportTodos: () => string
  importTodos: (jsonData: string) => boolean
}

// 完整的 Store 类型
export type TodoStore = TodoState & TodoActions

// 生成唯一ID
const generateId = (): string => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 默认分类
const DEFAULT_CATEGORIES = ['工作', '生活', '学习', '其他']

// 创建初始状态
const createInitialState = (): TodoState => ({
  todos: [],
  filter: 'all',
  sort: 'createdAt',
  searchQuery: '',
  selectedCategory: '',
  categories: DEFAULT_CATEGORIES,
  stats: {
    total: 0,
    completed: 0,
    active: 0,
    highPriority: 0,
  },
})

// 计算统计信息
const calculateStats = (todos: Todo[]) => ({
  total: todos.length,
  completed: todos.filter((todo: Todo) => todo.completed).length,
  active: todos.filter((todo: Todo) => !todo.completed).length,
  highPriority: todos.filter((todo: Todo) => todo.priority === 'high').length,
})

// 过滤Todo列表
const filterTodos = (
  todos: Todo[],
  filter: TodoFilter,
  searchQuery: string,
  selectedCategory: string,
): Todo[] => {
  return todos.filter((todo: Todo) => {
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
}

// 排序Todo列表
const sortTodos = (todos: Todo[], sort: TodoSort): Todo[] => {
  return [...todos].sort((a, b) => {
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
}

// 创建 Todo Store
export const useTodoStore = create<TodoStore>()(
  immer((set, get) => ({
    ...createInitialState(),

    // 基础 CRUD 操作
    addTodo: (text, category = '其他', priority = 'medium') => {
      if (!text.trim()) {
        return
      }

      set((state) => {
        const newTodo: Todo = {
          id: generateId(),
          text: text.trim(),
          completed: false,
          priority,
          category,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        state.todos.push(newTodo)

        // 添加新分类
        if (category && !state.categories.includes(category)) {
          state.categories.push(category)
        }

        // 同步更新统计
        state.stats = calculateStats(state.todos)
      })
    },

    removeTodo: (id) => {
      console.log('removeTodo called with id:', id)
      set((state) => {
        const index = state.todos.findIndex((item: Todo) => item.id === id)
        console.log('Found index:', index)

        if (index !== -1) {
          const removedTodo = state.todos.splice(index, 1)
          console.log('Removed todo:', removedTodo[0])
        }

        // 同步更新统计
        state.stats = calculateStats(state.todos)
        console.log('Updated stats after removal:', state.stats)
      })
    },

    toggleTodo: (id) => {
      console.log('toggleTodo called with id:', id)
      set((state) => {
        const targetTodo = state.todos.find((item: Todo) => item.id === id)
        console.log('Found todo:', targetTodo)

        if (targetTodo) {
          targetTodo.completed = !targetTodo.completed
          targetTodo.updatedAt = Date.now()
          console.log('Updated todo completed status to:', targetTodo.completed)
        }

        // 同步更新统计
        state.stats = calculateStats(state.todos)
        console.log('Updated stats:', state.stats)
      })
    },

    updateTodo: (id, updates) => {
      console.log('updateTodo called with id:', id, 'updates:', updates)
      set((state) => {
        const targetTodo = state.todos.find((item: Todo) => item.id === id)

        if (targetTodo) {
          Object.assign(targetTodo, {
            ...updates,
            updatedAt: Date.now(),
          })

          // 添加新分类
          if (
            updates.category &&
            !state.categories.includes(updates.category)
          ) {
            state.categories.push(updates.category)
          }

          console.log('Updated todo:', targetTodo)
        }

        // 同步更新统计
        state.stats = calculateStats(state.todos)
      })
    },

    // 批量操作
    toggleAllTodos: () => {
      set((state) => {
        const allCompleted = state.todos.every((item: Todo) => item.completed)

        state.todos.forEach((item: Todo) => {
          item.completed = !allCompleted
          item.updatedAt = Date.now()
        })

        // 同步更新统计
        state.stats = calculateStats(state.todos)
      })
    },

    clearCompleted: () => {
      set((state) => {
        state.todos = state.todos.filter((item: Todo) => !item.completed)

        // 同步更新统计
        state.stats = calculateStats(state.todos)
      })
    },

    removeAllTodos: () => {
      set((state) => {
        state.todos = []

        // 同步更新统计
        state.stats = calculateStats(state.todos)
      })
    },

    // 过滤和排序
    setFilter: (filter) => {
      set((state) => {
        state.filter = filter
      })
    },

    setSort: (sort) => {
      set((state) => {
        state.sort = sort
      })
    },

    setSearchQuery: (query) => {
      set((state) => {
        state.searchQuery = query
      })
    },

    setSelectedCategory: (category) => {
      set((state) => {
        state.selectedCategory = category
      })
    },

    // 分类管理
    addCategory: (category) => {
      if (!category.trim()) {
        return
      }

      set((state) => {
        const trimmedCategory = category.trim()

        if (!state.categories.includes(trimmedCategory)) {
          state.categories.push(trimmedCategory)
        }
      })
    },

    removeCategory: (category) => {
      set((state) => {
        // 移除分类
        state.categories = state.categories.filter(
          (cat: string) => cat !== category,
        )

        // 更新使用该分类的todos
        state.todos.forEach((item: Todo) => {
          if (item.category === category) {
            item.category = '其他'
            item.updatedAt = Date.now()
          }
        })

        // 同步更新统计
        state.stats = calculateStats(state.todos)
      })
    },

    // 工具方法
    getTodoById: (id) => {
      return get().todos.find((item: Todo) => item.id === id)
    },

    getFilteredTodos: () => {
      const { todos, filter, searchQuery, selectedCategory, sort } = get()
      const filtered = filterTodos(todos, filter, searchQuery, selectedCategory)
      return sortTodos(filtered, sort)
    },

    updateStats: () => {
      set((state) => {
        state.stats = calculateStats(state.todos)
      })
    },

    exportTodos: () => {
      const { todos, categories } = get()
      return JSON.stringify(
        {
          todos,
          categories,
          exportedAt: Date.now(),
        },
        null,
        2,
      )
    },

    importTodos: (jsonData) => {
      try {
        const data = JSON.parse(jsonData)

        if (!data.todos || !Array.isArray(data.todos)) {
          return false
        }

        set((state) => {
          state.todos = data.todos.map((item: any) => ({
            ...item,
            id: item.id || generateId(),
            createdAt: item.createdAt || Date.now(),
            updatedAt: item.updatedAt || Date.now(),
          }))

          if (data.categories && Array.isArray(data.categories)) {
            state.categories = [
              ...new Set([...DEFAULT_CATEGORIES, ...data.categories]),
            ]
          }

          // 同步更新统计
          state.stats = calculateStats(state.todos)
        })

        return true
      } catch (error) {
        console.error('导入失败:', error)
        return false
      }
    },
  })),
)
