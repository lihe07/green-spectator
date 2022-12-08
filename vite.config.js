import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import unocss from 'unocss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import parseArticles from './scripts/parseArticles'
import generateMeta from './scripts/generateMeta'
import generateSitemap from './scripts/generateSitemap'

export default defineConfig({
  // server: { https: true },
  plugins: [
    unocss(),
    parseArticles(),
    generateMeta(),
    generateSitemap(),
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [remarkGfm, remarkFrontmatter]
      }),
      enforce: 'pre'
    },
    solid({ extensions: ['.md', '.mdx'] })
  ],
  build: {
    target: 'esnext'
  }
})
