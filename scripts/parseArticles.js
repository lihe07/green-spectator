import fs from 'fs/promises'
import path from 'path'
import yaml from 'js-yaml'
import { existsSync } from 'fs'

// Run before vite

// function copyRecursiveSync (src, dest) {
//   const exists = fs.existsSync(src)
//   const stats = exists && fs.statSync(src)
//   const isDirectory = exists && stats.isDirectory()
//   if (isDirectory) {
//     fs.mkdirSync(dest)
//     fs.readdirSync(src).forEach(function (childItemName) {
//       copyRecursiveSync(
//         path.join(src, childItemName),
//         path.join(dest, childItemName)
//       )
//     })
//   } else {
//     fs.copyFileSync(src, dest)
//   }
// }

async function copyRecursive (src, dest) {
  const stats = await fs.stat(src)
  const isDirectory = stats.isDirectory()
  if (isDirectory) {
    await fs.mkdir(dest)
    ;(await fs.readdir(src)).forEach(async function (childItemName) {
      await copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    await fs.copyFile(src, dest)
  }
}

// Parse articles from the articles folder
// and generate a .map.json file with the article data

async function parseArticles () {
  let map = 'export default ['
  const mapJson = []
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
      mapJson.push({
        name,
        file,
        meta
      })
    }
  }
  await fs.writeFile('./src/.map.js', map + ']')
  await fs.writeFile('./src/.map.json', JSON.stringify(mapJson))

  // Some dirty patches...

  // Copy the articles folder to /public/articles
  if (existsSync('./public/articles')) {
    await fs.rm('./public/articles', { recursive: true })
  }
  // Recursively copy the articles folder
  await copyRecursive('./articles', './public/articles')
}

parseArticles()

// export default () => {
//   return {
//     name: 'parseArticles',
//     enforce: 'pre',
//     async buildStart () {
//       console.log('parseArticles buildStart')
//       await parseArticles()
//     }
//   }
// }
