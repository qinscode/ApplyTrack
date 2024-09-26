import {
  useTotalJobsCount,
  useJobCountByStatus,
  useNewJobsCount,
} from "@/hooks/useTotalJobsCount.ts";

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
  const { totalJobs, error: TotalJobsError } = useTotalJobsCount();
  const {
    totalNewJobs,
    loading: loadingNew,
    error: newError,
  } = useNewJobsCount();
  const { totalJobs: pendingJobs, error: pendingError } =
    useJobCountByStatus("Pending");
  const { totalJobs: archivedJobs, error: archivedError } =
    useJobCountByStatus("Archived");
  const { totalJobs: reviewedJobs, error: reviewedError } =
    useJobCountByStatus("Reviewed");

  const { totalJobs: ghostingJobs, error: ghostingError } =
    useJobCountByStatus("Ghosting");

  const { totalJobs: appliedJobs, error: appliedError } =
    useJobCountByStatus("Applied");

  const { totalJobs: interviewingJobs, error: interviewingError } =
    useJobCountByStatus("Interviewing");

  const {
    totalJobs: technicalAssessmentJobs,
    error: technicalAssessmentError,
  } = useJobCountByStatus("TechnicalAssessment");

  const { totalJobs: offeredJobs, error: offeredError } =
    useJobCountByStatus("Offered");

  const { totalJobs: rejectedJobs, error: rejectedError } =
    useJobCountByStatus("Rejected");

  const sidelinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "All jobs",
      label: TotalJobsError ? "" : totalJobs.toString(),
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
          label: newError ? "" : totalNewJobs.toString(),
          href: "/jobs/New",
          icon: <IconPlus size={18} />,
        },
        {
          title: "Pending",
          label: pendingError ? "" : pendingJobs.toString(),
          href: "/jobs/pending",
          icon: <IconClock size={18} />,
        },
        {
          title: "Applied",
          label: appliedError ? "" : appliedJobs.toString(),
          href: "/jobs/applied",
          icon: <IconSend size={18} />,
        },
        {
          title: "Archived",
          label: archivedError ? "" : archivedJobs.toString(),
          href: "/jobs/archived",
          icon: <IconArchive size={18} />,
        },
        {
          title: "Reviewed",
          label: reviewedError ? "" : reviewedJobs.toString(),
          href: "/jobs/reviewed",
          icon: <IconEye size={18} />,
        },
        {
          title: "Interviewing",
          label: interviewingError ? "" : interviewingJobs.toString(),
          href: "/jobs/interviewing",
          icon: <IconUsers size={18} />,
        },
        {
          title: "TechnicalAssessment",
          label: technicalAssessmentError
            ? ""
            : technicalAssessmentJobs.toString(),
          href: "/jobs/technical-assessment",
          icon: <IconPencilPlus size={18} />,
        },
        {
          title: "Offered",
          label: offeredError ? "" : offeredJobs.toString(),
          href: "/jobs/offered",
          icon: <IconCheck size={18} />,
        },
        {
          title: "Ghosting",
          label: ghostingError ? "" : ghostingJobs.toString(),
          href: "/jobs/ghosting",
          icon: <IconGhost size={18} />,
        },
        {
          title: "Rejected",
          label: rejectedError ? "" : rejectedJobs.toString(),
          href: "/jobs/rejected",
          icon: <IconX size={18} />,
        },
      ],
    },
  ];
  return sidelinks;
}
