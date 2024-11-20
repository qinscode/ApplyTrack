"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "./icons";

export function Search({ ...props }: ButtonProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { switchTheme } = useThemeSwitch();

  const { i18n, t } = useTranslation("common");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable)
          || e.target instanceof HTMLInputElement
          || e.target instanceof HTMLTextAreaElement
          || e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:w-64 md:w-80 lg:w-96",
          "transition-all duration-200",
          "hover:bg-muted/80",
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex items-center gap-2 capitalize">
          <Icons.search className="size-4" />
          <span className="sm:inline-flex">
            {t("search")}
            ...
          </span>
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>
          K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle asChild>
          <VisuallyHidden>
            {t("Search commands and navigation")}
          </VisuallyHidden>
        </DialogTitle>
        <CommandInput
          placeholder={t("Type a command or search...")}
          aria-label={t("Search input")}
        />
        <CommandList aria-label={t("Search results")}>
          <CommandEmpty>{t("No results found.")}</CommandEmpty>
          <CommandGroup heading={t("Links")} aria-label={t("Links")}>
            <CommandItem
              value="https://github.com/qinscode/JobTracker"
              onSelect={() => {
                runCommand(() =>
                  router.push("https://github.com/qinscode/JobTracker"),
                );
              }}
            >
              <Icons.gitHub className="mr-2 size-4" />
              GitHub
            </CommandItem>
            <CommandItem
              value="/help"
              onSelect={() => {
                runCommand(() => router.push("/help"));
              }}
            >
              <CircleHelp className="mr-2 size-4" />
              {t("Document")}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("Theme")} aria-label={t("Theme options")}>
            <CommandItem onSelect={() => runCommand(() => switchTheme("light"))}>
              <SunIcon className="mr-2 size-4" />
              {t("themes.light")}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => switchTheme("dark"))}>
              <MoonIcon className="mr-2 size-4" />
              {t("themes.dark")}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => switchTheme("system"))}>
              <LaptopIcon className="mr-2 size-4" />
              {t("themes.system")}
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading={t("Language")} aria-label={t("Language options")}>
            {languages.map(language => (
              <CommandItem
                key={language.value}
                value={language.value}
                onSelect={() =>
                  runCommand(() => changeLanguage(language.value))}
              >
                {language.icon}
                {" "}
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
