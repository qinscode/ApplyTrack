import { Layout } from "@/components/custom/layout";
import { Button } from "@/components/custom/button";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconPlus, IconDownload, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface Resume {
  id: number;
  name: string;
  version: string;
  lastModified: string;
  targetRole?: string;
  targetCompany?: string;
}

export default function Resumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: 1,
      name: "Software Engineer Resume",
      version: "v1.2",
      lastModified: new Date().toISOString(),
      targetRole: "Frontend Developer",
    },
    {
      id: 2,
      name: "Tech Lead Resume",
      version: "v2.0",
      lastModified: new Date().toISOString(),
      targetRole: "Tech Lead",
    },
  ]);

  const handleDelete = (id: number) => {
    setResumes(resumes.filter(resume => resume.id !== id));
    toast({
      title: "Resume Deleted",
      description: "The resume has been deleted successfully.",
    });
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Resume Management</h2>
            <p className="text-muted-foreground">
              Manage and track different versions of your resumes
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full sm:w-auto"
            onClick={() => navigate("create")}
          >
            <IconPlus className="mr-2" />
            Add New Resume
          </Button>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{resume.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {resume.version}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Last modified: {new Date(resume.lastModified).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {resume.targetRole && (
                      <p className="text-sm">Target Role: {resume.targetRole}</p>
                    )}
                    {resume.targetCompany && (
                      <p className="text-sm">Target Company: {resume.targetCompany}</p>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <IconDownload className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`${resume.id}/edit`)}
                      >
                        <IconEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(resume.id)}
                      >
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
} 