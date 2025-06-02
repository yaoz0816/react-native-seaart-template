# Zustand 状态管理最佳实践

## 📋 Todo List Demo

这个 Todo List Demo 展示了在 React Native 项目中使用 Zustand 进行状态管理的最佳实践。

## 🏗️ 架构设计

### 1. Store 结构设计

```typescript
// 完整的 Store 类型组合
export type TodoStore = TodoState & TodoActions

// 分离状态和操作的类型定义
export interface TodoState {
  todos: Todo[]
  filter: TodoFilter
  sort: TodoSort
  // ... 更多状态
}

export interface TodoActions {
  addTodo: (text: string) => void
  removeTodo: (id: string) => void
  // ... 更多操作
}
```

**最佳实践点：**
- ✅ 类型安全：完整的 TypeScript 类型定义
- ✅ 分离关注点：状态和操作分别定义
- ✅ 可扩展性：易于添加新的状态和操作

### 2. 中间件使用

```typescript
export const useTodoStore = create<TodoStore>()(
  immer((set, get) => ({
    // store 实现
  }))
)
```

**使用的中间件：**
- **Immer**: 提供不可变状态更新，简化复杂状态操作
- **TypeScript**: 完整的类型支持和智能提示

### 3. 状态更新模式

```typescript
// ✅ 使用 Immer 简化状态更新
addTodo: (text, category = '其他', priority = 'medium') => {
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
    
    // 动态更新分类
    if (category && !state.categories.includes(category)) {
      state.categories.push(category)
    }
  })
  
  // 同步更新统计
  get().updateStats()
}
```

**最佳实践点：**
- ✅ Immer 语法：直接修改 draft 状态
- ✅ 副作用处理：在状态更新后同步统计
- ✅ 参数验证：确保数据有效性

## 🔧 核心功能实现

### 1. CRUD 操作

| 操作 | 方法                 | 说明                   |
| ---- | -------------------- | ---------------------- |
| 创建 | `addTodo()`          | 添加新的 Todo 项       |
| 读取 | `getFilteredTodos()` | 获取过滤后的 Todo 列表 |
| 更新 | `updateTodo()`       | 更新现有 Todo 项       |
| 删除 | `removeTodo()`       | 删除指定 Todo 项       |

### 2. 批量操作

```typescript
toggleAllTodos: () => {
  const { todos } = get()
  const allCompleted = todos.every((item: Todo) => item.completed)
  
  set((state) => {
    state.todos.forEach((item: Todo) => {
      item.completed = !allCompleted
      item.updatedAt = Date.now()
    })
  })
  
  get().updateStats()
}
```

### 3. 过滤和排序

```typescript
getFilteredTodos: () => {
  const { todos, filter, searchQuery, selectedCategory, sort } = get()
  const filtered = filterTodos(todos, filter, searchQuery, selectedCategory)
  return sortTodos(filtered, sort)
}
```

### 4. 实时统计

```typescript
updateStats: () => {
  set((state) => {
    state.stats = calculateStats(state.todos)
  })
}
```

## 🎯 React 组件最佳实践

### 1. 选择性订阅

```typescript
// ✅ 只订阅需要的状态
const todos = useTodoStore(state => state.todos)
const filter = useTodoStore(state => state.filter)
const stats = useTodoStore(state => state.stats)

// ✅ 订阅操作方法
const addTodo = useTodoStore(state => state.addTodo)
const toggleTodo = useTodoStore(state => state.toggleTodo)
```

### 2. 性能优化

```typescript
// ✅ 使用 useMemo 优化计算
const filteredTodos = useMemo(() => {
  return getFilteredTodos()
}, [getFilteredTodos])
```

### 3. 组件职责分离

```typescript
// ✅ 功能组件分离
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  // 单一职责：只渲染单个 Todo 项
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange }) => {
  // 单一职责：只处理过滤逻辑
}
```

## 📊 数据流设计

```
用户交互 → React 组件 → Zustand Actions → 状态更新 → 重新渲染
    ↓                                            ↑
  事件处理 ← UI 反馈 ← Toast 通知 ← 副作用处理 ←────┘
```

## 🛠️ 工具函数

### 1. ID 生成

```typescript
const generateId = (): string => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
```

### 2. 数据验证

```typescript
addTodo: (text, category = '其他', priority = 'medium') => {
  if (!text.trim()) return  // 验证输入
  // ... 处理逻辑
}
```

### 3. 数据导入导出

```typescript
exportTodos: () => {
  const { todos, categories } = get()
  return JSON.stringify({
    todos,
    categories,
    exportedAt: Date.now()
  }, null, 2)
}
```

## 🎨 UI/UX 最佳实践

### 1. 状态反馈
- ✅ 操作成功/失败的 Toast 提示
- ✅ 加载状态显示
- ✅ 空状态提示

### 2. 交互设计
- ✅ 确认对话框（删除操作）
- ✅ 批量操作支持
- ✅ 搜索和过滤功能

### 3. 视觉设计
- ✅ 优先级颜色标识
- ✅ 完成状态视觉反馈
- ✅ 分类标签显示

## 🔍 调试和开发

### 1. 日志中间件
项目集成了日志中间件，在开发模式下可以查看状态变化：

```typescript
// 自动应用日志中间件
import { create } from '@/utils/zustand/create'
```

### 2. DevTools 支持
可以通过 Redux DevTools 查看状态变化（如果启用）。

## 📚 学习要点

1. **类型安全**: 完整的 TypeScript 支持
2. **性能优化**: 选择性订阅和 memoization
3. **状态组织**: 清晰的状态结构设计
4. **中间件使用**: Immer 简化状态更新
5. **组件设计**: 单一职责和可复用性
6. **用户体验**: 完整的交互反馈

## 🚀 扩展建议

1. **持久化存储**: 集成 MMKV 实现数据持久化
2. **网络同步**: 添加服务端数据同步
3. **离线支持**: 实现离线数据缓存
4. **主题切换**: 添加暗色模式支持
5. **国际化**: 多语言支持

这个 Demo 为团队提供了一个完整的 Zustand 状态管理参考实现，可以作为其他功能模块的开发模板。 