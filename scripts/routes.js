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
      titleZh: 'Green Spectator - 首页',
      titleEn: 'Green Spectator - Home'
    },
    {
      path: '/articles',
      meta: {
        descriptionZh: '文章列表',
        descriptionEn: 'Articles Page',
        keywordsZh: '文章列表, 示例',
        keywordsEn: 'articles, demo'
      },
      titleZh: 'Green Spectator - 文章',
      titleEn: 'Green Spectator - Articles'
    }
  ]
  const articles = {}

  const map = await (await import('../src/.map.json')).default

  for (const article of map) {
    if (articles[article.name]) {
      if (article.meta.language === 'zh') {
        articles[article.name].meta.descriptionZh = article.meta.description
        articles[article.name].meta.keywordsZh = article.meta.tags.join(', ')
        articles[article.name].titleZh = article.meta.title
      } else {
        articles[article.name].meta.descriptionEn = article.meta.description
        articles[article.name].meta.keywordsEn = article.meta.tags.join(', ')
        articles[article.name].titleEn = article.meta.title
      }
    } else {
      articles[article.name] = {
        path: `/articles/${article.name}`,
        meta: {
          descriptionZh:
            article.meta.language === 'zh' ? article.meta.description : '',
          descriptionEn:
            article.meta.language === 'en' ? article.meta.description : '',
          keywordsZh:
            article.meta.language === 'zh' ? article.meta.tags.join(', ') : '',
          keywordsEn:
            article.meta.language === 'en' ? article.meta.tags.join(', ') : ''
        },
        titleZh: article.meta.language === 'zh' ? article.meta.title : '',
        titleEn: article.meta.language === 'en' ? article.meta.title : ''
      }
    }
  }

  for (const article of Object.values(articles)) {
    routes.push(article)
  }

  return routes
}
