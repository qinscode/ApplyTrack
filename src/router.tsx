import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";
import AppShell from "@/components/app-shell.tsx";

const router = createBrowserRouter([
  // Auth routes (not protected)
  {
    path: "/sign-in",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-in")).default,
    }),
  },
  {
    path: "/sign-in-2",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-in-2")).default,
    }),
  },
  {
    path: "/sign-up",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-up")).default,
    }),
  },
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("./pages/auth/forgot-password")).default,
    }),
  },
  {
    path: "/otp",
    lazy: async () => ({
      Component: (await import("./pages/auth/otp")).default,
    }),
  },

  // Protected routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },
      // ... other protected routes ...
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  // { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
