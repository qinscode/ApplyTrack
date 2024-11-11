import { Link } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import { Button, buttonVariants } from "./custom/button";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import useCheckActiveNav from "@/hooks/use-check-active-nav";
import { SideLink } from "@/data/sidelinks";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// 添加字体大小常量
const FONT_SIZES = {
  base: "text-sm",
  label: "text-[0.625rem]",
  small: "text-xs",
} as const;

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub)
      return (
        <Collapsible
          key={key}
          open={openItems[rest.title]}
          onOpenChange={() => toggleItem(rest.title)}
        >
          <CollapsibleTrigger asChild>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-12 w-full cursor-pointer select-none justify-between rounded-none px-6",
                FONT_SIZES.base
              )}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="flex items-center">
                <div className="mr-2">{rest.icon}</div>
                {rest.title}
                {rest.label && (
                  <div
                    className={cn(
                      "ml-2 inline-flex rounded-lg bg-primary px-1.5 text-primary-foreground",
                      FONT_SIZES.label
                    )}
                  >
                    {rest.label}
                  </div>
                )}
              </div>
              <IconChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openItems[rest.title] && "rotate-180"
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="collapsibleDropdown">
            <ul>
              {sub.map((sublink) => (
                <li
                  key={sublink.title}
                  className={cn("my-1 ml-8", FONT_SIZES.base)}
                >
                  <NavLink {...sublink} subLink closeNav={closeNav} />
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

// 添加一个转换函数
const transformTitle = (title: string) => {
  if (title === "TechnicalAssessment") return "Assessment";
  return title;
};

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Link
      to={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href) ? "secondary" : "ghost",
          size: "sm",
        }),
        "h-12 justify-start text-wrap rounded-none px-6",
        FONT_SIZES.base,
        subLink && "h-10 w-full border-l border-l-slate-500 px-2"
      )}
      aria-current={checkActiveNav(href) ? "page" : undefined}
    >
      <div className="mr-2">{icon}</div>
      {transformTitle(title)}
      {label && (
        <div
          className={cn(
            "ml-2 inline-flex rounded-lg bg-primary px-1.5 text-primary-foreground",
            FONT_SIZES.label
          )}
        >
          {label}
        </div>
      )}
    </Link>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(href) ? "secondary" : "ghost",
              size: "icon",
            }),
            "h-12 w-12"
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className={cn("flex items-center gap-4", FONT_SIZES.base)}
      >
        {title}
        {label && (
          <span className="ml-auto text-muted-foreground">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? "secondary" : "ghost"}
              size="icon"
              className="h-12 w-12"
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className={cn("flex items-center gap-4", FONT_SIZES.base)}
        >
          {title}{" "}
          {label && (
            <span className="ml-auto text-muted-foreground">{label}</span>
          )}
          <IconChevronDown
            size={18}
            className="-rotate-90 text-muted-foreground"
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel className={FONT_SIZES.base}>
          {title} {label ? `(${label})` : ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              to={href}
              className={cn(
                checkActiveNav(href) ? "bg-secondary" : "",
                FONT_SIZES.base
              )}
            >
              {icon} <span className="ml-2 max-w-52 text-wrap">{title}</span>
              {label && (
                <span className={cn("ml-auto", FONT_SIZES.small)}>{label}</span>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
