# 网络库重构迁移指南

## 概述

我们对网络库进行了重大重构，将原来的单一巨大文件（979行）拆分成了多个模块化文件，提高了代码的可维护性和可读性。

## 新的文件结构

```
src/utils/http/
├── index.ts          # 统一导出入口
├── types.ts          # 类型定义
├── errors.ts         # 错误处理
├── token.ts          # Token管理
├── cache.ts          # 缓存管理
├── deduplication.ts  # 请求去重
├── metrics.ts        # 性能监控
├── config.ts         # 配置管理
├── interceptors.ts   # 拦截器
├── utils.ts          # 重试逻辑
├── request-new.ts    # 主要请求方法
└── request.ts        # 原始文件（已备份）
```

## 如何迁移

### 1. 基础使用方式（无变化）

对于基础使用，API 保持不变：

```typescript
// ✅ 这些用法保持不变
import { get, post, put, del } from '@/utils/http'

// 或者使用默认导出
import httpRequest from '@/utils/http'
```

### 2. 导入变化

#### 之前的导入方式

```typescript
// ❌ 旧的导入方式（已废弃）
import request, {
  ApiError,
  ErrorType,
  setToken,
  clearCache,
} from '@/utils/http/request'
```

#### 新的导入方式

```typescript
// ✅ 新的导入方式
import {
  get,
  post,
  ApiError,
  ErrorType,
  setToken,
  clearCache,
} from '@/utils/http'

// 或者按需导入
import { setToken, getToken } from '@/utils/http/token'
import { clearCache, getCacheStats } from '@/utils/http/cache'
```

### 3. 功能模块划分

#### Token 管理

```typescript
// 从 token.ts 导入
import { setToken, getToken, clearToken, hasToken } from '@/utils/http/token'
```

#### 缓存管理

```typescript
// 从 cache.ts 导入
import { clearCache, clearCacheByKey, getCacheStats } from '@/utils/http/cache'
```

#### 性能监控

```typescript
// 从 metrics.ts 导入
import {
  getMetrics,
  clearMetrics,
  getPerformanceSummary,
} from '@/utils/http/metrics'
```

#### 错误处理

```typescript
// 从 errors.ts 导入
import { ApiError, createApiError, handleApiError } from '@/utils/http/errors'
```

### 4. 实际迁移步骤

#### 步骤 1: 备份原始文件

原始的 `request.ts` 文件已经备份，新的功能在 `request-new.ts` 中实现。

#### 步骤 2: 更新导入语句

将所有对 `@/utils/http/request` 的导入改为 `@/utils/http`：

```typescript
// ❌ 旧的
import request from '@/utils/http/request'

// ✅ 新的
import httpRequest from '@/utils/http'
```

#### 步骤 3: 验证功能

确保所有功能正常工作：

```typescript
// 测试基础请求
const data = await get('/api/test')

// 测试 Token 管理
setToken('your-token')
console.log(hasToken()) // true

// 测试缓存统计
console.log(getCacheStats())

// 测试性能监控
console.log(getPerformanceSummary())
```

## 新增功能

### 1. 缓存统计

```typescript
import { getCacheStats } from '@/utils/http/cache'

const stats = getCacheStats()
console.log(stats.hitRate) // 缓存命中率
```

### 2. 性能摘要

```typescript
import { getPerformanceSummary } from '@/utils/http/metrics'

const summary = getPerformanceSummary()
console.log(summary.averageResponseTime) // 平均响应时间
```

### 3. 请求去重统计

```typescript
import { getDeduplicationStats } from '@/utils/http/deduplication'

const stats = getDeduplicationStats()
console.log(stats.pendingCount) // 当前待处理请求数
```

## 性能提升

重构后的网络库带来了以下性能提升：

1. **代码分割**: 按需加载，减少初始包大小
2. **更好的缓存**: 增强的 LRU 缓存策略
3. **监控增强**: 更详细的性能指标
4. **类型安全**: 更好的 TypeScript 支持

## 向后兼容性

- ✅ 基础 API 完全兼容
- ✅ 配置选项保持不变
- ✅ 错误处理机制不变
- ✅ 支持所有现有功能

## 故障排除

### 常见问题

#### 1. 导入错误

```
Error: Cannot resolve module '@/utils/http/request'
```

**解决方案**: 将导入改为 `@/utils/http`

#### 2. 类型错误

```
Property 'ApiError' does not exist
```

**解决方案**: 确保从正确的模块导入类型

#### 3. 功能缺失

如果某个功能无法正常工作，请检查是否正确导入了相关模块。

### 调试建议

1. 开启开发模式日志
2. 使用性能监控查看请求状态
3. 检查缓存统计确认缓存工作正常

## 总结

重构后的网络库：

- 📦 **模块化**: 9个专用模块，职责清晰
- 🚀 **性能**: 更好的缓存和监控
- 🛡️ **类型安全**: 完整的 TypeScript 支持
- 🔧 **可维护**: 每个文件职责单一
- ⚡ **向后兼容**: 现有代码无需修改

如果遇到任何问题，请查看各个模块的具体文档或联系开发团队。
