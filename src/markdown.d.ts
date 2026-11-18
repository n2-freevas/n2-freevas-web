/** vite-plugins/markdown.ts が .md をビルド時に変換したもの */
declare module "*.md" {
  const doc: { html: string; meta: Record<string, string> };
  export default doc;
}
