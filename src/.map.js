export default [
  {
    name: 'demo-article',
    file: 'demo-article.cn.md',
    meta: {"title":"中文标题","description":"中文描述","language":"cn","tags":["Tag1","Tag2"],"cover":"./demo-article/bg.jpg","date":"2018-12-31T16:00:00.000Z"},
    body: async () => await import('../articles/demo-article.cn.md')
  },
  {
    name: 'demo-article',
    file: 'demo-article.en.md',
    meta: {"title":"Hello World","description":"Article Description","language":"en","tags":["Tag1","Tag2"],"cover":"./demo-article/bg.jpg","date":"2018-12-31T16:00:00.000Z"},
    body: async () => await import('../articles/demo-article.en.md')
  },]