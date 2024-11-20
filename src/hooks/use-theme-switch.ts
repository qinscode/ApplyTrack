import { useTheme } from "@/components/theme/theme-provider";
import { useCallback } from "react";

export type Theme = "light" | "dark" | "system";

export function useThemeSwitch() {
  const { setTheme } = useTheme();

  const switchTheme = useCallback((theme: Theme) => {
    setTheme(theme);
  }, [setTheme]);

  return {
    switchTheme,
  };
}
