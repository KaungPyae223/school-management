import { TooltipProvider } from "../components/ui/tooltip";
import { RouterProvider } from "react-router";
import { LazyMotion, domAnimation } from "framer-motion";
import router from "./routes";

const Index = () => {
  return (
    <TooltipProvider>
      <LazyMotion features={domAnimation}>
        <RouterProvider router={router} />
      </LazyMotion>
    </TooltipProvider>
  );
};

export default Index;
