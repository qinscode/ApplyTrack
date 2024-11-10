import { Layout } from "@/components/custom/layout";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IconMail, IconPlus, IconTrash } from "@tabler/icons-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import api from "@/api/axios";

interface EmailAccount {
  id: number;
  email: string;
  lastSynced: string;
  status: "active" | "error" | "syncing";
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  provider: z.enum(["gmail", "outlook", "other"]),
});

export default function EmailTracking() {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      provider: "gmail",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post("/email-tracking/accounts", values);
      setAccounts([...accounts, response.data]);
      setIsAddingAccount(false);
      form.reset();
      toast({
        title: "Email account added",
        description: "Your email account has been successfully connected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add email account. Please try again.",
        variant: "destructive",
      });
    }
  }

  const removeAccount = async (id: number) => {
    try {
      await api.delete(`/email-tracking/accounts/${id}`);
      setAccounts(accounts.filter(account => account.id !== id));
      toast({
        title: "Account removed",
        description: "Email account has been disconnected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const syncAccount = async (id: number) => {
    try {
      const account = accounts.find(a => a.id === id);
      if (account) {
        account.status = "syncing";
        setAccounts([...accounts]);
        await api.post(`/email-tracking/accounts/${id}/sync`);
        account.status = "active";
        account.lastSynced = new Date().toISOString();
        setAccounts([...accounts]);
        toast({
          title: "Sync completed",
          description: "Your email account has been synced successfully.",
        });
      }
    } catch (error) {
      const account = accounts.find(a => a.id === id);
      if (account) {
        account.status = "error";
        setAccounts([...accounts]);
      }
      toast({
        title: "Sync failed",
        description: "Failed to sync email account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Email Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Connect your email accounts to automatically track job application statuses.
            </p>
          </div>

          <div className="space-y-4">
            {accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {account.email}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => syncAccount(account.id)}
                      disabled={account.status === "syncing"}
                    >
                      Sync Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAccount(account.id)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Last synced: {new Date(account.lastSynced).toLocaleString()}
                    <br />
                    Status: {account.status}
                  </div>
                </CardContent>
              </Card>
            ))}

            {isAddingAccount ? (
              <Card>
                <CardHeader>
                  <CardTitle>Add Email Account</CardTitle>
                  <CardDescription>
                    Enter your email credentials to start tracking job applications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                              For Gmail, use an App Password instead of your regular password.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddingAccount(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Add Account</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingAccount(true)}
              >
                <IconPlus className="mr-2 h-4 w-4" />
                Add Email Account
              </Button>
            )}
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
} 