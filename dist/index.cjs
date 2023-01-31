"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => vitePluginRewriteImport
});
module.exports = __toCommonJS(src_exports);
var import_es_module_lexer = require("es-module-lexer");
var import_magic_string = __toESM(require("magic-string"), 1);
function vitePluginRewriteImport(options) {
  if (!options || !options.libName || !options.extension) {
    throw new Error("options is required!");
  }
  let { extension, libName } = options;
  libName = typeof libName === "string" ? [libName] : libName;
  return {
    name: "vite-plugin-rewrite-import",
    transform(code, id) {
      if (extension.test(id)) {
        const [imports] = (0, import_es_module_lexer.parse)(code);
        const magic = new import_magic_string.default(code);
        imports.forEach((item) => {
          const { n, s, e, ss } = item;
          if (!n)
            return;
          const [lib, method] = n.split("/");
          if (libName.includes(n)) {
            magic.update(s, e, `${lib}`);
            magic.update(ss, s - 1, `import { ${method} as _${method} } from `);
          }
        });
        return magic.toString();
      }
      return;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
