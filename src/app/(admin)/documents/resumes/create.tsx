import api from "@/api/axios";
import { DocumentEditor } from "@/components/documents/document-editor";
import ThemeSwitch from "@/components/theme/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateResume() {
  const router = useRouter();
  const handleSave = async (data: any) => {
    await api.post("/documents/resumes", data);
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Resume</h2>
          <p className="text-muted-foreground">
            Create a new resume using our templates
          </p>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </div>
      <DocumentEditor
        type="resume"
        onSave={handleSave}
        onCancel={() => router.back()}
      />
    </>
  );
}
