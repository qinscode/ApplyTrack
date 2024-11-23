"use client";
import { authApi } from "@/api";
import { Button } from "@/components/auth/button";
import { PasswordInput } from "@/components/auth/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

type UserAuthFormProps = {
  className?: string;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(4, {
      message: "Password must be at least 4 characters long",
    }),
});

// 添加这行来获取环境变量
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export function UserAuthForm({
  className,
  onSubmit: externalSubmit,
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const loadGoogleSDK = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadGoogleSDK();
  }, []);

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    if (externalSubmit) {
      externalSubmit(data);
      return;
    }

    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast({
            title: "Login Failed",
            description:
              error.response.data.message || "An error occurred during login.",
            variant: "destructive",
          });
        } else if (error.request) {
          toast({
            title: "Network Error",
            description:
              "No response received from server. Please check your connection.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      if (!window.google) {
        throw new Error("Google SDK not loaded");
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: async (response) => {
          if (response.access_token) {
            try {
              const result = await authApi.googleLogin(response.access_token);
              console.log("Google login successful", result);
              localStorage.setItem("token", result.token);
              toast({
                title: "Google Login Successful",
                description:
                  "You have been successfully logged in with Google.",
              });
              router.push("/");
            } catch (error) {
              console.error("Backend login failed", error);
              toast({
                title: "Login Failed",
                description: "An error occurred during login with Google.",
                variant: "destructive",
              });
            }
          }
        },
      });

      client.requestAccessToken();
    } catch (error) {
      console.error("Google login failed", error);
      toast({
        title: "Google Login Failed",
        description: "An error occurred during Google login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/src/app/(admin)/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isLoading} type="submit">
              Login
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandGoogle className="size-4" />}
                onClick={handleGoogleSignIn}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandGithub className="size-4" />}
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandFacebook className="size-4" />}
              >
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
