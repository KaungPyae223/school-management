import { createBrowserRouter } from "react-router";
import dashboardRoutes from "../features/dashboard/routes/routes";
import NotFound from "../components/errors/NotFound";
import ErrorPage from "../components/errors/ErrorPage";
import courceRoutes from "../features/courses/routes/routes";
import studentRoutes from "../features/students/routes/routes";
import teacherRoutes from "../features/teachers/routes/routes";
import classesRoutes from "../features/classes/routes/routes";
import timetableRoutes from "../features/timetable/routes/routes";
import enrollRoutes from "../features/enroll/routes/routes";
import paymentRoutes from "../features/payments/routes/routes";
import settingRoutes from "../features/settings/routes/routes";
import authRoutes from "../features/auth/routes/routes";

import Layout from "../layouts/Layout";

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      ...dashboardRoutes,
      ...courceRoutes,
      ...studentRoutes,
      ...teacherRoutes,
      ...classesRoutes,
      ...timetableRoutes,
      ...enrollRoutes,
      ...paymentRoutes,
      ...settingRoutes,
      {
        path: "*",
        Component: NotFound,
      },
    ],
    ErrorBoundary: ErrorPage,
  },
  ...authRoutes,
];

const router = createBrowserRouter(routes);

export default router;
