import { read, utils } from 'xlsx'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'

const BASE_IN_PATH = 'Tables/'
const BASE_OUT_PATH = 'src/locales/'

const languageChange = (origin) => {
  switch (origin) {
    case 'zhs':
      return 'zh-CN'
    case 'zht':
      return 'zh-TW'
  }

  return origin
}

const createFile = () => {
  const workbook = read(
    readFileSync(BASE_IN_PATH + 'I18nUI_国际化UI' + '.xlsx'),
    {
      type: 'buffer',
    },
  )

  const workbookError = read(
    readFileSync(BASE_IN_PATH + 'I18nUI_ErrorCode_错误码' + '.xlsx'),
    {
      type: 'buffer',
    },
  )

  let ids = [],
    i18ns = [],
    i18nErrors = []

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName]
    const data = utils.sheet_to_json(sheet)
    ids = data.find((item) => item['文本ID'] === 'id')
    i18ns = data.filter(
      (item) => !(item['文本ID'] === '文本ID' || item['文本ID'] === 'id'),
    )
  })

  workbookError.SheetNames.forEach((sheetName) => {
    const sheet = workbookError.Sheets[sheetName]
    const data = utils.sheet_to_json(sheet)
    i18nErrors = data.filter((item) => item['文本ID'].includes('I18nErrorCode'))
  })

  try {
    mkdirSync(BASE_OUT_PATH)
  } catch (e) {}

  Object.keys(ids).forEach((item) => {
    if (item !== '文本ID') {
      const language = languageChange(ids[item])

      // 建立文件夹
      try {
        mkdirSync(BASE_OUT_PATH + language)
      } catch (e) {}

      // 处理每一种语言
      const i18nObject = {}
      i18ns.forEach((i18n) => {
        const key = i18n['文本ID']

        if (i18n[item]) {
          i18nObject[key] = i18n[item]
            .replaceAll(/\{\{/g, '{')
            .replaceAll(/\}\}/g, '}')
            .replaceAll(/\{/g, '{{')
            .replaceAll(/}/g, '}}')
        }
      })
      i18nErrors.forEach((i18nError) => {
        const key = `error_code_${i18nError['文本ID'].substring(14)}`
        i18nObject[key] = i18nError[item]
      })

      writeFileSync(
        BASE_OUT_PATH + language + '/translation.json',
        JSON.stringify(i18nObject, null, 2),
      )
    }
  })

  let configData = ''
  Object.keys(ids).forEach((item) => {
    if (item !== '文本ID') {
      configData =
        configData +
        `import ${ids[item]} from './${languageChange(
          ids[item],
        )}/translation.json'\n`
    }
  })
  configData =
    configData +
    `\nexport const defaultNS = 'translation'\nexport const resources = {\n`
  Object.keys(ids).forEach((item) => {
    if (item !== '文本ID') {
      configData =
        configData +
        `"${languageChange(ids[item])}":{translation:${ids[item]},},`
    }
  })
  configData = configData + `}`
  // 暂时不生成i18nConfig.ts文件，使用云端多语言配置
  // writeFileSync(BASE_OUT_PATH + '/i18nConfig.ts', configData)
}

createFile()
