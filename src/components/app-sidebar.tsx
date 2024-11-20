"use client";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconArchive,
  IconBrain,
  IconBriefcase,
  IconCheck,
  IconClipboardCheck,
  IconClock,
  IconCommand,
  IconEye,
  IconFiles,
  IconFileText,
  IconGhost,
  IconHelpCircle,
  IconLayoutDashboard,
  IconMoodHappy,
  IconPencilPlus,
  IconPlus,
  IconQuestionMark,
  IconSend,
  IconTestPipe,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import * as React from "react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <IconLayoutDashboard size={18} stroke={1.5} />,
      isActive: true,
    },
    {
      title: "All jobs",
      url: "/jobs/all",
      icon: <IconMoodHappy size={18} />,
    },
    {
      title: "Jobs",
      url: "/jobs/new",
      isActive: true,
      icon: <IconBriefcase size={18} />,
      items: [
        {
          title: "New",
          url: "/jobs/new",
          icon: <IconPlus size={18} />,
        },
        {
          title: "Pending",
          url: "/jobs/pending",
          icon: <IconClock size={18} />,
        },
        {
          title: "Applied",
          url: "/jobs/applied",
          icon: <IconSend size={18} />,
        },
        {
          title: "Archived",
          url: "/jobs/archived",
          icon: <IconArchive size={18} />,
        },
        {
          title: "Reviewed",
          url: "/jobs/reviewed",
          icon: <IconEye size={18} />,
        },
        {
          title: "Interviewing",
          url: "/jobs/interviewing",
          icon: <IconUsers size={18} />,
        },
        {
          title: "TechnicalAssessment",
          url: "/jobs/technical-assessment",
          icon: <IconPencilPlus size={18} />,
        },
        {
          title: "Offered",
          url: "/jobs/offered",
          icon: <IconCheck size={18} />,
        },
        {
          title: "Ghosting",
          url: "/jobs/ghosting",
          icon: <IconGhost size={18} />,
        },
        {
          title: "Rejected",
          url: "/jobs/rejected",
          icon: <IconX size={18} />,
        },
      ],
    },
    {
      title: "AI Analysis",
      url: "/ai",
      icon: <IconBrain size={18} />,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: <IconFiles size={18} />,
      items: [
        {
          title: "Resumes",
          url: "/documents/resumes",
          icon: <IconFileText size={18} />,
        },
        {
          title: "Cover Letters",
          url: "/documents/coverletters",
          icon: <IconFileText size={18} />,
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "/settings",
    //   icon: <IconSettings size={18} />,
    //   items: [
    //     {
    //       title: "Profile",
    //       url: "/settings",
    //       icon: <IconUsers size={18} />,
    //     },
    //     {
    //       title: "Account",
    //       url: "/settings/account",
    //       icon: <IconSettings size={18} />,
    //     },
    //     {
    //       title: "Email Tracking",
    //       url: "/settings/emailtracking",
    //       icon: <IconMail size={18} />,
    //     },
    //   ],
    // },
    {
      title: "Interview",
      url: "/interview",
      icon: <IconClipboardCheck size={18} />,
      items: [
        {
          title: "Checklists",
          url: "/interview/checklists",
          icon: <IconClipboardCheck size={18} />,
        },
        {
          title: "Q&A Bank",
          url: "/interview/qa-bank",
          icon: <IconQuestionMark size={18} />,
        },
      ],
    },
    {
      title: "Test",
      url: "/test",
      icon: <IconTestPipe size={18} />,
    },
    {
      title: "Help",
      url: "/help",
      icon: <IconHelpCircle size={18} />,
    },
  ],
  navSecondary: [],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <IconCommand size={16} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">JobTracker</span>
                  <span className="truncate text-xs">Next.js</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
