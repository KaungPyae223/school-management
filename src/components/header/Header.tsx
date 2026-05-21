import useBreadCrumbStore from "../../stores/useBreadCrumbStroe";
import { SidebarTrigger } from "../ui/sidebar";
import BreadCrumb from "./BreadCrumb";
import { AnimatePresence, m } from "framer-motion";

const Header = () => {
  const { title } = useBreadCrumbStore();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      {/* Left side: Trigger + Breadcrumb */}
      <div className="flex items-center gap-2.5">
        <SidebarTrigger />
        <BreadCrumb />
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          <m.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-semibold"
            key={title}
          >
            {title}
          </m.h1>
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
