import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import SkipToMain from "./skip-to-main";
import { Layout } from "./custom/layout";

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full overflow-hidden bg-background">
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Layout
        id="content"
        className={`overflow-x-hidden pt-0 transition-[margin] md:overflow-y-hidden ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Outlet />
      </Layout>
    </div>
  );
}
