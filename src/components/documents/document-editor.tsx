import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const documentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  version: z.string().min(1, "Version is required"),
  targetRole: z.string().optional(),
  targetCompany: z.string().optional(),
  template: z.string().optional(),
});

type DocumentEditorProps = {
  type: "resume" | "cover-letter";
  initialData?: z.infer<typeof documentSchema> & { content?: string };
  onSave: (
    data: z.infer<typeof documentSchema> & { content: string },
  ) => Promise<void>;
  onCancel: () => void;
};

const templates = {
  "resume": [
    { id: "modern", name: "Modern Professional" },
    { id: "classic", name: "Classic" },
    { id: "creative", name: "Creative" },
  ],
  "cover-letter": [
    { id: "standard", name: "Standard Professional" },
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" },
  ],
};

export function DocumentEditor({
  type,
  initialData,
  onSave,
  onCancel,
}: DocumentEditorProps) {
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: initialData || {
      version: "v1.0",
      template: type === "resume" ? "modern" : "standard",
    },
  });

  const handleSubmit = async (values: z.infer<typeof documentSchema>) => {
    try {
      const content = editorRef.current?.getContent() || "";
      await onSave({ ...values, content });
      toast({
        title: "Success",
        description: `${
          type === "resume" ? "Resume" : "Cover Letter"
        } saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save. Please try again.${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit" : "Create"}
          {" "}
          {type === "resume" ? "Resume" : "Cover Letter"}
        </CardTitle>
        <CardDescription>
          {initialData
            ? "Update your document details and content"
            : "Fill in the details and content for your new document"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Software Engineer Resume"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. v1.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Tech Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates[type].map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Content</FormLabel>
              <Editor
                apiKey="your-tinymce-api-key"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={initialData?.content || ""}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | "
                    + "bold italic forecolor | alignleft aligncenter "
                    + "alignright alignjustify | bullist numlist outdent indent | "
                    + "removeformat | help",
                }}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">{initialData ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
