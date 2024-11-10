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
import { Checkbox } from "@/components/ui/checkbox";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ChecklistItem {
  id: number;
  title: string;
  completed: boolean;
}

interface Checklist {
  id: number;
  title: string;
  company?: string;
  date?: string;
  items: ChecklistItem[];
}

const defaultChecklist: ChecklistItem[] = [
  { id: 1, title: "Research company background", completed: false },
  { id: 2, title: "Review job description", completed: false },
  { id: 3, title: "Prepare STAR examples", completed: false },
  { id: 4, title: "Update resume", completed: false },
  { id: 5, title: "Prepare questions for interviewer", completed: false },
  { id: 6, title: "Test video call setup", completed: false },
  { id: 7, title: "Prepare professional attire", completed: false },
  { id: 8, title: "Review portfolio/projects", completed: false },
];

export default function InterviewChecklists() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: 1,
      title: "Frontend Developer Interview",
      company: "Tech Corp",
      date: "2024-03-20",
      items: [...defaultChecklist],
    },
    {
      id: 2,
      title: "Software Engineer Interview",
      company: "Startup Inc",
      date: "2024-03-25",
      items: [...defaultChecklist],
    },
  ]);

  const handleToggleItem = (checklistId: number, itemId: number) => {
    setChecklists(lists =>
      lists.map(list =>
        list.id === checklistId
          ? {
              ...list,
              items: list.items.map(item =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );
  };

  const handleDelete = (id: number) => {
    setChecklists(lists => lists.filter(list => list.id !== id));
    toast({
      title: "Checklist Deleted",
      description: "The checklist has been deleted successfully.",
    });
  };

  const getProgress = (items: ChecklistItem[]) => {
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Interview Checklists
            </h2>
            <p className="text-muted-foreground">
              Manage your interview preparation checklists
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full sm:w-auto">
            <IconPlus className="mr-2" />
            Add New Checklist
          </Button>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {checklists.map(checklist => (
              <Card key={checklist.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{checklist.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(checklist.id)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    {checklist.company && <div>Company: {checklist.company}</div>}
                    {checklist.date && (
                      <div>Date: {new Date(checklist.date).toLocaleDateString()}</div>
                    )}
                    <div>Progress: {getProgress(checklist.items)}%</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {checklist.items.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() =>
                            handleToggleItem(checklist.id, item.id)
                          }
                        />
                        <span
                          className={
                            item.completed ? "text-muted-foreground line-through" : ""
                          }
                        >
                          {item.title}
                        </span>
                      </div>
                    ))}
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