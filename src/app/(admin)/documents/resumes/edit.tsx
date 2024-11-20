import api from "@/api/axios";
import { DocumentEditor } from "@/components/documents/document-editor";
import ThemeSwitch from "@/components/theme-switch";
import { toast } from "@/components/ui/use-toast";
import { UserNav } from "@/components/user-nav";
import { router } from "next/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditResume() {
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/documents/resumes/${id}`);
        setResume(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to fetch resume. Please try again.${error}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  const handleSave = async (data: any) => {
    await api.put(`/documents/resumes/${id}`, data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Resume</h2>
          <p className="text-muted-foreground">
            Update your resume content and details
          </p>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </div>

      <DocumentEditor
        type="resume"
        initialData={resume}
        onSave={handleSave}
        onCancel={() => router.back()}
      />
    </>
  );
}
