import { HTMLAttributes, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/custom/button.tsx";
import { PasswordInput } from "@/components/custom/password-input.tsx";
import { cn } from "@/lib/utils.ts";
import { authApi } from "@/api";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast.ts";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

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

declare global {
  interface Window {
    gapi: any;
  }
}

// 添加这行来获取环境变量
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const loadGoogleSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadGoogleSDK();
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await authApi.login(data.email, data.password);
      console.log("Login successful", response);

      // Save token to local storage
      localStorage.setItem("token", response.token);

      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("Login failed", error.response.data);
          toast({
            title: "Login Failed",
            description:
              error.response.data.message || "An error occurred during login.",
            variant: "destructive",
          });
        } else if (error.request) {
          console.error("No response received", error.request);
          toast({
            title: "Network Error",
            description:
              "No response received from server. Please check your connection.",
            variant: "destructive",
          });
        } else {
          console.error("Error", error.message);
          toast({
            title: "Error",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      } else {
        console.error("An unexpected error occurred", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID, // 使用环境变量
        scope: 'email profile',
        callback: async (response) => {
          if (response.access_token) {
            try {
              const result = await authApi.googleLogin(response.access_token);
              console.log('Google login successful', result);
              localStorage.setItem("token", result.token);
              toast({
                title: "Google Login Successful",
                description: "You have been successfully logged in with Google.",
              });
              navigate("/");
            } catch (error) {
              console.error('Backend login failed', error);
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
      console.error('Google login failed', error);
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
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      to="/forgot-password"
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
            <Button className="mt-2" loading={isLoading}>
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
                leftSection={<IconBrandGoogle className="h-4 w-4" />}
                onClick={handleGoogleSignIn}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandGithub className="h-4 w-4" />}
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandFacebook className="h-4 w-4" />}
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
