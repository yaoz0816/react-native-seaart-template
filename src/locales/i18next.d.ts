/**
 * @作者 东昊
 * @日期 2024/7/19
 * @用途 i18n的类型定义
 */

import { defaultNS, resources } from '@/locales/i18nConfig.ts'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['en']
  }
}
