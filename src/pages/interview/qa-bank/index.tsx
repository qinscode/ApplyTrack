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
import { Badge } from "@/components/ui/badge";
import { IconPlus, IconBookmark, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface QAItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  isBookmarked: boolean;
  lastReviewed?: string;
  notes?: string;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export default function QABank() {
  const [qaItems, setQAItems] = useState<QAItem[]>([
    {
      id: 1,
      question: "Tell me about yourself",
      answer: "Start with current role, highlight key achievements, mention relevant experience, and conclude with career goals.",
      category: "Behavioral",
      difficulty: "Easy",
      tags: ["Common", "Introduction"],
      isBookmarked: true,
      lastReviewed: "2024-03-15",
      notes: "Remember to keep it under 2 minutes",
    },
    {
      id: 2,
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness, but focus on steps taken to improve and overcome it.",
      category: "Behavioral",
      difficulty: "Medium",
      tags: ["Common", "Self-awareness"],
      isBookmarked: false,
    },
    {
      id: 3,
      question: "Explain React's Virtual DOM",
      category: "Technical",
      answer: "Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by minimizing direct DOM manipulation.",
      difficulty: "Hard",
      tags: ["React", "Frontend", "Performance"],
      isBookmarked: true,
      notes: "Include reconciliation process in answer",
    },
  ]);

  const handleDelete = (id: number) => {
    setQAItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Question Deleted",
      description: "The question has been deleted successfully.",
    });
  };

  const toggleBookmark = (id: number) => {
    setQAItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      )
    );
    toast({
      title: "Bookmark Updated",
      description: "Your bookmark has been updated.",
    });
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Interview Q&A Bank</h2>
            <p className="text-muted-foreground">
              Manage and practice your interview questions
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
            Add New Question
          </Button>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qaItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle>{item.question}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge className={difficultyColors[item.difficulty]}>
                          {item.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(item.id)}
                      className={item.isBookmarked ? "text-yellow-500" : ""}
                    >
                      <IconBookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Answer:</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                    {item.notes && (
                      <div>
                        <h4 className="font-medium">Notes:</h4>
                        <p className="text-sm text-muted-foreground">{item.notes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {item.lastReviewed && (
                      <p className="text-xs text-muted-foreground">
                        Last reviewed: {new Date(item.lastReviewed).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <IconEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
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