import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import router from "@/router";
import "@/index.css";

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
