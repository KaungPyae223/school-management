import { lazy } from "react";
import ErrorPage from "../../../components/errors/ErrorPage";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));

const routes = [
  {
    index: true,
    Component: DashboardPage,
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
