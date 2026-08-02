import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";

const DashboardPage = () => {
  useAddBreadcrumb({
    
    title: "Dashboard",
  });

  return <div>DashboardPage</div>;
};

export default DashboardPage;
