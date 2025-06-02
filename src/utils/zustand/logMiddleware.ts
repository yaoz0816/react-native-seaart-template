import { StateCreator } from 'zustand'
// @ts-ignore
import { addZustandLog, isDebugMode } from 'react-native-debug-toolkit'

export default function logMiddleware<T extends object>(
  storeName: string,
  createFunction: StateCreator<T>,
): StateCreator<T> {
  return (set, get, api) => {
    const store = createFunction(set, get, api)

    const applicationStore: { [key: string]: string } = {}

    for (const key in store) {
      applicationStore[key] = '' + store[key] + ''
    }

    for (let key in store) {
      if (typeof store[key] === 'function') {
        let originalFunction = store[key] as Function

        // @ts-ignore
        store[key] = (...args: any[]) => {
          const prevState = get()
          const startTime = performance.now()
          originalFunction(...args)
          const endTime = performance.now()
          const nextState = get()

          const actionCompleteTime = endTime - startTime

          // console.log(
          //   `%c[Zustand Log Middleware][${storeName}] - Action: ${key}`,
          //   `time: ${actionCompleteTime}`,
          //   `prevState: ${JSON.stringify(prevState)}`,
          //   `nextState: ${JSON.stringify(nextState)}`,
          // )

          if (isDebugMode) {
            addZustandLog(
              key,
              prevState,
              nextState,
              actionCompleteTime,
              storeName,
            )
          }
          // window.postMessage({
          //   body: 'actionAndStateSnapshot',
          //   action: key,
          //   actionCompleteTime,
          //   prevState: JSON.stringify(prevState),
          //   nextState: JSON.stringify(nextState),
          //   store: JSON.stringify(applicationStore),
          // });
        }
      }
    }

    return store
  }
}
