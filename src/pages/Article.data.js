import map from '../.map.js'

export default ({ params }) => {
  const data = {}

  for (const article of map) {
    if (article.name === params.name) {
      // TODO: Add language support
      console.log(article.file)

      data[article.meta.language] = {
        fetcher: article.body,
        ...article
      }
    }
  }

  if (Object.keys(data).length === 0) {
    // TODO: Redirect to 404 page
    location.href = '/404'
  }

  console.log('Router data: ', data)

  return data
}
