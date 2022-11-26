import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'

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

navigator.serviceWorker
  .register('assets-sw.js')
  .then(navigator.serviceWorker.ready)

// DBG

function checkAndScroll () {
  if (window.scrollY < window.innerHeight) {
    window.scrollTo({ top: window.innerHeight, behavior: 'auto' })
    requestAnimationFrame(checkAndScroll)
  }
}
if (import.meta.env.DEV) {
  checkAndScroll()
}
