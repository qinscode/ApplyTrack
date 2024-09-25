export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}
import {
  IconLayoutDashboard,
  IconBriefcase,
  IconPlus,
  IconClock,
  IconSend,
  IconArchive,
  IconEye,
  IconUsers,
  IconCheck,
  IconGhost,
  IconX,
  IconSettings,
  IconMoodHappy,
  IconPencilPlus,
} from "@tabler/icons-react";

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "All Jobs",
    label: "512",
    href: "/tasks",
    icon: <IconMoodHappy size={18} />,
  },
  {
    title: "Jobs",
    label: "",
    href: "/jobs",
    icon: <IconBriefcase size={18} />,
    sub: [
      {
        title: "New",
        label: "20",
        href: "/jobs/new",
        icon: <IconPlus size={18} />,
      },
      {
        title: "Pending",
        label: "12",
        href: "/jobs/pending",
        icon: <IconClock size={18} />,
      },
      {
        title: "Applied",
        label: "13",
        href: "/jobs/applied",
        icon: <IconSend size={18} />,
      },
      {
        title: "Archived",
        label: "14",
        href: "/jobs/archived",
        icon: <IconArchive size={18} />,
      },
      {
        title: "Reviewed",
        label: "15",
        href: "/jobs/reviewed",
        icon: <IconEye size={18} />,
      },
      {
        title: "Interviewing",
        label: "3",
        href: "/jobs/interviewing",
        icon: <IconUsers size={18} />,
      },
      {
        title: "Technical Assessment",
        label: "2",
        href: "/jobs/technical-assessment",
        icon: <IconPencilPlus size={18} />,
      },
      {
        title: "Accepted",
        label: "0",
        href: "/jobs/accepted",
        icon: <IconCheck size={18} />,
      },
      {
        title: "Ghosting",
        label: "6",
        href: "/jobs/ghosting",
        icon: <IconGhost size={18} />,
      },
      {
        title: "Rejected",
        label: "",
        href: "/jobs/rejected",
        icon: <IconX size={18} />,
      },
    ],
  },
  {
    title: "Settings",
    label: "",
    href: "/settings",
    icon: <IconSettings size={18} />,
  },
];
