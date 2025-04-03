import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'
import Cookies from 'js-cookie'
const getDefaultLocale = () => {
  const savedLocale = Cookies.get('locale')
  if (savedLocale) return savedLocale
  
  const browserLocale = navigator.language.split('-')[0]
  return ['es', 'en'].includes(browserLocale) ? browserLocale : 'es'
}
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getDefaultLocale(),
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})
export function setLocale(locale) {
  i18n.global.locale.value = locale
  Cookies.set('locale', locale, { expires: 365 })
  document.querySelector('html').setAttribute('lang', locale)
}
