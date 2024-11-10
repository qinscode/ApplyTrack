import { Link } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import { Icons } from "@/components/icons";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import { ThemeCustomizer } from "@/components/theme/theme-customizer";
import { UserNav } from "@/components/user-nav";

interface PageHeaderProps {
  title?: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10">
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b bg-background/80 px-2 backdrop-blur-sm sm:h-16 sm:px-4">
        {/* 左侧区域 */}
        <div className="flex items-center gap-2">
          {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
        </div>

        {/* 右侧区域 */}
        <div className="ml-auto flex flex-1 items-center space-x-2 px-2 sm:px-4 md:max-w-96 lg:max-w-lg">
          <Search />
          <Link
            to="https://github.com/TinsFox/shadcnui-boilerplate"
            target="_blank"
          >
            <Button variant="ghost" size="icon">
              <Icons.gitHub className="size-5" />
            </Button>
          </Link>
          <Link to="https://shadcnui-boilerplate.pages.dev" target="_blank">
            <Button variant="ghost" size="icon">
              <CircleHelp className="size-5" />
            </Button>
          </Link>
          <ThemeSwitch />
          <ThemeCustomizer />
          <UserNav />
        </div>
      </header>
    </div>
  );
} 