import { lazy } from 'solid-js'

import ArticleData from './pages/Article.data.js'

export default () => [
  {
    path: '/',
    component: lazy(() => import('./pages/Index'))
  },
  {
    path: '/articles',
    component: lazy(() => import('./pages/Articles'))
  },
  {
    path: '/articles/:name',
    component: lazy(() => import('./pages/Article')),
    data: ArticleData
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404'))
  }
]
