# FAQ

## Why use `vite`

Because I'm used to it, but I might try [rsbuild](https://rsbuild.dev/)

## Why `ofetch`

Because **Type Friendly** article can get the type directly, `axios` needs to process the interceptor

```ts
const article = await ofetch<Article>(`/api/article/${id}`);

```

## Why `react-query`

Because I don't like the conditional fetching syntax of `swr`

> https://swr.vercel.app/zh-CN/docs/conditional-fetching

```ts
// Conditional fetching
const { data } = useSWR(shouldFetch ? '/api/data' : null, fetcher)

// ...or return a falsy value
```

## Why `react-router`

1. Because I saw [Innei](https://github.com/innei) implemented file routing based on `react-router`
2. I tried `TanStack Router` briefly, but I didn't like the API of `TanStack Router`, so I switched back to `react-router`
3. And I'm looking forward to the file routing of `react-router@v7`
4. Let the bullets fly, I'll try `TanStack Router` in the next few versions, or wait for the file routing of `react-router@v7`

## Will there be a Next.js version

There may be one, but it will take some time, because I need to do something else, I currently only need the SPA version
