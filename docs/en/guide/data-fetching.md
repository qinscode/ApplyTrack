# Data Fetching

- Use [`ofetch`](https://github.com/unjs/ofetch) to fetch data

- Use [`@tanstack/react-query`](https://tanstack.com/query/latest/docs/framework/react/overview) to manage server data

## Fetching Data

### Using `useQuery` to fetch data

- Directly use

```tsx
// src/pages/post.tsx
// define fetcher
const fetcher = (url: string) => ofetch(url, { method: 'GET' });

// use `useQuery` to fetch data
const { data, isLoading, isError, error } = useQuery({ queryKey: ['posts'], queryFn: fetcher });

// usage
// pages/post.tsx
export function Component() {
  const { data, isLoading, isError, error } = usePosts();

  return <div>{data.title}</div>;
}
```

- Custom hook (Recommended)

Because react-query will cache data, I don't know when it will be used multiple times, so I like to manage all of them with custom hooks
(Single Source of Truth?)

```ts
// hooks/query/use-posts.ts
// define fetcher
const fetcher = (url: string) => ofetch(url, { method: 'GET' });

// use `useQuery` to fetch data
export function usePosts() {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['posts'], queryFn: fetcher });

  return { data, isLoading, isError, error };
}

// usage
// pages/post.tsx
export function Component() {
  const { data, isLoading, isError, error } = usePosts();

  return <div>{data.title}</div>;
}
```

### Using react-router's loader to fetch data

> https://reactrouter.com/en/main/route/loader

- Basic usage

```tsx
// src/pages/post.tsx

const loader = async () => {
  const data = await fetcher('/api/posts');
  return data;
};

// use it
// pages/post.tsx
export function Component() {
  const data = useLoaderData();

  return <div>{data.title}</div>;
}
```

### use react-router + react-query to fetch data

I haven't used it yet, I'll write it when I use it

> https://github.com/remix-run/react-router/tree/main/examples/query

## Submitting Data

### Using `useMutation` to submit data

```tsx
// src/pages/post.tsx

const mutation = useMutation({ mutationFn: fetcher });

// usage
// pages/post.tsx
export function Component() {
  const { mutate, isPending, isError, error } = mutation;

  return <button onClick={mutate}>Submit</button>;
}
```

### Using react-router's action to submit data

I haven't used it yet, I'll write it when I use it

> https://reactrouter.com/en/main/route/action





