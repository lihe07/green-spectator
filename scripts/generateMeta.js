import routes from './routes.js'
import path from 'path'
import { readFile, writeFile, mkdir } from 'fs/promises'
import pkg from 'htmlnano'

const { process } = pkg

function destinationPath (path) {
  if (path === '/') return '/index.html'
  return path + '.html'
}

function makeMeta (name, content) {
  let lang = 'en'
  if (name.endsWith('Zh')) {
    lang = 'zh'
  }
  // Trim
  name = name.replace(/(Zh|En)$/, '')
  return `<meta name="${name}" content="${content}" lang="${lang}">`
}

async function generateMeta () {
  const template = await readFile('./dist/index.html', { encoding: 'utf8' })

  for (const node of await routes()) {
    const destination = path.join('./dist', destinationPath(node.path))
    let meta = ''
    for (const key in node.meta) {
      meta += makeMeta(key, node.meta[key])
    }

    meta += `<title lang="zh">${node.titleZh}</title>`
    meta += `<title lang="en">${node.titleEn}</title>`

    let html = template.replace('<!-- !!DO NOT CHANGE!! -->', meta)
    html = (
      await process(html, {
        minifyCss: false,
        minifyJs: false,
        minifySvg: false
      })
    ).html
    // create directory if not exists
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, html, { encoding: 'utf8' })
  }
}

export default () => {
  return {
    name: 'generateMeta',
    apply: 'build',
    async closeBundle () {
      await generateMeta()
    }
  }
}
