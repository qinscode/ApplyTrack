import { Layout } from "@/components/custom/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IconBrain,
  IconBriefcase,
  IconClipboardCheck,
  IconFiles,
  IconHelpCircle,
  IconLayoutDashboard,
  IconMail,
  IconMessageCircle,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";

export default function Help() {
  return (
    <Layout>
      <Layout.Header
        title="Help Center"
        className="border-b bg-background/80 backdrop-blur-sm"
      />
      <Layout.Body className="space-y-8">
        {/* Hero Section */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold">Welcome to Job Application Tracker</h1>
            <p className="mb-6 text-muted-foreground">
              Your all-in-one solution for managing job applications, preparing for interviews,
              and tracking your career progress.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="default">
                <IconVideo className="mr-2 size-4" />
                Watch Tutorial
              </Button>
              <Button variant="outline">
                <IconMessageCircle className="mr-2 size-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAccessCard
            icon={<IconLayoutDashboard className="size-8" />}
            title="Dashboard"
            description="Track your progress and get insights"
            href="/dashboard"
          />
          <QuickAccessCard
            icon={<IconBriefcase className="size-8" />}
            title="Job Applications"
            description="Manage your job applications"
            href="/jobs"
          />
          <QuickAccessCard
            icon={<IconBrain className="size-8" />}
            title="AI Analysis"
            description="Get AI-powered insights"
            href="/ai-analysis"
            badge="Beta"
          />
        </div>

        {/* Getting Started Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <IconHelpCircle className="size-7" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold">Quick Setup Steps</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Complete Your Profile",
                      description: "Add your information and preferences",
                    },
                    {
                      step: "2",
                      title: "Add Your First Job",
                      description: "Start tracking your applications",
                    },
                    {
                      step: "3",
                      title: "Upload Documents",
                      description: "Prepare your resume and cover letters",
                    },
                    {
                      step: "4",
                      title: "Track Progress",
                      description: "Monitor your application statuses",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="font-semibold">Key Features</h3>
                <div className="space-y-2">
                  {[
                    {
                      icon: <IconLayoutDashboard className="size-4" />,
                      title: "Analytics Dashboard",
                      description: "Track your job search progress",
                    },
                    {
                      icon: <IconFiles className="size-4" />,
                      title: "Document Management",
                      description: "Organize resumes and cover letters",
                    },
                    {
                      icon: <IconClipboardCheck className="size-4" />,
                      title: "Interview Preparation",
                      description: "Access interview guides and Q&A",
                    },
                    {
                      icon: <IconBrain className="size-4" />,
                      title: "AI Insights",
                      description: "Get intelligent suggestions",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3 rounded-lg border p-3"
                    >
                      <div className="mt-1 rounded-md bg-primary/10 p-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "How do I add a new job application?",
                  a: "Navigate to the Jobs page and click the 'Add Job' button. Fill in the required information about the job posting, including company name, position, and application status.",
                },
                {
                  q: "How can I track my application status?",
                  a: "Each job application can be updated with different statuses: New, Applied, Interviewing, Offered, etc. You can update the status from the job details page or the main jobs list.",
                },
                {
                  q: "How do I manage my documents?",
                  a: "Use the Documents section to create and manage different versions of your resumes and cover letters. You can create new documents, edit existing ones, and associate them with specific job applications.",
                },
                {
                  q: "What analytics are available?",
                  a: "The Dashboard provides various analytics including application funnel, response rates, interview success rates, and trends over time. You can use these insights to optimize your job search strategy.",
                },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <IconMail className="size-8" />,
                  title: "Email Support",
                  description: "Get help via email",
                  action: "Contact",
                },
                {
                  icon: <IconVideo className="size-8" />,
                  title: "Video Tutorials",
                  description: "Watch step-by-step guides",
                  action: "Watch",
                },
                {
                  icon: <IconUsers className="size-8" />,
                  title: "Community",
                  description: "Join our community forum",
                  action: "Join",
                },
                {
                  icon: <IconMessageCircle className="size-8" />,
                  title: "Live Chat",
                  description: "Chat with support team",
                  action: "Chat",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-lg border p-6 text-center"
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <Button variant="outline" size="sm">
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  );
}

function QuickAccessCard({
  icon,
  title,
  description,
  href,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">{icon}</div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Separator className="my-4" />
        <Button variant="ghost" size="sm" asChild>
          <a href={href}>Learn More</a>
        </Button>
      </CardContent>
    </Card>
  );
} 