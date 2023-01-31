interface Options {
    libName: string | string[];
    extension: RegExp;
}
declare function vitePluginRewriteImport(options: Options): {
    name: string;
    transform(code: string, id: string): string | undefined;
};

export { Options, vitePluginRewriteImport as default };
