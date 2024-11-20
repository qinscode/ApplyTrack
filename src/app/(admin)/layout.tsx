"use client";
import { AppSidebar, data as sidebarData } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/auth/protected-route";
import { Icons } from "@/components/icons";
import { Search } from "@/components/search";
import { ThemeCustomizer } from "@/components/theme/theme-customizer";
import ThemeSwitch from "@/components/theme-switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { CircleHelp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // 获取当前路径的面包屑信息
  const getBreadcrumb = () => {
    const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

    // 先查找顶级路径
    const mainItem = sidebarData.navMain.find(item => item.url === path);
    if (mainItem) {
      return { title: mainItem.title };
    }

    // 查找子路径
    for (const item of sidebarData.navMain) {
      if (item.items) {
        const subItem = item.items.find(sub => sub.url === path);
        if (subItem) {
          return { title: subItem.title, parent: item.title };
        }
      }
    }

    return { title: "Not Found" };
  };

  const { title, parent } = getBreadcrumb();

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {parent && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">{parent}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-4 px-4">
              <div className="ml-auto flex flex-1 items-center space-x-2 px-2 sm:px-4 md:max-w-96 lg:max-w-lg">
                <Search />
                <Link href="">
                  <Button variant="ghost" size="icon">
                    <Icons.gitHub className="size-5" />
                  </Button>
                </Link>
                <Link href="">
                  <Button variant="ghost" size="icon">
                    <CircleHelp className="size-5" />
                  </Button>
                </Link>
                <ThemeSwitch />
                <ThemeCustomizer />
                <UserNav />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
