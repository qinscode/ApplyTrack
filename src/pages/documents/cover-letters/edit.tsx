import { Layout } from "@/components/custom/layout";
import { DocumentEditor } from "@/components/documents/document-editor";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "@/components/ui/use-toast";

export default function EditCoverLetter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const response = await api.get(`/documents/cover-letters/${id}`);
        setCoverLetter(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch cover letter. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetter();
  }, [id]);

  const handleSave = async (data: any) => {
    await api.put(`/documents/cover-letters/${id}`, data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Edit Cover Letter</h2>
            <p className="text-muted-foreground">
              Update your cover letter content and details
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>

        <DocumentEditor
          type="cover-letter"
          initialData={coverLetter}
          onSave={handleSave}
          onCancel={() => navigate(-1)}
        />
      </Layout.Body>
    </Layout>
  );
} 