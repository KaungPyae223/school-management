import { TooltipProvider } from "../components/ui/tooltip";
import { RouterProvider } from "react-router";
import { LazyMotion, domAnimation } from "framer-motion";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Index = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LazyMotion features={domAnimation}>
          <RouterProvider router={router} />
        </LazyMotion>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Index;
