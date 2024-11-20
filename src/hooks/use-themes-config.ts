import type { Theme } from "@/lib/themes";
import { THEMES } from "@/lib/themes";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type ThemesConfig = {
  activeTheme: Theme;
};

const configAtom = atomWithStorage<ThemesConfig>("themes:config", {
  // @ts-expect-error No way to infer the type of the first theme
  activeTheme: THEMES[0],
});

export function useThemesConfig() {
  const [themesConfig, setThemesConfig] = useAtom(configAtom);

  return { themesConfig, setThemesConfig };
}
