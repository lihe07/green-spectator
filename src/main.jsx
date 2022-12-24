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

// DBG

function checkAndScroll () {
  if (!document.getElementById('root')) {
    window.onload = checkAndScroll
    return
  }
  if (document.getElementById('root').scrollTop < window.innerHeight) {
    // window.scrollTo({ top: window.innerHeight, behavior: 'auto' })
    // requestAnimationFrame(checkAndScroll)
    document
      .getElementById('root')
      .scrollTo({ top: window.innerHeight, behavior: 'auto' })
    setTimeout(checkAndScroll, 100)
  }
}
if (import.meta.env.DEV) {
  // checkAndScroll()
}
