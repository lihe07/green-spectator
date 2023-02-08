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

const target = window.innerHeight * 3.5
function checkAndScroll () {
  if (!document.getElementById('root')) {
    window.onload = checkAndScroll
    return
  }
  if (location.pathname !== '/') return
  if (document.getElementById('root').scrollTop < target) {
    // window.scrollTo({ top: target, behavior: 'auto' })
    // requestAnimationFrame(checkAndScroll)
    document.getElementById('root').scrollTo({ top: target, behavior: 'auto' })
    setTimeout(checkAndScroll, 100)
  }
}
if (import.meta.env.DEV) {
  // checkAndScroll()
}
