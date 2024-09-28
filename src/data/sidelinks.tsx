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
import { useJobStatusCounts } from "@/hooks/useTotalJobsCount.ts";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export function SidebarLinks() {
  const { statusCounts, totalJobsCount, newJobsCount, loading, error } =
    useJobStatusCounts();

  const getCountByStatus = (status: string) => {
    const statusCount = statusCounts.find((item) => item.status === status);
    return statusCount ? statusCount.count : 0;
  };

  if (loading) {
    return []; // or return a loading placeholder
  }

  if (error) {
    console.error("Error loading job counts:", error);
    return []; // or return an error placeholder
  }

  const sidelinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "All jobs",
      label: totalJobsCount.toString(),
      href: "/jobs",
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
          label: newJobsCount.toString(),
          href: "/jobs/New",
          icon: <IconPlus size={18} />,
        },
        {
          title: "Pending",
          label: getCountByStatus("Pending").toString(),
          href: "/jobs/pending",
          icon: <IconClock size={18} />,
        },
        {
          title: "Applied",
          label: getCountByStatus("Applied").toString(),
          href: "/jobs/applied",
          icon: <IconSend size={18} />,
        },
        {
          title: "Archived",
          label: getCountByStatus("Archived").toString(),
          href: "/jobs/archived",
          icon: <IconArchive size={18} />,
        },
        {
          title: "Reviewed",
          label: getCountByStatus("Reviewed").toString(),
          href: "/jobs/reviewed",
          icon: <IconEye size={18} />,
        },
        {
          title: "Interviewing",
          label: getCountByStatus("Interviewing").toString(),
          href: "/jobs/interviewing",
          icon: <IconUsers size={18} />,
        },
        {
          title: "TechnicalAssessment",
          label: getCountByStatus("TechnicalAssessment").toString(),
          href: "/jobs/technical-assessment",
          icon: <IconPencilPlus size={18} />,
        },
        {
          title: "Offered",
          label: getCountByStatus("Offered").toString(),
          href: "/jobs/offered",
          icon: <IconCheck size={18} />,
        },
        {
          title: "Ghosting",
          label: getCountByStatus("Ghosting").toString(),
          href: "/jobs/ghosting",
          icon: <IconGhost size={18} />,
        },
        {
          title: "Rejected",
          label: getCountByStatus("Rejected").toString(),
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

  return sidelinks;
}
