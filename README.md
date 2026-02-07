# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Tailwind CSS / PostCSS notes

This project uses Tailwind CSS (v4) and PostCSS. A couple of notes to avoid common issues:

- We use the separate PostCSS adapter for Tailwind v4: `@tailwindcss/postcss`.
	If you add or update Tailwind versions, ensure this package is present in `devDependencies`.
- The repository contains `postcss.config.cjs` which sets up the PostCSS plugins used by Vite.
- To install or update the tooling locally, run:

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

- To start the dev server:

```bash
npm run dev
```

If you ever need to re-generate the default Tailwind config, you can run a one-off CLI command (this may be less reproducible than installing the CLI locally):

```bash
npx --yes tailwindcss@latest init -p
```
