import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
} & React.HTMLAttributes<HTMLDivElement>;

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

export function LoadingSpinner({
  size = "md",
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={cn("animate-spin text-muted-foreground", className)}
      {...props}
    >
      <Loader2 className={sizeClasses[size]} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
