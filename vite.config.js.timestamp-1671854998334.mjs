var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/.map.json
var map_exports = {};
__export(map_exports, {
  default: () => map_default
});
var map_default;
var init_map = __esm({
  "src/.map.json"() {
    map_default = [{ name: "assessment-to-china-s-recent-emission-pattern-shifts", file: "assessment-to-china-s-recent-emission-pattern-shifts.en.md", meta: { title: "Assessment to China's Recent Emission Pattern Shifts", description: "This article assesses current green house gas emission effect considering recent developments such as the COVID-19 epidemic", language: "en", tags: ["Science Article"], cover: "./assessment-to-china-s-recent-emission-pattern-shifts/cover.jpg", date: "2023-05-13T22:30:00.000Z" } }, { name: "demo-article", file: "demo-article.en.md", meta: { title: "Hello World", description: "Article Description", language: "en", tags: ["Tag1", "Tag2"], cover: "./demo-article/bg.jpg", date: "2018-12-31T16:00:00.000Z" } }, { name: "demo-article", file: "demo-article.zh.md", meta: { title: "\u4E2D\u6587\u6807\u9898", description: "\u4E2D\u6587\u63CF\u8FF0", language: "zh", tags: ["Tag1", "Tag2"], cover: "./demo-article/bg.jpg", date: "2018-12-31T16:00:00.000Z" } }];
  }
});

// vite.config.js
import { defineConfig } from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.4/node_modules/vite/dist/node/index.js";
import solid from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-solid@2.4.0_solid-js@1.6.2+vite@3.2.4/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import unocss from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+unocss@0.47.3_rollup@3.5.0+vite@3.2.4/node_modules/unocss/dist/vite.mjs";
import mdx from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+@mdx-js+rollup@2.1.5_rollup@3.5.0/node_modules/@mdx-js/rollup/index.js";
import remarkGfm from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+remark-gfm@3.0.1/node_modules/remark-gfm/index.js";
import remarkFrontmatter from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+remark-frontmatter@4.0.1/node_modules/remark-frontmatter/index.js";

// scripts/parseArticles.js
import fs from "fs/promises";
import yaml from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+js-yaml@4.1.0/node_modules/js-yaml/dist/js-yaml.mjs";
async function parseArticles() {
  let map = "export default [";
  const mapJson = [];
  for (const file of await fs.readdir("./articles")) {
    if (file.endsWith(".md")) {
      const name = file.split(".")[0];
      const re = /---\s*([\s\S]*?)\s*---/g;
      const meta = yaml.loadAll(
        re.exec(await fs.readFile("./articles/" + file))[1]
      )[0];
      map += `
  {
    name: '${name}',
    file: '${file}',
    meta: ${JSON.stringify(meta)},
    body: async () => await import('../articles/${file}')
  },`;
      mapJson.push({
        name,
        file,
        meta
      });
    }
  }
  await fs.writeFile("./src/.map.js", map + "]");
  await fs.writeFile("./src/.map.json", JSON.stringify(mapJson));
}
var parseArticles_default = () => {
  return {
    name: "parseArticles",
    enforce: "pre",
    async buildStart() {
      console.log("parseArticles buildStart");
      await parseArticles();
    }
  };
};

