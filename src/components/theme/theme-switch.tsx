"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

export default function ThemeSwitch() {
  const { switchTheme } = useThemeSwitch();
  const { t } = useTranslation("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchTheme("light")}>
          <SunIcon className="mr-2 size-4" />
          <span>{t("themes.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTheme("dark")}>
          <MoonIcon className="mr-2 size-4" />
          <span>{t("themes.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchTheme("system")}>
          <LaptopIcon className="mr-2 size-4" />
          <span>{t("themes.system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
