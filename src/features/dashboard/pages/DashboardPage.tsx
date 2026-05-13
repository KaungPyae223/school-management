import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";

const DashboardPage = () => {
  useAddBreadcrumb({
    params: [
      {
        name: "Dashboard",
        link: "/dashboard",
      },
      {
        name: "Dashboard",
        link: "/dashboard",
      },
    ],
    title: "Dashboard",
  });

  return <div>DashboardPage</div>;
};

export default DashboardPage;
