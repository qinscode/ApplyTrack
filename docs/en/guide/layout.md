# Layout

In some pages, we need to share some UI, here we agree to use `layout.tsx` to implement it.

- `layout.tsx` is used to define the layout

```tsx
// src/dashboard/layout.tsx
import { Outlet } from "react-router-dom";

export function Component() {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      <Outlet />
    </section>
  )
}
```

```tsx
// src/dashboard/settings/page.tsx
export function Component() {
  return <div>Settings</div>
}
```

The above layout file will be rendered as follows:

- `/dashboard` page will be rendered as `DashboardLayout` component

- `/dashboard/settings` page will be rendered as `DashboardLayout` component, and `Outlet` will be replaced with `SettingsPage` component


