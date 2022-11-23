import { useI18n } from '@solid-primitives/i18n'
import { A, useLocation } from '@solidjs/router'
import { createSignal, For, Show } from 'solid-js'
import { useAppContext } from '../AppContext'

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
  const [t] = useI18n()
  const { switchLang, switchTheme, dark } = useAppContext()

  const [scroll, setScroll] = createSignal(false)
  const location = useLocation()

  const root = document.getElementById('root')
  root.onscroll = () => {
    if (root.scrollTop >= window.innerHeight) setScroll(true)
    else setScroll(false)
  }
  const show = () => (location.pathname === '/' ? scroll() : true)

  const [isCooling, setIsCooling] = createSignal(false)

  const line = 'bg-white h-4px w-6 rounded'
  return (
    <header
      class="fixed z-4 w-full h-20 dark:bg-true-gray-8 light:bg-teal-7 !bg-op-70 backdrop-blur flex items-center justify-between transition-all-300"
      classList={{ 'op-100 top-0': show(), 'op-0 top--20': !show() }}
    >
      <div class="max-w-300 px-10 w-full ma flex justify-between items-center text-5 color-white relative">
        {/* Left */}
        <div class="flex items-center ">
          <span class="">LOGO</span>
          <div class="ml-20 flex md:op-100 md:w-auto w-0 max-w-100% md:pointer-events-auto pointer-events-none op-0 transition">
            <For each={routes}>
              {(route) => (
                <div
                  class="mx-1 rounded-lg bg-sky-3 transition-all"
                  classList={{
                    'bg-op-30 op-100 active': location.pathname === route.path,
                    'bg-op-0 op-70 hover:op-100 active:op-70 active:scale-93':
                      location.pathname !== route.path
                  }}
                >
                  <A
                    class="w-25 h-12 flex items-center justify-center decoration-none color-white"
                    href={route.path}
                  >
                    {route.name}
                  </A>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Right */}
        <div class="flex items-center">
          <span
            class=" transition cursor-pointer md:op-70 op-0 md:pointer-events-auto pointer-events-none mb-1 hover:op-100 active:scale-93 w-20 text-center"
            onClick={() => {
              if (isCooling()) return
              setIsCooling(true)
              switchLang()
              setTimeout(() => setIsCooling(false), 150)
            }}
          >
            {t('otherName')}
          </span>
          {/* Light & Dark */}
          <div
            class="w-7 h-7 ml-5  transition cursor-pointer md:op-70 op-0 md:pointer-events-auto pointer-events-none hover:op-100 active:scale-70 active:op-50"
            onClick={() => {
              if (isCooling()) return
              setIsCooling(true)
              switchTheme()
              setTimeout(() => setIsCooling(false), 150)
            }}
          >
            <Show when={dark()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
                  fill="currentColor"
                  style={{ '--darkreader-inline-fill': 'currentColor' }}
                  data-darkreader-inline-fill=""
                />
              </svg>
            </Show>
            <Show when={!dark()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"
                  fill="currentColor"
                  style={{ '--darkreader-inline-fill': 'currentColor' }}
                  data-darkreader-inline-fill=""
                />
              </svg>
            </Show>
          </div>
        </div>
        <div class="md:op-0 md:pointer-events-none absolute right-10 op-100 active:scale-90 transition">
          <div class={line} />
          <div class={line + ' m-y-1'} />
          <div class={line} />
        </div>
      </div>
    </header>
  )
}
