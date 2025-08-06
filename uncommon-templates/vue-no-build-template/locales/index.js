const { createI18n } = VueI18n

import en from './en.js'
import zh from './zh.js'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    zh,
  },
})

export default i18n
