import { createResource } from 'solid-js'

// const map = {
//   'demo-article': {
//     title: 'Article Title',
//     description: 'Article Description',
//     cover: 'https://picsum.photos/800/600',
//     date: '2021-01-01',
//     body: async () => await import('../../articles/demo-article.md')
//   }
// }

import map from '../.map.js'

export default ({ params }) => {
  const data = {}

  for (const article of map) {
    if (article.name === params.name) {
      // TODO: Add language support
      console.log(article.file)

      data[article.meta.language] = {
        fetcher: article.body,
        data: article
      }
    }
  }

  return data
}
