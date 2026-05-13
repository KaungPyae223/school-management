import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/side-bar/SideBar";
import { Outlet } from "react-router";
import Header from "../components/header/Header";
import { Suspense } from "react";
import { Toaster } from "../components/ui/sonner";
import LoadingPage from "../components/loading/LoadingPage";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="border-b bg-background">
          <Header />
        </div>

        <div className="p-6 container mx-auto">
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Toaster position="top-center" richColors={true} />
    </SidebarProvider>
  );
};

export default Layout;
