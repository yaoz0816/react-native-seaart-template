import type { StateCreator } from 'zustand/vanilla'
// @ts-ignore
import { addZustandLog, isDebugMode } from 'react-native-debug-toolkit'

// 简单的日志中间件
export const logger = <T>(
  name: string = 'Store',
  stateCreator: StateCreator<T, [], [], T>,
): StateCreator<T, [], [], T> => {
  // 参数验证
  if (!stateCreator || typeof stateCreator !== 'function') {
    throw new Error('logger: stateCreator must be a function')
  }

  return (set: any, get: any, api: any) => {
    // 包装 setState 函数
    const loggedSet = (...args: any[]) => {
      const prevState = get()

      const startTime = Date.now()
      // 调用原始 setState
      const result = set(...args)
      const nextState = get()
      const endTime = Date.now()

      const actionCompleteTime = endTime - startTime

      // console.log(
      //   `%c[Zustand Log Middleware][${storeName}] - Action: ${key}`,
      //   `time: ${actionCompleteTime}`,
      //   `prevState: ${JSON.stringify(prevState)}`,
      //   `nextState: ${JSON.stringify(nextState)}`,
      // )

      if (isDebugMode) {
        addZustandLog(name, prevState, nextState, actionCompleteTime, name)
      }

      return result
    }

    // 调用原始状态创建器
    return stateCreator(loggedSet, get, api)
  }
}
