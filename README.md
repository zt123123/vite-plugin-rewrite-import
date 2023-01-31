# vite-plugin-rewrite-import
a vite plugin for rewriting import statement

## 用法
```ts
import vitePluginRewriteImport from 'vite-plugin-rewrite-import'

// vite.config.json
export default {
  plugins: [
    vitePluginRewriteImport({
      libName: 'lodash',
      extension: /\.tsx?/
    })
  ]
}
```

## API
```ts
interface Options {
  libName: string | string[], // 匹配模块名称
  extension: RegExp // 匹配文件类型
}
```
