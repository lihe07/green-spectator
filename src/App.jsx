import { Suspense, createEffect, createSignal } from 'solid-js'
import routes from './routes'
import { useIsRouting, useRoutes } from '@solidjs/router'
import Header from './components/Header'
import { AppContextProvider } from './AppContext'
import Loader from './components/Loader'

export default () => {
  const Routes = useRoutes(routes())
  const isRouting = useIsRouting()

  const [transition, setTransition] = createSignal(true)

  createEffect(() => {
    if (isRouting()) {
      setTransition(true)
    } else {
      setTimeout(() => setTransition(false), 300)
    }
  })

  return (
    <AppContextProvider>
      <div class="dark:bg-true-gray-9 light:bg-teal-8 transition-colors-300 min-h-screen font-sans">
        <Loader />
        <Header />
        <main
          class="transition-opacity-300"
          classList={{ 'op-0': transition(), hidden: isRouting() }}
        >
          <Suspense>
            <Routes />
          </Suspense>
        </main>
      </div>
    </AppContextProvider>
  )
}
