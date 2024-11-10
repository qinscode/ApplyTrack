import { Layout } from "@/components/custom/layout";
import { Button } from "@/components/custom/button";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { IconBrain } from "@tabler/icons-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { AnalysisTable } from "./components/analysis-table";
import { ColumnDef } from "@tanstack/react-table";
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface EmailAnalysisResult {
  job_id: number;
  job_title: string;
  business_name: string;
  status: Job["status"];
  email_subject: string;
  email_date: string;
  email_sender: string;
  detected_status: Job["status"];
  confidence_score: number;
  key_phrases: string[];
  next_action: string;
  last_analyzed: string;
}

const columns: ColumnDef<EmailAnalysisResult>[] = [
  {
    accessorKey: "email_subject",
    header: "Email Subject",
    cell: ({ row }) => {
      const isNew = (new Date().getTime() - new Date(row.original.last_analyzed).getTime()) < 5 * 60 * 1000;
      
      return (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">{row.getValue("email_subject")}</span>
            {isNew && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                New
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            From: {row.original.email_sender}
          </span>
          <span className="text-xs text-muted-foreground">
            Date: {new Date(row.original.email_date).toLocaleString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "job_title",
    header: "Job Details",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("job_title")}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.business_name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Current Status",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("status")}</Badge>
    ),
  },
  {
    accessorKey: "detected_status",
    header: "Detected Status",
    cell: ({ row }) => {
      const currentStatus = row.original.status;
      const detectedStatus = row.getValue("detected_status") as string;
      const hasChanged = currentStatus !== detectedStatus;
      
      return (
        <div className="flex items-center gap-2">
          <Badge variant={hasChanged ? "default" : "outline"}>
            {detectedStatus}
          </Badge>
          {hasChanged && (
            <Badge variant="secondary" className="text-xs">
              Changed
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const currentStatus = row.original.status;
      const detectedStatus = row.original.detected_status;
      const hasChanged = currentStatus !== detectedStatus;

      if (!hasChanged) {
        return (
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            Up to date
          </Badge>
        );
      }

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            try {
              await new Promise(resolve => setTimeout(resolve, 500));

              setResults(prev => 
                prev.map(result => 
                  result.job_id === row.original.job_id
                    ? { ...result, status: result.detected_status }
                    : result
                )
              );

              toast({
                title: "Status Updated",
                description: `Job status updated from ${currentStatus} to ${detectedStatus}`,
              });
            } catch (error) {
              toast({
                title: "Update Failed",
                description: "Failed to update job status. Please try again.",
                variant: "destructive",
              });
            }
          }}
        >
          Update Status
        </Button>
      );
    },
  },
  {
    accessorKey: "confidence_score",
    header: "Confidence",
    cell: ({ row }) => {
      const score = row.getValue("confidence_score") as number;
      return (
        <div className="flex items-center gap-2">
          <Progress value={score * 100} className="w-[60px]" />
          <span className="text-sm text-muted-foreground">
            {Math.round(score * 100)}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "key_phrases",
    header: "Key Phrases",
    cell: ({ row }) => {
      const phrases = row.original.key_phrases;
      return (
        <div className="flex flex-wrap gap-1">
          {phrases.map((phrase, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {phrase}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "next_action",
    header: "Suggested Action",
  },
];

// 创建初始假数据
const initialMockData: EmailAnalysisResult[] = [
  {
    job_id: 1,
    job_title: "Senior Frontend Developer",
    business_name: "Tech Corp",
    status: "Applied",
    email_subject: "Application Received - Frontend Developer Position",
    email_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7天前
    email_sender: "recruiting@techcorp.com",
    detected_status: "Applied",
    confidence_score: 0.95,
    key_phrases: ["application received", "under review", "next steps"],
    next_action: "Wait for response",
    last_analyzed: new Date().toISOString()
  },
  {
    job_id: 2,
    job_title: "React Developer",
    business_name: "Startup Inc",
    status: "Applied",
    email_subject: "Interview Invitation - React Developer Role",
    email_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3天前
    email_sender: "hr@startup.com",
    detected_status: "Interviewing",
    confidence_score: 0.92,
    key_phrases: ["interview invitation", "availability", "team meeting"],
    next_action: "Schedule interview",
    last_analyzed: new Date().toISOString()
  },
  {
    job_id: 3,
    job_title: "Full Stack Engineer",
    business_name: "Global Tech",
    status: "Applied",
    email_subject: "No Response Required: Application Confirmation",
    email_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14天前
    email_sender: "no-reply@globaltech.com",
    detected_status: "Ghosting",
    confidence_score: 0.85,
    key_phrases: ["no response", "2 weeks", "automated message"],
    next_action: "Consider follow-up email",
    last_analyzed: new Date().toISOString()
  }
];

export default function AIAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  // 使用初始假数据初始化结果
  const [results, setResults] = useState<EmailAnalysisResult[]>(initialMockData);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setError(null);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 添加新的分析结果
      const newResults: EmailAnalysisResult[] = [
        {
          job_id: 4,
          job_title: "Software Engineer",
          business_name: "Innovation Labs",
          status: "Interviewing",
          email_subject: "Technical Assessment Results",
          email_date: new Date().toISOString(),
          email_sender: "tech.hiring@innovationlabs.com",
          detected_status: "TechnicalAssessment",
          confidence_score: 0.88,
          key_phrases: ["passed assessment", "next round", "team interview"],
          next_action: "Prepare for team interview",
          last_analyzed: new Date().toISOString()
        },
        {
          job_id: 5,
          job_title: "Frontend Engineer",
          business_name: "Digital Solutions",
          status: "Applied",
          email_subject: "Thank you for your application",
          email_date: new Date().toISOString(),
          email_sender: "careers@digitalsolutions.com",
          detected_status: "Rejected",
          confidence_score: 0.94,
          key_phrases: ["thank you for interest", "other candidates", "future opportunities"],
          next_action: "Archive application",
          last_analyzed: new Date().toISOString()
        }
      ];

      // 合并现有结果和新结果
      setResults(prevResults => [...prevResults, ...newResults]);
      setProgress(100);

      // 添加分析完成的通知
      const statusChanges = newResults.filter(
        result => result.status !== result.detected_status
      );

      toast({
        title: "Email Analysis Complete",
        description: (
          <div className="mt-2 space-y-2">
            <p>Found {newResults.length} new emails.</p>
            {statusChanges.length > 0 && (
              <p>Detected {statusChanges.length} status changes that need your attention.</p>
            )}
          </div>
        ),
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

  // 添加处理批量更新的函数
  const handleBatchUpdate = async () => {
    const statusChanges = results.filter(
      result => result.status !== result.detected_status
    );

    if (statusChanges.length === 0) {
      toast({
        title: "No Updates Needed",
        description: "All job statuses are up to date.",
      });
      return;
    }

    try {
      // 这里应该是实际的API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新本地状态
      const updatedResults = results.map(result => ({
        ...result,
        status: result.detected_status, // 将当前状态更新为检测到的状态
      }));

      setResults(updatedResults);

      toast({
        title: "Batch Update Complete",
        description: `Successfully updated ${statusChanges.length} job statuses.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update job statuses. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Email Analysis</h2>
            <p className="text-muted-foreground">
              AI-powered analysis of your job application emails
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                size="lg"
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="w-[200px]"
              >
                {isAnalyzing ? (
                  <>Analyzing Emails...</>
                ) : (
                  <>
                    <IconBrain className="mr-2" />
                    Analyze Emails
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleBatchUpdate}
                disabled={isAnalyzing}
                className="w-[200px]"
              >
                Update All Statuses
              </Button>
            </div>
            {isAnalyzing && (
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-[200px]" />
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
          </div>

          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <AnalysisTable
              data={results}
              columns={columns}
              pageSize={10}
              currentPage={1}
              totalCount={results.length}
              onPageChange={() => {}}
              onDataChange={() => {}}
              onPageSizeChange={() => {}}
              onSearch={() => {}}
              onSort={() => {}}
            />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
} 