import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'

import 'uno.css'
import App from './App'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')
)

// DBG
console.log('scroll')
setTimeout(() => {
  window.scrollTo({ top: window.innerHeight, behavior: 'auto' })
}, 500)
