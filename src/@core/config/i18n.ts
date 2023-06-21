import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n

  // Enables the i18next backend
  .use(Backend)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: 'vi',
    backend: {
      /* translation file path */
      loadPath: '/locales/{{lng}}.json'
    },
    fallbackLng: 'vi',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n
