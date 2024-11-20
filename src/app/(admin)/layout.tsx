"use client";
import { AppSidebar } from "@/components/app-sidebar";
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
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
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
