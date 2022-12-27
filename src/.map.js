export default [
  {
    name: 'assessment-to-china-s-recent-emission-pattern-shifts',
    file: 'assessment-to-china-s-recent-emission-pattern-shifts.cn.md',
    meta: {"title":"对中国近期碳排放趋势的评估","description":"本文章考虑了近如新冠疫情等时事的影响，多方面评估了目前温室气体排放的情况","language":"cn","tags":["Science Article"],"cover":"./assessment-to-china-s-recent-emission-pattern-shifts/cover.jpg","date":"2022-12-14-T06:30+08:00"},
    body: async () => await import('../articles/assessment-to-china-s-recent-emission-pattern-shifts.cn.md')
  },
  {
    name: 'assessment-to-china-s-recent-emission-pattern-shifts',
    file: 'assessment-to-china-s-recent-emission-pattern-shifts.en.md',
    meta: {"title":"Assessment to China's Recent Emission Pattern Shifts","description":"This article assesses current green house gas emission effect considering recent developments such as the COVID-19 epidemic","language":"en","tags":["Science Article"],"cover":"./assessment-to-china-s-recent-emission-pattern-shifts/cover.jpg","date":"2022-12-13T22:30:00.000Z"},
    body: async () => await import('../articles/assessment-to-china-s-recent-emission-pattern-shifts.en.md')
  },
  {
    name: 'demo-article',
    file: 'demo-article.en.md',
    meta: {"title":"Hello World","description":"Article Description","language":"en","tags":["Tag1","Tag2"],"cover":"./demo-article/bg.jpg","date":"2018-12-31T16:00:00.000Z"},
    body: async () => await import('../articles/demo-article.en.md')
  },
  {
    name: 'demo-article',
    file: 'demo-article.zh.md',
    meta: {"title":"中文标题","description":"中文描述","language":"zh","tags":["Tag1","Tag2"],"cover":"./demo-article/bg.jpg","date":"2018-12-31T16:00:00.000Z"},
    body: async () => await import('../articles/demo-article.zh.md')
  },]