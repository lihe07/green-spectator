// vite.config.js
import { defineConfig } from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.4/node_modules/vite/dist/node/index.js";
import solid from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-solid@2.4.0_solid-js@1.6.2+vite@3.2.4/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import unocss from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+unocss@0.46.5_rollup@3.4.0+vite@3.2.4/node_modules/unocss/dist/vite.mjs";
import mdx from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+@mdx-js+rollup@2.1.5_rollup@3.4.0/node_modules/@mdx-js/rollup/index.js";
import remarkGfm from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+remark-gfm@3.0.1/node_modules/remark-gfm/index.js";
var vite_config_default = defineConfig({
  plugins: [
    unocss(),
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkGfm]
      }),
      enforce: "pre"
    },
    solid({ extensions: [".md", ".mdx"] })
  ],
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxncmVlbi1zcGVjdGF0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFVzZXJzXFxcXGxpaGUwN1xcXFxEZXNrdG9wXFxcXGdyZWVuLXNwZWN0YXRvclxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVXNlcnMvbGloZTA3L0Rlc2t0b3AvZ3JlZW4tc3BlY3RhdG9yL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHNvbGlkIGZyb20gJ3ZpdGUtcGx1Z2luLXNvbGlkJ1xyXG5pbXBvcnQgdW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgbWR4IGZyb20gJ0BtZHgtanMvcm9sbHVwJ1xyXG5pbXBvcnQgcmVtYXJrR2ZtIGZyb20gJ3JlbWFyay1nZm0nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHVub2NzcygpLFxyXG4gICAge1xyXG4gICAgICAuLi5tZHgoe1xyXG4gICAgICAgIGpzeDogdHJ1ZSxcclxuICAgICAgICBqc3hJbXBvcnRTb3VyY2U6ICdzb2xpZC1qcycsXHJcbiAgICAgICAgcHJvdmlkZXJJbXBvcnRTb3VyY2U6ICdzb2xpZC1tZHgnLFxyXG4gICAgICAgIHJlbWFya1BsdWdpbnM6IFtyZW1hcmtHZm1dXHJcbiAgICAgIH0pLFxyXG4gICAgICBlbmZvcmNlOiAncHJlJ1xyXG4gICAgfSxcclxuICAgIHNvbGlkKHsgZXh0ZW5zaW9uczogWycubWQnLCAnLm1keCddIH0pXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnZXNuZXh0J1xyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVCxTQUFTLG9CQUFvQjtBQUM5VSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFFdEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1A7QUFBQSxNQUNFLEdBQUcsSUFBSTtBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsaUJBQWlCO0FBQUEsUUFDakIsc0JBQXNCO0FBQUEsUUFDdEIsZUFBZSxDQUFDLFNBQVM7QUFBQSxNQUMzQixDQUFDO0FBQUEsTUFDRCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPLE1BQU0sRUFBRSxDQUFDO0FBQUEsRUFDdkM7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
