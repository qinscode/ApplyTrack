import "./styles/index.css"
import "./i18n"

import { env } from "@env"
// @ts-expect-error
import { ClickToComponent } from "click-to-react-component"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { Fallback } from "@/components/fallback"
import { ThemeCustomizer } from "@/components/theme/theme-customizer"
import { RootProviders } from "@/providers/root-providers"

import { router } from "./router"

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <RootProviders>
      <RouterProvider
        router={router}
        fallbackElement={<Fallback />}
      />
      <ThemeCustomizer className="fixed bottom-4 right-4 z-[9999]" />
    </RootProviders>
    <ClickToComponent editor={env.VITE_EDITOR} />
  </React.StrictMode>,
)
