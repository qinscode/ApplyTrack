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
  IconCode,
  IconCheck,
  IconGhost,
  IconX,
  IconThumbDown,
  IconSettings,
  IconMoodHappy,
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
    label: "",
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
        label: "",
        href: "/jobs/new",
        icon: <IconPlus size={18} />,
      },
      {
        title: "Pending",
        label: "",
        href: "/jobs/pending",
        icon: <IconClock size={18} />,
      },
      {
        title: "Applied",
        label: "",
        href: "/jobs/applied",
        icon: <IconSend size={18} />,
      },
      {
        title: "Archived",
        label: "",
        href: "/jobs/archived",
        icon: <IconArchive size={18} />,
      },
      {
        title: "Reviewed",
        label: "",
        href: "/jobs/reviewed",
        icon: <IconEye size={18} />,
      },
      {
        title: "Interviewing",
        label: "",
        href: "/jobs/interviewing",
        icon: <IconUsers size={18} />,
      },
      {
        title: "Technical Assessment",
        label: "",
        href: "/jobs/technical-assessment",
        icon: <IconCode size={18} />,
      },
      {
        title: "Accepted",
        label: "",
        href: "/jobs/accepted",
        icon: <IconCheck size={18} />,
      },
      {
        title: "Ghosting",
        label: "",
        href: "/jobs/ghosting",
        icon: <IconGhost size={18} />,
      },
      {
        title: "Pass",
        label: "",
        href: "/jobs/pass",
        icon: <IconX size={18} />,
      },
      {
        title: "Rejected",
        label: "",
        href: "/jobs/rejected",
        icon: <IconThumbDown size={18} />,
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