// scripts/routes.js
var routes_default = async () => {
  const routes = [
    {
      path: "/",
      meta: {
        descriptionZh: "\u9996\u9875",
        descriptionEn: "Home Page",
        keywordsZh: "\u9996\u9875, \u793A\u4F8B",
        keywordsEn: "home, demo"
      },
      titleZh: "Green Spectator - \u9996\u9875",
      titleEn: "Green Spectator - Home"
    },
    {
      path: "/articles",
      meta: {
        descriptionZh: "\u6587\u7AE0\u5217\u8868",
        descriptionEn: "Articles Page",
        keywordsZh: "\u6587\u7AE0\u5217\u8868, \u793A\u4F8B",
        keywordsEn: "articles, demo"
      },
      titleZh: "Green Spectator - \u6587\u7AE0",
      titleEn: "Green Spectator - Articles"
    }
  ];
  const articles = {};
  const map = await (await Promise.resolve().then(() => (init_map(), map_exports))).default;
  for (const article of map) {
    if (articles[article.name]) {
      if (article.meta.language === "zh") {
        articles[article.name].meta.descriptionZh = article.meta.description;
        articles[article.name].meta.keywordsZh = article.meta.tags.join(", ");
        articles[article.name].titleZh = article.meta.title;
      } else {
        articles[article.name].meta.descriptionEn = article.meta.description;
        articles[article.name].meta.keywordsEn = article.meta.tags.join(", ");
        articles[article.name].titleEn = article.meta.title;
      }
    } else {
      articles[article.name] = {
        path: `/articles/${article.name}`,
        meta: {
          descriptionZh: article.meta.language === "zh" ? article.meta.description : "",
          descriptionEn: article.meta.language === "en" ? article.meta.description : "",
          keywordsZh: article.meta.language === "zh" ? article.meta.tags.join(", ") : "",
          keywordsEn: article.meta.language === "en" ? article.meta.tags.join(", ") : ""
        },
        titleZh: article.meta.language === "zh" ? article.meta.title : "",
        titleEn: article.meta.language === "en" ? article.meta.title : ""
      };
    }
  }
  for (const article of Object.values(articles)) {
    routes.push(article);
  }
  return routes;
};

// scripts/generateMeta.js
import path from "path";
import { readFile, writeFile, mkdir } from "fs/promises";
import pkg from "file:///D:/Users/lihe07/Desktop/green-spectator/node_modules/.pnpm/registry.npmmirror.com+htmlnano@2.0.3/node_modules/htmlnano/index.js";
var { process } = pkg;
function destinationPath(path2) {
  if (path2 === "/")
    return "/index.html";
  return path2 + "/index.html";
}
function makeMeta(name, content) {
  let lang = "en";
  if (name.endsWith("Zh")) {
    lang = "zh";
  }
  name = name.replace(/(Zh|En)$/, "");
  return `<meta name="${name}" content="${content}" lang="${lang}">`;
}
async function generateMeta() {
  const template = await readFile("./dist/index.html", { encoding: "utf8" });
  for (const node of await routes_default()) {
    const destination = path.join("./dist", destinationPath(node.path));
    let meta = "";
    for (const key in node.meta) {
      meta += makeMeta(key, node.meta[key]);
    }
    meta += `<title lang="zh">${node.titleZh}</title>`;
    meta += `<title lang="en">${node.titleEn}</title>`;
    let html = template.replace("<!-- !!DO NOT CHANGE!! -->", meta);
    html = (await process(html, {
      minifyCss: false,
      minifyJs: false,
      minifySvg: false
    })).html;
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html, { encoding: "utf8" });
  }
}
var generateMeta_default = () => {
  return {
    name: "generateMeta",
    apply: "build",
    async closeBundle() {
      await generateMeta();
    }
  };
};

// scripts/generateSitemap.js
import { writeFile as writeFile2 } from "fs/promises";
var site = "https://example.com";
function makeUrl(location) {
  const current = new Date();
  const lastmod = current.toISOString();
  return `<url><loc>${site}${location}</loc><lastmod>${lastmod}</lastmod></url>`;
}
async function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  for (const node of await routes_default()) {
    sitemap += makeUrl(node.path);
  }
  sitemap += "</urlset>";
  await writeFile2("./dist/sitemap.xml", sitemap);
}
var generateSitemap_default = () => {
  return {
    name: "generateSitemap",
    apply: "build",
    async closeBundle() {
      await generateSitemap();
    }
  };
};

