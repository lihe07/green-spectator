import { createI18nContext, I18nContext } from '@solid-primitives/i18n'
import { createContext, createSignal, useContext } from 'solid-js'
import dict from './lang'

const AppContext = createContext()

function browserLanguage () {
  // accepted: zh-CN, zh-TW, en-US
  const language = navigator.language
  if (language === 'zh-CN' || language === 'zh-TW') {
    return 'zh'
  }
  return 'en'
}

function browserTheme () {
  // Light or Dark
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const AppContextProvider = (props) => {
  // Check local storage for language
  let language = localStorage.getItem('language') || browserLanguage()
  if (language !== 'zh' && language !== 'en') {
    language = browserLanguage()
  }
  // Check local storage for theme
  let theme = localStorage.getItem('theme') || browserTheme()
  if (theme !== 'dark' && theme !== 'light') {
    theme = browserTheme()
  }
  const i18n = createI18nContext(dict, language)
  const [dark, setDark] = createSignal(theme === 'dark')

  function switchLang (lang = null) {
    if (lang !== 'zh' && lang !== 'en') {
      lang = i18n[1].locale() === 'zh' ? 'en' : 'zh'
    }
    i18n[1].locale(lang)
    localStorage.setItem('language', lang)
  }

  function switchTheme (theme = null) {
    if (theme !== 'dark' && theme !== 'light') {
      theme = dark() ? 'light' : 'dark'
    }
    setDark(theme === 'dark')
    localStorage.setItem('theme', theme)
    document.body.classList.toggle('dark', theme === 'dark')
    document.body.classList.toggle('light', theme === 'light')
  }
  document.body.classList.toggle('dark', theme === 'dark')
  document.body.classList.toggle('light', theme === 'light')

  const value = {
    lang: i18n[1].locale,
    dark,
    switchLang,
    switchTheme
  }

  return (
    <AppContext.Provider value={value}>
      <I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
