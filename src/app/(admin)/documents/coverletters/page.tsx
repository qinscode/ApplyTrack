"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  IconDownload,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CoverLetter = {
  id: number;
  name: string;
  version: string;
  lastModified: string;
  targetRole?: string;
  targetCompany?: string;
  template?: string;
};

export default function CoverLetters() {
  const router = useRouter();
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([
    {
      id: 1,
      name: "Frontend Developer Cover Letter",
      version: "v1.0",
      lastModified: new Date().toISOString(),
      targetRole: "Frontend Developer",
      targetCompany: "Tech Corp",
      template: "Modern Professional",
    },
    {
      id: 2,
      name: "Software Engineer Cover Letter",
      version: "v2.1",
      lastModified: new Date().toISOString(),
      targetRole: "Software Engineer",
      template: "Creative",
    },
  ]);

  const handleDelete = (id: number) => {
    setCoverLetters(coverLetters.filter(letter => letter.id !== id));
    toast({
      title: "Cover Letter Deleted",
      description: "The cover letter has been deleted successfully.",
    });
  };

  return (

    <div className="space-y-4">
      <Button
        className="w-full sm:w-auto"
        onClick={() => router.push("create")}
      >
        <IconPlus className="mr-2" />
        Add New Cover Letter
      </Button>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coverLetters.map(letter => (
          <Card key={letter.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{letter.name}</span>
                <span className="text-sm text-muted-foreground">
                  {letter.version}
                </span>
              </CardTitle>
              <CardDescription>
                Last modified:
                {" "}
                {new Date(letter.lastModified).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {letter.targetRole && (
                  <p className="text-sm">
                    Target Role:
                    {" "}
                    {letter.targetRole}
                  </p>
                )}
                {letter.targetCompany && (
                  <p className="text-sm">
                    Target Company:
                    {" "}
                    {letter.targetCompany}
                  </p>
                )}
                {letter.template && (
                  <p className="text-sm">
                    Template:
                    {letter.template}
                  </p>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <IconDownload className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`${letter.id}/edit`)}
                  >
                    <IconEdit className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(letter.id)}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  );
}
