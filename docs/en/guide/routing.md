# Routing

shadcnui-boilerplate uses a **file-system based router** where folders are used to define routes.

> [!IMPORTANT]
> This feature is implemented by [Innei](https://github.com/innei). Source code is [here](https://github.com/innei-template/vite-react-tailwind-template/blob/master/src/utils/route-builder.ts). Thanks for **Innei**!

`route-builder` is a file-system based router that uses Vite's [Glob Import](https://cn.vitejs.dev/guide/features#glob-import) to read files and implement the routing.

::: details Why use `React Router` instead of `TanStack Router`?

> 1. I tried `TanStack Router` but found it difficult to use.
> 2. I'm waiting for `react-router@v7`'s file routing.
> 3. Let the bullets fly.

:::

> [!TIP]
> By default, the `pages` directory is used to store pages, and the `components` and `_components` directories are excluded.

## Creating Routes

- Each directory represents a route segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.
  - `pages/home/index.tsx` corresponds to the route `/home`
  - `pages/home/about.tsx` corresponds to the route `/home/about`
- [Nested Routes](./route-group.md)

## Creating UI

To create the first page, add an index.tsx file to the application directory and export a React component:

> [!IMPORTANT]
> Note that the component name must be `Component`, otherwise it will not be recognized as a page.

```tsx
// src/pages/index.tsx
export const Component = () => {
  return <div>Hello, shadcn/ui boilerplate</div>
}
```

