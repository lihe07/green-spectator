import routes from '../src/routes.js'
import { writeFile } from 'fs/promises'

const site = 'https://example.com'

function makeUrl (location) {
  const current = new Date()
  const lastmod = current.toISOString()
  return `<url><loc>${site}${location}</loc><lastmod>${lastmod}</lastmod></url>`
}

async function generateSitemap () {
  let sitemap =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for (const node of routes()) {
    if (node.map === false) continue
    sitemap += makeUrl(node.path)
  }
  sitemap += '</urlset>'
  await writeFile('./dist/sitemap.xml', sitemap)
}

generateSitemap().catch(console.error)
