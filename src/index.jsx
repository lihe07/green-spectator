import { createI18nContext, I18nContext } from '@solid-primitives/i18n'
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import 'uno.css'
import App from './App'
import strings from './strings'

const value = createI18nContext(strings, 'en')

render(
  () => (
    <I18nContext.Provider value={value}>
      <Router>
        <App />
      </Router>
    </I18nContext.Provider>
  ),
  document.getElementById('root')
)

// DBG
// console.log('scroll')
// setTimeout(() => {
//   window.scrollTo({ top: window.innerHeight, behavior: 'auto' })
// }, 500)
