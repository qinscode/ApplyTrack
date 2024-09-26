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
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconUserShield,
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
    title: "All jobs",
    label: "512",
    href: "/jobs",
    icon: <IconMoodHappy size={18} />,
  },
  {
    title: "jobs",
    label: "",
    href: "/jobs",
    icon: <IconBriefcase size={18} />,
    sub: [
      {
        title: "new",
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
    title: "Authentication",
    label: "",
    href: "",
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: "Sign In (email + password)",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "Sign In (Box)",
        label: "",
        href: "/sign-in-2",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "Sign Up",
        label: "",
        href: "/sign-up",
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: "Forgot Password",
        label: "",
        href: "/forgot-password",
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: "OTP",
        label: "",
        href: "/otp",
        icon: <IconHexagonNumber5 size={18} />,
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
