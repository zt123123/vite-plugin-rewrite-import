import { parse } from 'es-module-lexer';
import MagicString from 'magic-string';

export interface Options {
  libName: string | string[],
  extension: RegExp
}

export default function vitePluginRewriteImport(options: Options) {
  if (!options || !options.libName || !options.extension) {
    throw new Error("options is required!")
  }
  let { extension, libName } = options
  libName = typeof libName === "string" ? [libName] : libName
  return {
    name: 'vite-plugin-rewrite-import',
    transform(code: string, id: string) {
      if (extension.test(id)) {
        const [imports] = parse(code);
        const magic = new MagicString(code);
        imports.forEach(item => {
          const { n, s, e, ss } = item
          if (!n) return
          const [lib, method] = n.split('/')
          if (libName.includes(n)) {
            magic.update(s, e, `${lib}`)
            magic.update(ss, s - 1, `import { ${method} as _${method} } from `)
          }
        });
        return magic.toString()
      }
      return
    }
  }
}