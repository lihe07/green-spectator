import { Suspense } from 'solid-js'
import routes from './routes'
import { useRoutes } from '@solidjs/router'
import Header from './components/Header'
import { AppContextProvider } from './AppContext'

export default () => {
  const Routes = useRoutes(routes())
  return (
    <AppContextProvider>
      <div class="dark:bg-true-gray-9 light:bg-teal-8 transition-colors-300 min-h-screen font-sans">
        <Header />
        <main>
          <Suspense>
            <Routes />
          </Suspense>
        </main>
      </div>
    </AppContextProvider>
  )
}
