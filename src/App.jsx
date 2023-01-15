import { Suspense, createEffect, createSignal } from 'solid-js'
import routes from './routes'
import { useIsRouting, useBeforeLeave, useRoutes } from '@solidjs/router'
import Header from './components/Header'
import { AppContextProvider } from './AppContext'

export default () => {
  const Routes = useRoutes(routes())
  const isRouting = useIsRouting()

  const [transition, setTransition] = createSignal(true)

  createEffect(() => {
    if (!isRouting()) {
      console.log('Transition end')
      setTimeout(() => setTransition(false), 150)
    }
  })

  useBeforeLeave((e) => {
    console.log('Transition start')
    setTransition(true)
    e.preventDefault()
    setTimeout(() => {
      e.retry(true)
    }, 150)
  })

  return (
    <AppContextProvider>
      <div class="dark:bg-true-gray-9 light:bg-teal-8 transition-colors-300 min-h-screen font-sans">
        <Header />
        <main
          class="transition-opacity-150"
          classList={{ 'op-0': transition() }}
        >
          <Suspense>
            <Routes />
          </Suspense>
        </main>
      </div>
    </AppContextProvider>
  )
}
