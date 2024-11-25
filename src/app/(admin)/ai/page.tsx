"use client";

import type { Job } from "@/types/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { emailAnalysisApi } from "@/api/email-analysis";
import { AnalysisTable } from "@/components/ai/analysis-table";
import Loading from "@/components/jobs/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { jobSchema } from "@/types/schema";
import { IconBrain } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";

type EmailAnalysisResult = {
  subject: string;
  receivedDate: string;
  isRecognized: boolean;
  job: {
    id: number;
    jobTitle: string;
    businessName: string;
  };
  status: Job["status"];
  keyPhrases: string[];
  suggestedActions: string;
  similarity: number;
  confidence_score?: number;
  key_phrases?: string[];
  next_action?: string;
  job_id?: number;
};

// 从 jobSchema 中获取所有可能的状态值
const JOB_STATUSES = jobSchema.shape.status.options;

const columns: ColumnDef<EmailAnalysisResult>[] = [
  {
    accessorKey: "subject",
    header: "Email Subject",
    cell: ({ row }) => {
      const isNew = new Date().getTime() - new Date(row.original.receivedDate).getTime() < 5 * 60 * 1000;

      return (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">{row.getValue("subject")}</span>
            {isNew && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                New
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            Date:
            {" "}
            {new Date(row.original.receivedDate).toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "job",
    header: "Job Details",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.job.jobTitle}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.job.businessName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "similarity",
    header: "Similarity",
    cell: ({ row }) => {
      const score = row.getValue("similarity") as number;
      return (
        <div className="flex items-center gap-2">
          <Progress value={score * 100} className="w-[60px]" />
          <span className="text-sm text-muted-foreground">
            {Math.round(score * 100)}
            %
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "keyPhrases",
    header: "Key Phrases",
    cell: ({ row }) => {
      const phrases = row.original.keyPhrases;
      return (
        <div className="flex flex-wrap gap-1">
          {phrases.map(phrase => (
            <Badge
              key={`${row.original.job.id}-${phrase}`}
              variant="secondary"
              className="text-xs"
            >
              {phrase}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "suggestedActions",
    header: "Suggested Action",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const currentStatus = row.original.status;

      const handleStatusChange = async (newStatus: Job["status"]) => {
        try {
          await emailAnalysisApi.updateStatus(row.original.job.id, newStatus);

          toast({
            title: "Status Updated",
            description: `Job status updated from ${currentStatus} to ${newStatus}`,
          });
        } catch {
          toast({
            title: "Update Failed",
            description: "Failed to update job status. Please try again.",
            variant: "destructive",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Change Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {JOB_STATUSES.map(status => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const DEFAULT_PAGE_SIZE = 10;

function AIAnalysisContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = useCallback(
    (updater: (prev: URLSearchParams) => URLSearchParams) => {
      const newParams = updater(new URLSearchParams(searchParams));
      const newSearch = newParams.toString();
      router.push(`${pathname}${newSearch ? `?${newSearch}` : ""}`);
    },
    [searchParams, router, pathname],
  );

  const pageSize = Number.parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10,
  );
  const currentPage = Number.parseInt(
    searchParams.get("pageNumber") || "1",
    10,
  );
  const searchTerm = searchParams.get("searchTerm") || "";

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<EmailAnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setError(null);

    try {
      if (searchTerm) {
        const data = await emailAnalysisApi.search(searchTerm);
        setResults(data.emails);
        setTotalCount(data.totalCount);
      } else {
        const data = await emailAnalysisApi.getAnalysis(currentPage, pageSize);
        setResults(data.emails);
        setTotalCount(data.totalCount);
      }
      setProgress(100);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to fetch analysis results");
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageNumber", page.toString());
      newParams.set("pageSize", pageSize.toString());
      return newParams;
    });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageSize", newPageSize.toString());
      newParams.set("pageNumber", "1");
      return newParams;
    });
  };

  const handleSearch = useCallback(
    (term: string) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (term) {
          newParams.set("searchTerm", term);
        } else {
          newParams.delete("searchTerm");
        }
        return newParams;
      });
    },
    [setSearchParams],
  );

  const startNewAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setError(null);

    try {
      await emailAnalysisApi.analyzeEmails();
      setProgress(50);

      const data = await emailAnalysisApi.getAnalysis(currentPage, pageSize);
      setResults(data.emails);
      setTotalCount(data.totalCount);
      setProgress(100);

      toast({
        title: "Analysis Complete",
        description: "Email analysis has been updated.",
        duration: 5000,
      });
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error("Analysis failed:", err);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          size="lg"
          onClick={startNewAnalysis}
          disabled={isAnalyzing}
          className="w-[200px]"
        >
          {isAnalyzing
            ? (
                <>Analyzing Emails...</>
              )
            : (
                <>
                  <IconBrain className="mr-2" />
                  Analyze Emails
                </>
              )}
        </Button>
        {isAnalyzing && (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-[200px]" />
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}
              %
            </span>
          </div>
        )}
      </div>

      {error
        ? (
            <div className="text-red-500">{error}</div>
          )
        : (
            <AnalysisTable
              data={results}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalCount}
              onPageChange={handlePageChange}
              onDataChange={setResults}
              onPageSizeChange={handlePageSizeChange}
              onSearch={handleSearch}
              onSort={() => {}}
            />
          )}
    </div>
  );
}

export default function AIAnalysis() {
  return (
    <Suspense fallback={<Loading />}>
      <AIAnalysisContent />
    </Suspense>
  );
}
