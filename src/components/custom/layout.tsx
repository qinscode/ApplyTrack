import { Button } from "@/components/custom/button";
import { Icons } from "@/components/icons";
import { Search } from "@/components/search";

import { ThemeCustomizer } from "@/components/theme/theme-customizer";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const LayoutContext = React.createContext<{
  offset: number;
  fixed: boolean;
} | null>(null);

type LayoutProps = {
  fixed?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Layout = ({ className, fixed = false, ...props }: LayoutProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const div = divRef.current;

    if (!div) {
      return;
    }
    const onScroll = () => setOffset(div.scrollTop);

    // clean up code
    div.removeEventListener("scroll", onScroll);
    div.addEventListener("scroll", onScroll, { passive: true });
    return () => div.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout="layout"
        className={cn("relative h-full", className)}
        {...props}
      />
    </LayoutContext.Provider>
  );
};
Layout.displayName = "Layout";

type HeaderProps = {
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, title, ...props }, ref) => {
    // Check if Layout.Header is used within Layout
    const contextVal = React.useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(
        `Layout.Header must be used within ${Layout.displayName}.`,
      );
    }

    return (
      <div
        ref={ref}
        data-layout="header"
        className={cn(
          "fixed top-0 z-50 flex h-14 items-center gap-4 bg-background p-4 transition-[left,right,width] duration-300 sm:h-16 md:px-8",
          "left-0 right-0 md:left-64 md:[.collapsed_+_*_&]:left-14", // 根据侧边栏状态调整
          contextVal.offset > 10 ? "shadow-md" : "shadow-none",
          className,
        )}
        {...props}
      >
        {title && (
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        )}
        {props.children}
        <div className="ml-auto flex flex-1 items-center space-x-2 px-2 sm:px-4 md:max-w-96 lg:max-w-lg">
          <Search />
          <Link
            href="https://github.com/TinsFox/shadcnui-boilerplate"
            target="_blank"
          >
            <Button variant="ghost" size="icon">
              <Icons.gitHub className="size-5" />
            </Button>
          </Link>
          <Link href="https://shadcnui-boilerplate.pages.dev" target="_blank">
            <Button variant="ghost" size="icon">
              <CircleHelp className="size-5" />
            </Button>
          </Link>
          <ThemeSwitch />
          <ThemeCustomizer />
          <UserNav />
        </div>
      </div>
    );
  },
);
Header.displayName = "Header";

const Body = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Check if Layout.Body is used within Layout
  const contextVal = React.useContext(LayoutContext);
  if (contextVal === null) {
    throw new Error(`Layout.Body must be used within ${Layout.displayName}.`);
  }

  return (
    <div
      ref={ref}
      data-layout="body"
      className={cn(
        "h-[calc(100%-3.5rem)] overflow-auto px-8 pt-20 sm:h-[calc(100%-4rem)]",
        className,
      )}
      {...props}
    />
  );
});
Body.displayName = "Body";

Layout.Header = Header;
Layout.Body = Body;

export { Layout };
