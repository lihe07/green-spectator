import routes from '../src/routes.js'
import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import pkg from 'htmlnano'
const { process } = pkg

function destinationPath (path) {
  if (path === '/') return '/index.html'
  return path + '.html'
}

function makeMeta (name, content) {
  return `<meta name="${name}" content="${content}">`
}

async function generateMeta () {
  const template = await readFile('./dist/index.html', { encoding: 'utf8' })
  for (const node of routes()) {
    if (node.map === false) continue
    const destination = path.join('./dist', destinationPath(node.path))
    let meta = ''
    for (const key in node.meta) {
      meta += makeMeta(key, node.meta[key])
    }
    if (node.title) {
      meta += `<title>${node.title}</title>`
    }
    let html = template.replace('<!-- !!DO NOT CHANGE!! -->', meta)
    html = (
      await process(html, {
        minifyCss: false,
        minifyJs: false,
        minifySvg: false
      })
    ).html
    await writeFile(destination, html)
  }
}

generateMeta().catch(console.error)
