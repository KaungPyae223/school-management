import useBreadCrumbStore from "../../stores/useBreadCrumbStroe";
import { SidebarTrigger } from "../ui/sidebar";
import BreadCrumb from "./BreadCrumb";


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
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
