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
      titleZh: 'CarbInsight - 首页',
      titleEn: 'CarbInsight - Home'
    },
    {
      path: '/articles',
      meta: {
        descriptionZh: '文章列表',
        descriptionEn: 'Articles Page',
        keywordsZh: '文章列表, 示例',
        keywordsEn: 'articles, demo'
      },
      titleZh: 'CarbInsight - 文章',
      titleEn: 'CarbInsight - Articles'
    },
    {
      path: '/404',
      meta: {
        descriptionZh: '404',
        descriptionEn: '404',
        keywordsZh: '404, 示例',
        keywordsEn: '404, demo'
      },
      titleZh: 'CarbInsight - 404',
      titleEn: 'CarbInsight - 404'
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
          'CarbInsight - ' + article.meta.title
      } else {
        articles[article.name].meta.descriptionEn = article.meta.description
        articles[article.name].meta.keywordsEn = article.meta.tags.join(', ')
        articles[article.name].titleEn =
          'CarbInsight - ' + article.meta.title
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
        titleZh: 'CarbInsight - ' + article.meta.title,
        titleEn: 'CarbInsight - ' + article.meta.title
      }
    }
  }

  for (const article of Object.values(articles)) {
    routes.push(article)
  }

  return routes
}
