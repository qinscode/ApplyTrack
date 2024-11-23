import api from "@/api/axios";
import { DocumentEditor } from "@/components/documents/document-editor";
import ThemeSwitch from "@/components/theme/theme-switch";
import { UserNav } from "@/components/user-nav";

import { useRouter } from "next/navigation";

export default function CreateCoverLetter() {
  const router = useRouter();

  const handleSave = async (data: any) => {
    await api.post("/documents/cover-letters", data);
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Create Cover Letter
          </h2>
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
        onCancel={() => router.back()}
      />
    </>
  );
}
