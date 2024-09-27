import { useJobStatusCounts } from "@/hooks/useTotalJobsCount.ts";

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

export function SidebarLinks() {
  const { getCountByStatus, totalJobsCount, error, newJobsCount } =
    useJobStatusCounts();

  const sidelinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "All jobs",
      label: error ? "" : totalJobsCount.toString(),
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
          title: "New",
          label: error ? "" : newJobsCount.toString(),
          href: "/jobs/New",
          icon: <IconPlus size={18} />,
        },
        {
          title: "Pending",
          label: error ? "" : getCountByStatus("Pending").toString(),
          href: "/jobs/pending",
          icon: <IconClock size={18} />,
        },
        {
          title: "Applied",
          label: error ? "" : getCountByStatus("Applied").toString(),
          href: "/jobs/applied",
          icon: <IconSend size={18} />,
        },
        {
          title: "Archived",
          label: error ? "" : getCountByStatus("Archived").toString(),
          href: "/jobs/archived",
          icon: <IconArchive size={18} />,
        },
        {
          title: "Reviewed",
          label: error ? "" : getCountByStatus("Reviewed").toString(),
          href: "/jobs/reviewed",
          icon: <IconEye size={18} />,
        },
        {
          title: "Interviewing",
          label: error ? "" : getCountByStatus("Interviewing").toString(),
          href: "/jobs/interviewing",
          icon: <IconUsers size={18} />,
        },
        {
          title: "TechnicalAssessment",
          label: error
            ? ""
            : getCountByStatus("TechnicalAssessment").toString(),
          href: "/jobs/technical-assessment",
          icon: <IconPencilPlus size={18} />,
        },
        {
          title: "Offered",
          label: error ? "" : getCountByStatus("Offered").toString(),
          href: "/jobs/offered",
          icon: <IconCheck size={18} />,
        },
        {
          title: "Ghosting",
          label: error ? "" : getCountByStatus("Ghosting").toString(),
          href: "/jobs/ghosting",
          icon: <IconGhost size={18} />,
        },
        {
          title: "Rejected",
          label: error ? "" : getCountByStatus("Rejected").toString(),
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
  return sidelinks;
}
