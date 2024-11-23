"use client";
import type { Job } from "@/types/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useJobDetails } from "@/hooks/useJobDetails";
import { useJobStatusUpdate } from "@/hooks/useTotalJobsCount";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  DollarSign,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const statusColors: Record<Job["status"], string> = {
  New: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Applied: "bg-blue-100 text-blue-800",
  Archived: "bg-gray-100 text-gray-800",
  Reviewed: "bg-cyan-100 text-cyan-800",
  Interviewing: "bg-indigo-100 text-indigo-800",
  TechnicalAssessment: "bg-purple-100 text-purple-800",
  Offered: "bg-green-100 text-green-800",
  Ghosting: "bg-red-100 text-red-800",
  Rejected: "bg-rose-100 text-rose-800",
  Pass: "bg-blue-100 text-blue-800",
};

export default function Details() {
  const { id } = useParams() as { id: string };
  const { job, loading, error } = useJobDetails(id);
  const router = useRouter();
  const { status, updateJobStatus } = useJobStatusUpdate(job?.status || "New");

  const goBack = () => {
    router.back();
  };

  const handleApply = async () => {
    if (job && job.job_id) {
      await updateJobStatus(job.job_id, "Applied");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="">
      <Button onClick={goBack} className="mb-4">
        <ArrowLeft className="mr-2" size={20} />
        Back to Job Listings
      </Button>

      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {job.job_title}
            </h1>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 w-1/2"
            >
              <Button className="w-full" onClick={handleApply}>
                Apply Now
                <ExternalLink className="ml-2" size={16} />
              </Button>
            </a>
          </div>

          <h2 className="mb-4 text-xl text-gray-600 dark:text-gray-300">
            {job.business_name}
          </h2>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="mr-2" size={20} />
              <span>
                {job.suburb}
                ,
                {job.area}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Briefcase className="mr-2" size={20} />
              <span>{job.work_type}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <DollarSign className="mr-2" size={20} />
              <span>{job.pay_range}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="mr-2" size={20} />
              <span>
                Posted
                {job.posted_date}
              </span>
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Status
              </h3>
              <Badge
                className={`${statusColors[status]} pointer-events-none font-semibold`}
              >
                {status}
              </Badge>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Job Type
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {job.job_type}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Job Details
            </h3>
            <div
              className="prose dark:prose-invert job-description max-w-none"
              dangerouslySetInnerHTML={{ __html: job.job_description }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
