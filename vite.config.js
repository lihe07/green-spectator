import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import unocss from 'unocss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: { https: true },
  plugins: [
    unocss(),
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [remarkGfm]
      }),
      enforce: 'pre'
    },
    solid({ extensions: ['.md', '.mdx'] }),
    mkcert({
      source: 'coding'
    })
  ],
  build: {
    target: 'esnext'
  }
})
