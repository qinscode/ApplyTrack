import { UserAuthForm } from "@/app/(auth)/components/user-auth-form";
import Image from "next/image";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function SignIn() {
  return (
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 size-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Job Application Tracker
        </div>
        <Image
          className="relative m-auto"
          src="/images/vite.svg"
          alt="Logo"
          width={301}
          height={60}
        />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Your work is going to fill a large part of your life, and
              the only way to be truly satisfied is to do what you believe is
              great work. The only way to do great work is to love what you do.
              If you haven&#39;t found it yet, keep looking. Don&#39;t settle.
              As with all matters of the heart, you&#39;ll know when you find
              it.&rdquo;
            </p>
            <footer className="text-sm">Steve Jobs</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to log into your account.
              {API_URL}
            </p>
            <p className="text-sm text-muted-foreground">
              Don&#39;t have an account?{" "}
              <a
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign Up
              </a>
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking login, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
