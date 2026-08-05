import { TooltipProvider } from "../components/ui/tooltip";
import { RouterProvider } from "react-router";
import { LazyMotion, domAnimation } from "framer-motion";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../components/theme-provider/theme-provider";

const Index = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LazyMotion features={domAnimation}>
            <RouterProvider router={router} />
          </LazyMotion>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Index;
