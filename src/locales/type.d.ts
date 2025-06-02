/**
 * @作者 东昊
 * @日期 2024/7/26
 * @用途 语种定义
 */

type BaseLang =
  | 'en'
  | 'ja'
  | 'de'
  | 'fr'
  | 'ko'
  | 'ru'
  | 'es'
  | 'pt'
  | 'th'
  | 'ar'
  | 'id'

type CSLangBase =
  | 'zh-cn'
  | 'en'
  | 'zh-tw'
  | 'de'
  | 'fr'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'ar'
  | 'id'
  | 'th'
  | 'tr'
  | 'es'
  | 'cs'
  | 'fil'
  | 'it'
  | 'hu'
  | 'nl'
  | 'pt'
  | 'ro'
  | 'sr'
  | 'pl'
  | 'vi'
  | 'el'
  | 'fa'
  | 'hi'
  | 'bn'
  | 'my'
  | 'ne'

declare namespace I18n {
  type AppLang = BaseLang | 'zh-CN' | 'zh-TW'
  type WebLang = BaseLang | 'zhCN' | 'zhTW'
  type CSLang = CSLangBase
}
