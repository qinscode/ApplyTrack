import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth-context";
import { RootProviders } from "@/providers/root-providers";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RootProviders>
          <AuthProvider>{children}</AuthProvider>
        </RootProviders>
      </body>
    </html>
  );
}
