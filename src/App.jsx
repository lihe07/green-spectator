import { Route, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'
import Header from './components/Header'

const Index = lazy(() => import('./views/Index'))

export default () => {
  return (
    <div class="bg-true-gray-9 min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" component={Index} />
          <Route path="/placeholder" />
          <Route path="/ranking" />
        </Routes>
      </main>
    </div>
  )
}
