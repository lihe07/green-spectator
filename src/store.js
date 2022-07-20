import { writable } from 'svelte/store'

function init () {
  try {
    const default_lang = navigator.language.includes('zh') ? 'cn' : 'en'
    const lang = localStorage.getItem('lang') || default_lang
    localStorage.setItem('lang', lang)
    return lang
  } catch (_) {
    return localStorage.getItem('lang') || 'en'
  }
}

const store = writable(init())
store.subscribe(lang => {
  localStorage.setItem('lang', lang)
})

export default store
