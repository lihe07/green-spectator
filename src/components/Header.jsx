import { A, useLocation } from '@solidjs/router'
import { createSignal, For } from 'solid-js'

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Rank',
    path: '/ranking'
  },
  {
    name: 'Placeh',
    path: '/placeholder'
  }
]

export default () => {
  const [scroll, setScroll] = createSignal(false)
  const location = useLocation()
  window.onscroll = () => {
    if (window.scrollY >= window.innerHeight) setScroll(true)
    else setScroll(false)
  }
  const show = () => (location.pathname === '/' ? scroll() : true)
  const line = 'bg-white h-4px w-6 rounded'
  return (
    <header
      class="fixed z-1 top-0 w-full h-20 bg-true-gray-8 bg-op-70 backdrop-blur flex items-center justify-between transition-opacity-300"
      classList={{ 'op-100': show(), 'op-0': !show() }}
    >
      <div class="max-w-300 px-10 w-full ma flex justify-between items-center text-5 color-white relative">
        <div class="flex items-center max-w-50% overflow-hidden">
          <span class="">LOGO</span>
          <div class="ml-20 flex md:op-100 max-w-100% md:pointer-events-auto pointer-events-none op-0 transition">
            <For each={routes}>
              {(route) => (
                <A
                  class="w-25 h-12 mx-1 rounded-lg bg-sky-3 flex items-center justify-center decoration-none color-white transition-all"
                  href={route.path}
                  activeClass="bg-op-30 op-100"
                  inactiveClass="bg-op-0 op-70 hover:op-100 active:op-70 active:scale-93"
                  end
                >
                  {route.name}
                </A>
              )}
            </For>
          </div>
        </div>
        {/* <div> */}
        <span class="hover:op-100 active:scale-93 transition cursor-pointer md:op-70 op-0 md:pointer-events-auto pointer-events-none">
          中文
        </span>
        {/* </div> */}
        <div class="md:op-0 md:pointer-events-none absolute right-10 op-100 active:scale-90 transition">
          <div class={line} />
          <div class={line + ' m-y-1'} />
          <div class={line} />
        </div>
      </div>
    </header>
  )
}
