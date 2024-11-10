import { Layout } from "@/components/custom/layout";
import { DocumentEditor } from "@/components/documents/document-editor";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function CreateCoverLetter() {
  const navigate = useNavigate();

  const handleSave = async (data: any) => {
    await api.post("/documents/cover-letters", data);
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create Cover Letter</h2>
            <p className="text-muted-foreground">
              Create a new cover letter using our templates
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>

        <DocumentEditor
          type="cover-letter"
          onSave={handleSave}
          onCancel={() => navigate(-1)}
        />
      </Layout.Body>
    </Layout>
  );
} 