import { Layout } from "@/components/custom/layout";
import { useParams } from "react-router-dom";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { jobs } from "@/pages/jobs/data/jobs.ts";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Job } from "@/types";
import { Button } from "@/components/custom/button.tsx";
import { useNavigate } from "react-router-dom";

const statusColors: Record<Job["status"], string> = {
  new: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Applied: "bg-blue-100 text-blue-800",
  Archived: "bg-gray-100 text-gray-800",
  Reviewed: "bg-cyan-100 text-cyan-800",
  Interviewing: "bg-indigo-100 text-indigo-800",
  "Technical Assessment": "bg-purple-100 text-purple-800",
  Accepted: "bg-green-100 text-green-800",
  Ghosting: "bg-red-100 text-red-800",
  Pass: "bg-orange-100 text-orange-800",
  Rejected: "bg-rose-100 text-rose-800",
};

export default function Details() {
  const { id } = useParams();

  const job = jobs.find((job) => job.job_id === id);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{job.job_title}</h1>

          <div className="flex items-center space-x-2">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
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
                <Button className="mb-4 w-1/2">Apply Now</Button>
              </div>

              <h2 className="mb-4 text-xl text-gray-600 dark:text-gray-300">
                {job.business_name}
              </h2>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="mr-2" size={20} />
                  <span>
                    {job.suburb}, {job.area}
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
                  <span>Posted {job.posted_date}</span>
                </div>
              </div>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Status
                  </h3>
                  <Badge
                    className={`${
                      statusColors[job.status]
                    } pointer-events-none font-semibold`}
                  >
                    {job.status}
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
      </Layout.Body>
    </Layout>
  );
}
