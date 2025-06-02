import { createSelectors } from '@/utils/zustand/createSelectors'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { MMKVStorage } from '@/utils/zustand/zustandStorage'

type State = {
  // 当前语言
  language: I18n.AppLang | null
}

type Action = {
  // 设置当前语言
  setLanguage: (language: I18n.AppLang) => void
  reset: () => void
}

const initialState: State = {
  language: null,
}

export const useI18nStore = createSelectors(
  create<State & Action>()(
    persist(
      immer((set) => ({
        ...initialState,
        setLanguage: (language) =>
          set((state) => ({
            ...state,
            language,
          })),
        reset: () => set(initialState),
      })),
      {
        name: 'I18n',
        storage: createJSONStorage(() => MMKVStorage),
      },
    ),
  ),
)
