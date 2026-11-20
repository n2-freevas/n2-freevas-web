# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## /jubilee(Vercel Microfrontends)

`/jubilee` 以下は別リポジトリの [jubilee-web](https://github.com/n2-freevas/jubilee-web) が配信する。振り分けは Vercel Microfrontends で、このアプリがデフォルトアプリ。ルーティング表は [microfrontends.json](microfrontends.json)。

手元で `/jubilee` も含めて見るときは、`npm run dev` と並べて proxy を動かし、http://localhost:3024 を開く。

```bash
npm run dev:proxy                                              # /jubilee は本番の www.n2freevas.com から取る
npx microfrontends proxy --local-apps n2-freevas-web jubilee-web  # jubilee-web も手元(1541 番)で動かしているとき
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
