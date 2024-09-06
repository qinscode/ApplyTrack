# Redirect

Suppose we want to redirect to `/dashboard` after login, but we want to go to `/dashboard/overview` page, we can

## `redirect`

```tsx
// src/dashboard/index.tsx
import { redirect } from "react-router-dom"

export function loader() {
  return redirect("/dashboard/overview")
}

export function Component() {
  return null
}
```

## `<Navigate/>`

```tsx
// src/dashboard/index.tsx
import { Navigate } from "react-router-dom"

export function Component() {
  return <Navigate to="/dashboard/overview" replace={true} />
}
```
