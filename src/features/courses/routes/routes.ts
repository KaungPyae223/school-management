import { lazy } from "react";
import ErrorPage from "../../../components/errors/ErrorPage";

const CoursesPage = lazy(() => import("../pages/CoursesPage"));
const CoursesCreatePage = lazy(() => import("../pages/CoursesCreatePage"));

const routes = [
  {
    path: "courses",
    Component: CoursesPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "courses/create",
    Component: CoursesCreatePage,
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
