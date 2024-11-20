import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

type CareerGoal = {
  goalType: string;
  targetTitle: string;
  targetDate: string;
  salaryMin: number;
  salaryMax: number;
};

const GOAL_TYPES = {
  SAME_PATH: "Land a new job in the same career path",
  NEW_PATH: "Land a new job in a new career path",
  EXPLORE: "Explore new career paths",
} as const;

export function CareerGoals() {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState<CareerGoal>({
    goalType: GOAL_TYPES.SAME_PATH,
    targetTitle: "",
    targetDate: "",
    salaryMin: 0,
    salaryMax: 0,
  });

  const handleSave = () => {
    setOpen(false);
  };

  const formatSalary = (min: number, max: number) => {
    if (min === 0 && max === 0) {
      return "Not set";
    }
    return `$${min.toLocaleString()} to $${max.toLocaleString()}`;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="flex items-center text-xl font-bold">
              <span>Next Career Goal :</span>
              <span className="mx-3">{goals.goalType}</span>
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <PencilIcon className="size-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Target Title
              </div>
              <div className="mt-1 text-sm">
                {goals.targetTitle || "Not set"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Target Date
              </div>
              <div className="mt-1 text-sm">
                {goals.targetDate
                  ? new Date(goals.targetDate).toLocaleDateString()
                  : "Not set"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Target Salary Range
              </div>
              <div className="mt-1 text-sm">
                {formatSalary(goals.salaryMin, goals.salaryMax)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Goals</DialogTitle>
            <DialogDescription>
              What's next in your career journey?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Goal Type</Label>
              <Select
                value={goals.goalType}
                onValueChange={value =>
                  setGoals({ ...goals, goalType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(GOAL_TYPES).map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetTitle">Target Title</Label>
              <Input
                id="targetTitle"
                value={goals.targetTitle}
                onChange={e =>
                  setGoals({ ...goals, targetTitle: e.target.value })}
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={goals.targetDate}
                onChange={e =>
                  setGoals({ ...goals, targetDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Target Salary Range</Label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={goals.salaryMin || ""}
                    className="pl-6"
                    onChange={e =>
                      setGoals({ ...goals, salaryMin: Number(e.target.value) })}
                  />
                </div>
                <span className="text-muted-foreground">to</span>
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={goals.salaryMax || ""}
                    className="pl-6"
                    onChange={e =>
                      setGoals({ ...goals, salaryMax: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
