import { lazy } from 'solid-js'

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
    path: '/*all',
    component: lazy(() => import('./pages/404')),
    map: false
  }
]
