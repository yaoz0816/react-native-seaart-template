/**
 * @作者 东昊
 * @日期 2024/7/26
 * @用途 多国语工具
 */

import { resources, defaultNS } from '@/locales/i18nConfig'
import { translationLoadPaths } from '@/locales/translationLoadPaths.generated'
import { useI18nStore } from '@/locales/useI18nStore'
import { net } from '@/utils/NewGenSeaArt/net/net'
import * as Localization from 'expo-localization'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import axios from 'axios'
import { MMKV } from 'react-native-mmkv'
import { Platform } from 'react-native'
import * as FileSystem from 'expo-file-system'

const translationCache = new MMKV()

// Load translation from native bundle
const loadTranslationFromNative = async (lang: I18n.AppLang): Promise<any> => {
  try {
    let filePath = ''

    if (Platform.OS === 'ios') {
      filePath = `${FileSystem.bundleDirectory}/translation-${lang}.json`
    } else {
      filePath = `asset:///translations/${lang}/translation.json`
    }

    const content = await FileSystem.readAsStringAsync(filePath)
    console.info(`Loaded native translation for ${lang}`)
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error loading native translation for ${lang}:`, error)
    return null
  }
}

// Updated loadTranslationIfNeeded function using axios with native fallback
const loadTranslationIfNeeded = async (lang: I18n.AppLang): Promise<void> => {
  if (!i18next.hasResourceBundle(lang, defaultNS)) {
    const url = translationLoadPaths[lang]

    if (url) {
      try {
        // Check if translation data is already cached using the URL as key
        const cachedTranslation = translationCache.getString(url)
        let data

        if (cachedTranslation) {
          data = JSON.parse(cachedTranslation)
        } else {
          const response = await axios.get(url)
          data = response.data
          translationCache.set(url, JSON.stringify(data))
        }

        i18next.addResourceBundle(lang, defaultNS, data, true, true)
      } catch (error) {
        console.error(
          `Error loading translation from network for ${lang}:`,
          error,
        )

        // Try to load from native bundle if network request fails
        const nativeData = await loadTranslationFromNative(lang)

        if (nativeData) {
          i18next.addResourceBundle(lang, defaultNS, nativeData, true, true)
        }
      }
    } else {
      const nativeData = await loadTranslationFromNative(lang)

      if (nativeData) {
        i18next.addResourceBundle(lang, defaultNS, nativeData, true, true)
      }
    }
  }
}

export const initI18n = () => {
  const lang = useI18nStore.getState().language || getDeviceLang()
  i18next
    .use(initReactI18next)
    .init({
      ns: [defaultNS],
      defaultNS,
      compatibilityJSON: 'v3',
      fallbackLng: 'en',
      lng: lang,
      debug: false,
      resources, // contains only English resource
      interpolation: {
        escapeValue: false,
      },
    })
    .then(async () => {
      await loadTranslationIfNeeded(lang)
      setLanguage(lang)
    })
}

export const errorCodeToKey = (code?: string | number | null): string => {
  if (code) {
    return `error_code_${code}`
  } else {
    return 'System_Anomaly'
  }
}

export const errorToKey = (
  error?: WillNull<{ code: WillNull<string | number> }>,
): string => {
  if (error && error.code) {
    return `error_code_${error.code}`
  } else {
    return 'System_Anomaly'
  }
}

const getDeviceLang = (): I18n.AppLang => {
  const { languageCode, languageTag } = Localization.getLocales()[0]

  let l: I18n.AppLang = 'en'

  switch (languageCode) {
    case 'en':
    case 'de':
    case 'ar':
    case 'ja':
    case 'fr':
    case 'es':
    case 'th':
    case 'pt':
    case 'ru':
    case 'ko':
      l = languageCode
      break
    case 'in':
      // 印度尼西亚语
      l = 'id'
      break
    case 'zh':
      if (
        languageTag.toLowerCase().includes('hans') ||
        languageTag.toLowerCase().includes('cn')
      ) {
        l = 'zh-CN'
      } else {
        l = 'zh-TW'
      }

      break
  }

  return l
}

const LanguageList: { name: string; lang: I18n.AppLang }[] = [
  { name: 'English', lang: 'en' },
  { name: 'Français', lang: 'fr' },
  { name: 'Português', lang: 'pt' },
  { name: 'Español', lang: 'es' },
  { name: 'Deutsch', lang: 'de' },
  { name: '日本語', lang: 'ja' },
  { name: '한국어', lang: 'ko' },
  { name: 'Pусский', lang: 'ru' },
  { name: 'ภาษาไทย', lang: 'th' },
  { name: 'العربية', lang: 'ar' },
  { name: 'Bahasa Indonesia', lang: 'id' },
  { name: '简体中文', lang: 'zh-CN' },
  { name: '繁体中文', lang: 'zh-TW' },
]

export const resetLanguage = async () => {
  const lang = getDeviceLang()
  net.setLanguage(lang)
  useI18nStore.getState().setLanguage(lang)
  await loadTranslationIfNeeded(lang)
  i18next.changeLanguage(lang).then(() => {})
}

export const setLanguage = async (lang: I18n.AppLang) => {
  net.setLanguage(lang)
  useI18nStore.getState().setLanguage(lang)
  await loadTranslationIfNeeded(lang)
  i18next.changeLanguage(lang).then(() => {})
}

export const getLanguage = (): I18n.AppLang => {
  return i18next.language as I18n.AppLang
}

export const getLanguageList = (): { name: string; lang: I18n.AppLang }[] => {
  return LanguageList
}

export const languageToApp = (lang: string): I18n.AppLang => {
  const lowerLang = lang.toLowerCase()

  if (lowerLang.includes('zh')) {
    if (lowerLang.includes('tw')) {
      return 'zh-TW'
    }

    return 'zh-CN'
  }

  return lang as I18n.AppLang
}

export const languageToWeb = (lang: I18n.AppLang): I18n.WebLang => {
  if (lang === 'zh-CN') {
    return 'zhCN'
  } else if (lang === 'zh-TW') {
    return 'zhTW'
  } else {
    return lang
  }
}

export const languageToCS = (lang: I18n.AppLang): I18n.CSLang => {
  switch (lang) {
    case 'zh-CN':
      return 'zh-cn'
    case 'zh-TW':
      return 'zh-tw'
    case 'id':
      return 'en'
    case 'en':
    case 'de':
    case 'ar':
    case 'ja':
    case 'fr':
    case 'es':
    case 'th':
    case 'pt':
    case 'ru':
    case 'ko':
      return lang
  }
}

export const isLanguageJapan = (): boolean => {
  return getLanguage() === 'ja'
}

export const isLanguageChina = (): boolean => {
  return getLanguage() === 'zh-CN'
}
