import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import router from "@/router";
import "@/index.css";
import { RootProviders } from "@/providers/root-providers.tsx";

// backup console.warn 和 console.error
const originalWarn = console.warn;
const originalError = console.error;

console.warn = function (message, ...args) {
  if (message.includes("Support for defaultProps")) {
    return; // skip this warning
  }
  originalWarn.apply(console, [message, ...args]);
};

console.error = function (message, ...args) {
  if (message.includes("Support for defaultProps")) {
    return; // skip this error
  }
  originalError.apply(console, [message, ...args]);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootProviders>
      <Provider store={store}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </Provider>
    </RootProviders>
  </React.StrictMode>
);
