import { Suspense } from 'solid-js'
import routes from './routes'
import { useRoutes } from '@solidjs/router'
import Header from './components/Header'

export default () => {
  const Routes = useRoutes(routes())
  return (
    <div class="bg-true-gray-9 min-h-screen font-sans">
      <Header />
      <main>
        <Suspense>
          <Routes />
        </Suspense>
      </main>
    </div>
  )
}