// vite.config.js
var vite_config_default = defineConfig({
  plugins: [
    unocss(),
    parseArticles_default(),
    generateMeta_default(),
    generateSitemap_default(),
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkGfm, remarkFrontmatter]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic2NyaXB0cy9wYXJzZUFydGljbGVzLmpzIiwgInNjcmlwdHMvcm91dGVzLmpzIiwgInNjcmlwdHMvZ2VuZXJhdGVNZXRhLmpzIiwgInNjcmlwdHMvZ2VuZXJhdGVTaXRlbWFwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcbGloZTA3XFxcXERlc2t0b3BcXFxcZ3JlZW4tc3BlY3RhdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxncmVlbi1zcGVjdGF0b3JcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1VzZXJzL2xpaGUwNy9EZXNrdG9wL2dyZWVuLXNwZWN0YXRvci92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBzb2xpZCBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCdcclxuaW1wb3J0IHVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IG1keCBmcm9tICdAbWR4LWpzL3JvbGx1cCdcclxuaW1wb3J0IHJlbWFya0dmbSBmcm9tICdyZW1hcmstZ2ZtJ1xyXG5pbXBvcnQgcmVtYXJrRnJvbnRtYXR0ZXIgZnJvbSAncmVtYXJrLWZyb250bWF0dGVyJ1xyXG5pbXBvcnQgcGFyc2VBcnRpY2xlcyBmcm9tICcuL3NjcmlwdHMvcGFyc2VBcnRpY2xlcydcclxuaW1wb3J0IGdlbmVyYXRlTWV0YSBmcm9tICcuL3NjcmlwdHMvZ2VuZXJhdGVNZXRhJ1xyXG5pbXBvcnQgZ2VuZXJhdGVTaXRlbWFwIGZyb20gJy4vc2NyaXB0cy9nZW5lcmF0ZVNpdGVtYXAnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIC8vIHNlcnZlcjogeyBodHRwczogdHJ1ZSB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHVub2NzcygpLFxyXG4gICAgcGFyc2VBcnRpY2xlcygpLFxyXG4gICAgZ2VuZXJhdGVNZXRhKCksXHJcbiAgICBnZW5lcmF0ZVNpdGVtYXAoKSxcclxuICAgIHtcclxuICAgICAgLi4ubWR4KHtcclxuICAgICAgICBqc3g6IHRydWUsXHJcbiAgICAgICAganN4SW1wb3J0U291cmNlOiAnc29saWQtanMnLFxyXG4gICAgICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiAnc29saWQtbWR4JyxcclxuICAgICAgICByZW1hcmtQbHVnaW5zOiBbcmVtYXJrR2ZtLCByZW1hcmtGcm9udG1hdHRlcl1cclxuICAgICAgfSksXHJcbiAgICAgIGVuZm9yY2U6ICdwcmUnXHJcbiAgICB9LFxyXG4gICAgc29saWQoeyBleHRlbnNpb25zOiBbJy5tZCcsICcubWR4J10gfSlcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICB0YXJnZXQ6ICdlc25leHQnXHJcbiAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFVzZXJzXFxcXGxpaGUwN1xcXFxEZXNrdG9wXFxcXGdyZWVuLXNwZWN0YXRvclxcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxncmVlbi1zcGVjdGF0b3JcXFxcc2NyaXB0c1xcXFxwYXJzZUFydGljbGVzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Vc2Vycy9saWhlMDcvRGVza3RvcC9ncmVlbi1zcGVjdGF0b3Ivc2NyaXB0cy9wYXJzZUFydGljbGVzLmpzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzL3Byb21pc2VzJ1xyXG5pbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xyXG5cclxuLy8gUnVuIGJlZm9yZSB2aXRlXHJcblxyXG4vLyBQYXJzZSBhcnRpY2xlcyBmcm9tIHRoZSBhcnRpY2xlcyBmb2xkZXJcclxuLy8gYW5kIGdlbmVyYXRlIGEgLm1hcC5qc29uIGZpbGUgd2l0aCB0aGUgYXJ0aWNsZSBkYXRhXHJcblxyXG5hc3luYyBmdW5jdGlvbiBwYXJzZUFydGljbGVzICgpIHtcclxuICBsZXQgbWFwID0gJ2V4cG9ydCBkZWZhdWx0IFsnXHJcbiAgY29uc3QgbWFwSnNvbiA9IFtdXHJcbiAgZm9yIChjb25zdCBmaWxlIG9mIGF3YWl0IGZzLnJlYWRkaXIoJy4vYXJ0aWNsZXMnKSkge1xyXG4gICAgaWYgKGZpbGUuZW5kc1dpdGgoJy5tZCcpKSB7XHJcbiAgICAgIC8vIFtuYW1lXS5bbGFuZ3VhZ2VdLm1kXHJcbiAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLnNwbGl0KCcuJylbMF1cclxuICAgICAgY29uc3QgcmUgPSAvLS0tXFxzKihbXFxzXFxTXSo/KVxccyotLS0vZ1xyXG4gICAgICBjb25zdCBtZXRhID0geWFtbC5sb2FkQWxsKFxyXG4gICAgICAgIHJlLmV4ZWMoYXdhaXQgZnMucmVhZEZpbGUoJy4vYXJ0aWNsZXMvJyArIGZpbGUpKVsxXVxyXG4gICAgICApWzBdXHJcbiAgICAgIG1hcCArPSBgXHJcbiAge1xyXG4gICAgbmFtZTogJyR7bmFtZX0nLFxyXG4gICAgZmlsZTogJyR7ZmlsZX0nLFxyXG4gICAgbWV0YTogJHtKU09OLnN0cmluZ2lmeShtZXRhKX0sXHJcbiAgICBib2R5OiBhc3luYyAoKSA9PiBhd2FpdCBpbXBvcnQoJy4uL2FydGljbGVzLyR7ZmlsZX0nKVxyXG4gIH0sYFxyXG4gICAgICBtYXBKc29uLnB1c2goe1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBtZXRhXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGF3YWl0IGZzLndyaXRlRmlsZSgnLi9zcmMvLm1hcC5qcycsIG1hcCArICddJylcclxuICBhd2FpdCBmcy53cml0ZUZpbGUoJy4vc3JjLy5tYXAuanNvbicsIEpTT04uc3RyaW5naWZ5KG1hcEpzb24pKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdwYXJzZUFydGljbGVzJyxcclxuICAgIGVuZm9yY2U6ICdwcmUnLFxyXG4gICAgYXN5bmMgYnVpbGRTdGFydCAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwYXJzZUFydGljbGVzIGJ1aWxkU3RhcnQnKVxyXG4gICAgICBhd2FpdCBwYXJzZUFydGljbGVzKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxncmVlbi1zcGVjdGF0b3JcXFxcc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcbGloZTA3XFxcXERlc2t0b3BcXFxcZ3JlZW4tc3BlY3RhdG9yXFxcXHNjcmlwdHNcXFxccm91dGVzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Vc2Vycy9saWhlMDcvRGVza3RvcC9ncmVlbi1zcGVjdGF0b3Ivc2NyaXB0cy9yb3V0ZXMuanNcIjtleHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVzID0gW1xyXG4gICAge1xyXG4gICAgICBwYXRoOiAnLycsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkZXNjcmlwdGlvblpoOiAnXHU5OTk2XHU5ODc1JyxcclxuICAgICAgICBkZXNjcmlwdGlvbkVuOiAnSG9tZSBQYWdlJyxcclxuICAgICAgICBrZXl3b3Jkc1poOiAnXHU5OTk2XHU5ODc1LCBcdTc5M0FcdTRGOEInLFxyXG4gICAgICAgIGtleXdvcmRzRW46ICdob21lLCBkZW1vJ1xyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZVpoOiAnR3JlZW4gU3BlY3RhdG9yIC0gXHU5OTk2XHU5ODc1JyxcclxuICAgICAgdGl0bGVFbjogJ0dyZWVuIFNwZWN0YXRvciAtIEhvbWUnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwYXRoOiAnL2FydGljbGVzJyxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uWmg6ICdcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjgnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uRW46ICdBcnRpY2xlcyBQYWdlJyxcclxuICAgICAgICBrZXl3b3Jkc1poOiAnXHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4LCBcdTc5M0FcdTRGOEInLFxyXG4gICAgICAgIGtleXdvcmRzRW46ICdhcnRpY2xlcywgZGVtbydcclxuICAgICAgfSxcclxuICAgICAgdGl0bGVaaDogJ0dyZWVuIFNwZWN0YXRvciAtIFx1NjU4N1x1N0FFMCcsXHJcbiAgICAgIHRpdGxlRW46ICdHcmVlbiBTcGVjdGF0b3IgLSBBcnRpY2xlcydcclxuICAgIH1cclxuICBdXHJcbiAgY29uc3QgYXJ0aWNsZXMgPSB7fVxyXG5cclxuICBjb25zdCBtYXAgPSBhd2FpdCAoYXdhaXQgaW1wb3J0KCcuLi9zcmMvLm1hcC5qc29uJykpLmRlZmF1bHRcclxuXHJcbiAgZm9yIChjb25zdCBhcnRpY2xlIG9mIG1hcCkge1xyXG4gICAgaWYgKGFydGljbGVzW2FydGljbGUubmFtZV0pIHtcclxuICAgICAgaWYgKGFydGljbGUubWV0YS5sYW5ndWFnZSA9PT0gJ3poJykge1xyXG4gICAgICAgIGFydGljbGVzW2FydGljbGUubmFtZV0ubWV0YS5kZXNjcmlwdGlvblpoID0gYXJ0aWNsZS5tZXRhLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgYXJ0aWNsZXNbYXJ0aWNsZS5uYW1lXS5tZXRhLmtleXdvcmRzWmggPSBhcnRpY2xlLm1ldGEudGFncy5qb2luKCcsICcpXHJcbiAgICAgICAgYXJ0aWNsZXNbYXJ0aWNsZS5uYW1lXS50aXRsZVpoID0gYXJ0aWNsZS5tZXRhLnRpdGxlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXJ0aWNsZXNbYXJ0aWNsZS5uYW1lXS5tZXRhLmRlc2NyaXB0aW9uRW4gPSBhcnRpY2xlLm1ldGEuZGVzY3JpcHRpb25cclxuICAgICAgICBhcnRpY2xlc1thcnRpY2xlLm5hbWVdLm1ldGEua2V5d29yZHNFbiA9IGFydGljbGUubWV0YS50YWdzLmpvaW4oJywgJylcclxuICAgICAgICBhcnRpY2xlc1thcnRpY2xlLm5hbWVdLnRpdGxlRW4gPSBhcnRpY2xlLm1ldGEudGl0bGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJ0aWNsZXNbYXJ0aWNsZS5uYW1lXSA9IHtcclxuICAgICAgICBwYXRoOiBgL2FydGljbGVzLyR7YXJ0aWNsZS5uYW1lfWAsXHJcbiAgICAgICAgbWV0YToge1xyXG4gICAgICAgICAgZGVzY3JpcHRpb25aaDpcclxuICAgICAgICAgICAgYXJ0aWNsZS5tZXRhLmxhbmd1YWdlID09PSAnemgnID8gYXJ0aWNsZS5tZXRhLmRlc2NyaXB0aW9uIDogJycsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbkVuOlxyXG4gICAgICAgICAgICBhcnRpY2xlLm1ldGEubGFuZ3VhZ2UgPT09ICdlbicgPyBhcnRpY2xlLm1ldGEuZGVzY3JpcHRpb24gOiAnJyxcclxuICAgICAgICAgIGtleXdvcmRzWmg6XHJcbiAgICAgICAgICAgIGFydGljbGUubWV0YS5sYW5ndWFnZSA9PT0gJ3poJyA/IGFydGljbGUubWV0YS50YWdzLmpvaW4oJywgJykgOiAnJyxcclxuICAgICAgICAgIGtleXdvcmRzRW46XHJcbiAgICAgICAgICAgIGFydGljbGUubWV0YS5sYW5ndWFnZSA9PT0gJ2VuJyA/IGFydGljbGUubWV0YS50YWdzLmpvaW4oJywgJykgOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGVaaDogYXJ0aWNsZS5tZXRhLmxhbmd1YWdlID09PSAnemgnID8gYXJ0aWNsZS5tZXRhLnRpdGxlIDogJycsXHJcbiAgICAgICAgdGl0bGVFbjogYXJ0aWNsZS5tZXRhLmxhbmd1YWdlID09PSAnZW4nID8gYXJ0aWNsZS5tZXRhLnRpdGxlIDogJydcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9yIChjb25zdCBhcnRpY2xlIG9mIE9iamVjdC52YWx1ZXMoYXJ0aWNsZXMpKSB7XHJcbiAgICByb3V0ZXMucHVzaChhcnRpY2xlKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJvdXRlc1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVXNlcnNcXFxcbGloZTA3XFxcXERlc2t0b3BcXFxcZ3JlZW4tc3BlY3RhdG9yXFxcXHNjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFVzZXJzXFxcXGxpaGUwN1xcXFxEZXNrdG9wXFxcXGdyZWVuLXNwZWN0YXRvclxcXFxzY3JpcHRzXFxcXGdlbmVyYXRlTWV0YS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVXNlcnMvbGloZTA3L0Rlc2t0b3AvZ3JlZW4tc3BlY3RhdG9yL3NjcmlwdHMvZ2VuZXJhdGVNZXRhLmpzXCI7aW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcy5qcydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgcmVhZEZpbGUsIHdyaXRlRmlsZSwgbWtkaXIgfSBmcm9tICdmcy9wcm9taXNlcydcclxuaW1wb3J0IHBrZyBmcm9tICdodG1sbmFubydcclxuXHJcbmNvbnN0IHsgcHJvY2VzcyB9ID0gcGtnXHJcblxyXG5mdW5jdGlvbiBkZXN0aW5hdGlvblBhdGggKHBhdGgpIHtcclxuICBpZiAocGF0aCA9PT0gJy8nKSByZXR1cm4gJy9pbmRleC5odG1sJ1xyXG4gIHJldHVybiBwYXRoICsgJy9pbmRleC5odG1sJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlTWV0YSAobmFtZSwgY29udGVudCkge1xyXG4gIGxldCBsYW5nID0gJ2VuJ1xyXG4gIGlmIChuYW1lLmVuZHNXaXRoKCdaaCcpKSB7XHJcbiAgICBsYW5nID0gJ3poJ1xyXG4gIH1cclxuICAvLyBUcmltXHJcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvKFpofEVuKSQvLCAnJylcclxuICByZXR1cm4gYDxtZXRhIG5hbWU9XCIke25hbWV9XCIgY29udGVudD1cIiR7Y29udGVudH1cIiBsYW5nPVwiJHtsYW5nfVwiPmBcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVNZXRhICgpIHtcclxuICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHJlYWRGaWxlKCcuL2Rpc3QvaW5kZXguaHRtbCcsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxyXG5cclxuICBmb3IgKGNvbnN0IG5vZGUgb2YgYXdhaXQgcm91dGVzKCkpIHtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcGF0aC5qb2luKCcuL2Rpc3QnLCBkZXN0aW5hdGlvblBhdGgobm9kZS5wYXRoKSlcclxuICAgIGxldCBtZXRhID0gJydcclxuICAgIGZvciAoY29uc3Qga2V5IGluIG5vZGUubWV0YSkge1xyXG4gICAgICBtZXRhICs9IG1ha2VNZXRhKGtleSwgbm9kZS5tZXRhW2tleV0pXHJcbiAgICB9XHJcblxyXG4gICAgbWV0YSArPSBgPHRpdGxlIGxhbmc9XCJ6aFwiPiR7bm9kZS50aXRsZVpofTwvdGl0bGU+YFxyXG4gICAgbWV0YSArPSBgPHRpdGxlIGxhbmc9XCJlblwiPiR7bm9kZS50aXRsZUVufTwvdGl0bGU+YFxyXG5cclxuICAgIGxldCBodG1sID0gdGVtcGxhdGUucmVwbGFjZSgnPCEtLSAhIURPIE5PVCBDSEFOR0UhISAtLT4nLCBtZXRhKVxyXG4gICAgaHRtbCA9IChcclxuICAgICAgYXdhaXQgcHJvY2VzcyhodG1sLCB7XHJcbiAgICAgICAgbWluaWZ5Q3NzOiBmYWxzZSxcclxuICAgICAgICBtaW5pZnlKczogZmFsc2UsXHJcbiAgICAgICAgbWluaWZ5U3ZnOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgKS5odG1sXHJcbiAgICAvLyBjcmVhdGUgZGlyZWN0b3J5IGlmIG5vdCBleGlzdHNcclxuICAgIGF3YWl0IG1rZGlyKHBhdGguZGlybmFtZShkZXN0aW5hdGlvbiksIHsgcmVjdXJzaXZlOiB0cnVlIH0pXHJcbiAgICBhd2FpdCB3cml0ZUZpbGUoZGVzdGluYXRpb24sIGh0bWwsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnZ2VuZXJhdGVNZXRhJyxcclxuICAgIGFwcGx5OiAnYnVpbGQnLFxyXG4gICAgYXN5bmMgY2xvc2VCdW5kbGUgKCkge1xyXG4gICAgICBhd2FpdCBnZW5lcmF0ZU1ldGEoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFVzZXJzXFxcXGxpaGUwN1xcXFxEZXNrdG9wXFxcXGdyZWVuLXNwZWN0YXRvclxcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxsaWhlMDdcXFxcRGVza3RvcFxcXFxncmVlbi1zcGVjdGF0b3JcXFxcc2NyaXB0c1xcXFxnZW5lcmF0ZVNpdGVtYXAuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1VzZXJzL2xpaGUwNy9EZXNrdG9wL2dyZWVuLXNwZWN0YXRvci9zY3JpcHRzL2dlbmVyYXRlU2l0ZW1hcC5qc1wiOy8vIGltcG9ydCByb3V0ZXMgZnJvbSAnLi4vc3JjL3JvdXRlcy5qcydcclxuaW1wb3J0IHsgd3JpdGVGaWxlIH0gZnJvbSAnZnMvcHJvbWlzZXMnXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnXHJcblxyXG5jb25zdCBzaXRlID0gJ2h0dHBzOi8vZXhhbXBsZS5jb20nXHJcblxyXG5mdW5jdGlvbiBtYWtlVXJsIChsb2NhdGlvbikge1xyXG4gIGNvbnN0IGN1cnJlbnQgPSBuZXcgRGF0ZSgpXHJcbiAgY29uc3QgbGFzdG1vZCA9IGN1cnJlbnQudG9JU09TdHJpbmcoKVxyXG4gIHJldHVybiBgPHVybD48bG9jPiR7c2l0ZX0ke2xvY2F0aW9ufTwvbG9jPjxsYXN0bW9kPiR7bGFzdG1vZH08L2xhc3Rtb2Q+PC91cmw+YFxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVNpdGVtYXAgKCkge1xyXG4gIGxldCBzaXRlbWFwID1cclxuICAgICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz48dXJsc2V0IHhtbG5zPVwiaHR0cDovL3d3dy5zaXRlbWFwcy5vcmcvc2NoZW1hcy9zaXRlbWFwLzAuOVwiPidcclxuICBmb3IgKGNvbnN0IG5vZGUgb2YgYXdhaXQgcm91dGVzKCkpIHtcclxuICAgIHNpdGVtYXAgKz0gbWFrZVVybChub2RlLnBhdGgpXHJcbiAgfVxyXG4gIHNpdGVtYXAgKz0gJzwvdXJsc2V0PidcclxuICBhd2FpdCB3cml0ZUZpbGUoJy4vZGlzdC9zaXRlbWFwLnhtbCcsIHNpdGVtYXApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2dlbmVyYXRlU2l0ZW1hcCcsXHJcbiAgICBhcHBseTogJ2J1aWxkJyxcclxuICAgIGFzeW5jIGNsb3NlQnVuZGxlICgpIHtcclxuICAgICAgYXdhaXQgZ2VuZXJhdGVTaXRlbWFwKClcclxuICAgIH1c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LFNBQVMsS0FBSyxLQUFLLEtBQUssSUFBSTtBQUFBLElBQ3RDO0FBRUEsWUFBUSxvQkFBb0IsS0FBSztBQUNqQyxZQUFRLG9CQUFvQixLQUFLO0FBRWpDLFFBQUksT0FBTyxTQUFTLFFBQVEsOEJBQThCLElBQUk7QUFDOUQsWUFDRSxNQUFNLFFBQVEsTUFBTTtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxJQUNiLENBQUMsR0FDRDtBQUVGLFVBQU0sTUFBTSxLQUFLLFFBQVEsV0FBVyxHQUFHLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDMUQsVUFBTSxVQUFVLGFBQWEsTUFBTSxFQUFFLFVBQVUsT0FBTyxDQUFDO0FBQUEsRUFDekQ7QUFDRjtBQUVBLElBQU8sdUJBQVEsTUFBTTtBQUNuQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxNQUFNLGNBQWU7QUFDbkIsWUFBTSxhQUFhO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQ0Y7OztBQ3hEQSxTQUFTLGFBQUFDLGtCQUFpQjtBQUcxQixJQUFNLE9BQU87QUFFYixTQUFTLFFBQVMsVUFBVTtBQUMxQixRQUFNLFVBQVUsSUFBSSxLQUFLO0FBQ3pCLFFBQU0sVUFBVSxRQUFRLFlBQVk7QUFDcEMsU0FBTyxhQUFhLE9BQU8sMEJBQTBCO0FBQ3ZEO0FBRUEsZUFBZSxrQkFBbUI7QUFDaEMsTUFBSSxVQUNGO0FBQ0YsYUFBVyxRQUFRLE1BQU0sZUFBTyxHQUFHO0FBQ2pDLGVBQVcsUUFBUSxLQUFLLElBQUk7QUFBQSxFQUM5QjtBQUNBLGFBQVc7QUFDWCxRQUFNQyxXQUFVLHNCQUFzQixPQUFPO0FBQy9DO0FBRUEsSUFBTywwQkFBUSxNQUFNO0FBQ25CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLE1BQU0sY0FBZTtBQUNuQixZQUFNLGdCQUFnQjtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUNGOzs7QUpwQkEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFFMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1Asc0JBQWM7QUFBQSxJQUNkLHFCQUFhO0FBQUEsSUFDYix3QkFBZ0I7QUFBQSxJQUNoQjtBQUFBLE1BQ0UsR0FBRyxJQUFJO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxpQkFBaUI7QUFBQSxRQUNqQixzQkFBc0I7QUFBQSxRQUN0QixlQUFlLENBQUMsV0FBVyxpQkFBaUI7QUFBQSxNQUM5QyxDQUFDO0FBQUEsTUFDRCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPLE1BQU0sRUFBRSxDQUFDO0FBQUEsRUFDdkM7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJ3cml0ZUZpbGUiLCAid3JpdGVGaWxlIl0KfQo=
