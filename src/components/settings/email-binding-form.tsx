"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const emailBindingFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .email("This is not a valid email"),
});

type EmailBindingFormValues = z.infer<typeof emailBindingFormSchema>;

// 这里模拟已绑定的邮箱列表
const MOCK_BOUND_EMAILS = [
  { email: "work@example.com", status: "verified" },
  { email: "personal@example.com", status: "pending" },
];

export function EmailBindingForm() {
  const form = useForm<EmailBindingFormValues>({
    resolver: zodResolver(emailBindingFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: EmailBindingFormValues) {
    toast.success("Verification email sent!");
    console.log(data);
    form.reset();
  }

  function handleUnbind(email: string) {
    toast.success(`Unbound email: ${email}`);
  }

  function handleResendVerification(email: string) {
    toast.success(`Verification email resent to: ${email}`);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bound Email Addresses</CardTitle>
          <CardDescription>
            These email addresses will be used for AI analysis of job-related emails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_BOUND_EMAILS.map(boundEmail => (
              <div
                key={boundEmail.email}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {boundEmail.email}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={boundEmail.status === "verified" ? "default" : "secondary"}
                    >
                      {boundEmail.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-x-2">
                  {boundEmail.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResendVerification(boundEmail.email)}
                    >
                      Resend
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleUnbind(boundEmail.email)}
                  >
                    Unbind
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Email</CardTitle>
          <CardDescription>
            Add a new email address for AI analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll send a verification email to this address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Email</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
