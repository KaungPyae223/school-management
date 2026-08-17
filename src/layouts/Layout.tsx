import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/side-bar/SideBar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import Header from "../components/header/Header";

import { Toaster } from "../components/ui/sonner";
import LoadingPage from "../components/loading/LoadingPage";
import AuthGuard from "./AuthGuard";

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <SidebarProvider>
      <AuthGuard>
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b bg-background">
            <Header />
          </div>
          <div className="p-6 container mx-auto">
            {isLoading ? <LoadingPage /> : <Outlet />}
          </div>
        </main>
        <ScrollRestoration />
        <Toaster position="top-center" richColors={true} />
      </AuthGuard>
    </SidebarProvider>
  );
};

export default Layout;
