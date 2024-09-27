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
  const { totalNewJobs, error: newError } = useNewJobsCount();

  const { totalJobsCount: pendingJobs, error: pendingError } =
    useJobCountByStatus("Pending");
  const { totalJobsCount: archivedJobs, error: archivedError } =
    useJobCountByStatus("Archived");
  const { totalJobsCount: reviewedJobs, error: reviewedError } =
    useJobCountByStatus("Reviewed");

  const { totalJobsCount: ghostingJobs, error: ghostingError } =
    useJobCountByStatus("Ghosting");

  const { totalJobsCount: appliedJobs, error: appliedError } =
    useJobCountByStatus("Applied");

  const { totalJobsCount: interviewingJobs, error: interviewingError } =
    useJobCountByStatus("Interviewing");

  const {
    totalJobsCount: technicalAssessmentJobs,
    error: technicalAssessmentError,
  } = useJobCountByStatus("TechnicalAssessment");

  const { totalJobsCount: offeredJobs, error: offeredError } =
    useJobCountByStatus("Offered");

  const { totalJobsCount: rejectedJobs, error: rejectedError } =
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
