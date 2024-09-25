import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },
      {
        path: "jobs",
        lazy: async () => ({
          Component: (await import("./pages/jobs/All")).default,
        }),
      },

      {
        path: "jobs/new",
        lazy: async () => ({
          Component: (await import("./pages/jobs/new")).default,
        }),
      },

      {
        path: "jobs/pending",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Pending")).default,
        }),
      },

      {
        path: "jobs/applied",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Applied")).default,
        }),
      },

      {
        path: "jobs/archived",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Applied")).default,
        }),
      },
      {
        path: "jobs/reviewed",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Reviewed")).default,
        }),
      },
      {
        path: "jobs/accepted",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Accepted")).default,
        }),
      },

      {
        path: "jobs/ghosting",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Ghosting")).default,
        }),
      },

      {
        path: "jobs/rejected",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Rejected")).default,
        }),
      },

      {
        path: "jobs/interviewing",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Interviewing")).default,
        }),
      },

      {
        path: "jobs/technical-assessment",
        lazy: async () => ({
          Component: (await import("./pages/jobs/Technical Assessment"))
            .default,
        }),
      },

      {
        path: "settings",
        lazy: async () => ({
          Component: (await import("./pages/settings")).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/settings/profile")).default,
            }),
          },
          {
            path: "account",
            lazy: async () => ({
              Component: (await import("./pages/settings/account")).default,
            }),
          },
        ],
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
