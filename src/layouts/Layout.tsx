import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/side-bar/SideBar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import Header from "../components/header/Header";

import { Toaster } from "../components/ui/sonner";
import LoadingPage from "../components/loading/LoadingPage";

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col min-h-screen flex-1 ">
        <div className="border-b bg-background shrink-0">
          <Header />
        </div>
        <div className="p-6 container mx-auto flex-1 flex flex-col ">
          {isLoading ? <LoadingPage layout /> : <Outlet />}
        </div>
      </main>
      <ScrollRestoration />
      <Toaster position="top-center" richColors={true} />
    </SidebarProvider>
  );
};

export default Layout;
