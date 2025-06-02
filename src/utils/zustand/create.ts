import { create as zustandCreate, type StateCreator } from 'zustand'
import { logger } from './logger'

// 带日志的 create 函数
export const create = <T>(
  stateCreator: StateCreator<T, [], [], T>,
  name?: string,
) => {
  // 参数验证
  if (!stateCreator || typeof stateCreator !== 'function') {
    throw new Error('create: stateCreator must be a function')
  }

  // 自动应用日志中间件
  // @ts-ignore
  return zustandCreate<T>(logger(stateCreator, name || 'Store'))
}

// 原生 create（不带日志）
export const createRaw = zustandCreate
