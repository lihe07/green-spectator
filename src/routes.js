import { lazy } from 'solid-js'

import ArticleData from './pages/Article.data.js'

export default () => [
  {
    path: '/',
    component: lazy(() => import('./pages/Index')),
    meta: {
      description: 'Index Page', // TODO: Add meta: description
      keywords: 'index, demo' // TODO: Add meta: keywords
    },
    title: 'Green Spectator'
  },
  {
    path: '/articles',
    component: lazy(() => import('./pages/Articles')),
    meta: {
      description: 'Articles Page', // TODO: Add meta: description
      keywords: 'articles, demo' // TODO: Add meta: keywords
    },
    title: 'Green Spectator - Articles'
  },
  {
    path: '/articles/:name',
    component: lazy(() => import('./pages/Article')),
    data: ArticleData,

    map: false
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404')),
    map: false
  }
]
