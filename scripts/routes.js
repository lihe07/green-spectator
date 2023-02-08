export default async () => {
  const routes = [
    {
      path: '/',
      meta: {
        descriptionZh: '首页',
        descriptionEn: 'Home Page',
        keywordsZh: '首页, 示例',
        keywordsEn: 'home, demo'
      },
      titleZh: 'Carbinsight - 首页',
      titleEn: 'Carbinsight - Home'
    },
    {
      path: '/articles',
      meta: {
        descriptionZh: '文章列表',
        descriptionEn: 'Articles Page',
        keywordsZh: '文章列表, 示例',
        keywordsEn: 'articles, demo'
      },
      titleZh: 'Carbinsight - 文章',
      titleEn: 'Carbinsight - Articles'
    },
    {
      path: '/404',
      meta: {
        descriptionZh: '404',
        descriptionEn: '404',
        keywordsZh: '404, 示例',
        keywordsEn: '404, demo'
      },
      titleZh: 'Carbinsight - 404',
      titleEn: 'Carbinsight - 404'
    }
  ]
  const articles = {}

  const map = await (await import('../src/.map.json')).default

  for (const article of map) {
    if (articles[article.name]) {
      if (article.meta.language === 'zh') {
        articles[article.name].meta.descriptionZh = article.meta.description
        articles[article.name].meta.keywordsZh = article.meta.tags.join(', ')
        articles[article.name].titleZh =
          'Carbinsight - ' + article.meta.title
      } else {
        articles[article.name].meta.descriptionEn = article.meta.description
        articles[article.name].meta.keywordsEn = article.meta.tags.join(', ')
        articles[article.name].titleEn =
          'Carbinsight - ' + article.meta.title
      }
    } else {
      articles[article.name] = {
        path: `/articles/${article.name}`,
        meta: {
          descriptionZh: article.meta.description,
          descriptionEn: article.meta.description,
          keywordsZh: article.meta.tags.join(', '),
          keywordsEn: article.meta.tags.join(', ')
        },
        titleZh: 'Carbinsight - ' + article.meta.title,
        titleEn: 'Carbinsight - ' + article.meta.title
      }
    }
  }

  for (const article of Object.values(articles)) {
    routes.push(article)
  }

  return routes
}
