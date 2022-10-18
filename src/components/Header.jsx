import { createSignal } from 'solid-js'

export default () => {
  const [show, setShow] = createSignal(false)
  window.onscroll = () => {
    if (window.scrollY >= window.innerHeight) setShow(true)
    else setShow(false)
  }

  return (
    <header
      class="fixed z-1 top-0 w-full h-20 bg-true-gray-8 bg-op-70 backdrop-blur flex items-center justify-between transition-opacity-300"
      classList={{ 'op-100': show(), 'op-0': !show() }}
    >
      <div class="max-w-300 ma flex justify-between">
        <div>
          <span>LOGO</span>
        </div>
        <div>
          <span>中文</span>
        </div>
      </div>
    </header>
  )
}
