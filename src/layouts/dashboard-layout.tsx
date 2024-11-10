import { Layout } from "@/components/custom/layout";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

interface DashboardLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DashboardLayout({ title, description, children }: DashboardLayoutProps) {
  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>

        <div className="grid gap-4">
          {children}
        </div>
      </Layout.Body>
    </Layout>
  );
} 