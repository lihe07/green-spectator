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
  let fetcherCN, fetcherEN, dataCN, dataEN
  for (const article of map) {
    if (article.name === params.name) {
      // TODO: Add language support
      console.log(article.file)
      if (article.meta.language === 'zh') {
        fetcherCN = article.body
        dataCN = article
      } else {
        fetcherEN = article.body
        dataEN = article
      }
    }
  }

  const [markdownCN] = createResource(async () => (await fetcherCN()).default)
  const [markdownEN] = createResource(async () => (await fetcherEN()).default)

  return {
    dataCN,
    dataEN,
    markdownCN,
    markdownEN
  }
}
