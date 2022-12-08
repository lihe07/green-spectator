import fs from 'fs/promises'
import yaml from 'js-yaml'

// Run before vite

// Parse articles from the articles folder
// and generate a .map.json file with the article data

async function parseArticles () {
  let map = 'export default ['
  for (const file of await fs.readdir('./articles')) {
    if (file.endsWith('.md')) {
      // [name].[language].md
      const name = file.split('.')[0]
      const re = /---\s*([\s\S]*?)\s*---/g
      const meta = yaml.loadAll(
        re.exec(await fs.readFile('./articles/' + file))[1]
      )[0]
      map += `
  {
    name: '${name}',
    file: '${file}',
    meta: ${JSON.stringify(meta)},
    body: async () => await import('../articles/${file}')
  },`
    }
  }
  await fs.writeFile('./src/.map.js', map + ']')
}

export default () => {
  return {
    name: 'parseArticles',
    enforce: 'pre',
    async buildStart () {
      console.log('parseArticles buildStart')
      await parseArticles()
    }
  }
}
