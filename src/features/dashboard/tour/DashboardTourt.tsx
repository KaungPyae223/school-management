import type { Step } from "react-joyride";
import Tour from "../../../components/tour/Tour";

const DashboardTour = () => {
  const steps: Step[] = [
    {
      target: "[data-tour='kpi']",
      title: "Key Performance Indicators",
      content:
        "Get a quick overview of your school with important metrics such as students, teachers, courses, and payments.",
      skipBeacon: true,
    },
    {
      target: "[data-tour='revenue-enrollment']",
      title: "Revenue & Enrollment",
      content:
        "Compare monthly revenue and student enrollment to understand how your school's performance has changed over the past six months.",
      skipBeacon: true,
    },
    {
      target: "[data-tour='course-enrollment']",
      title: "Course Enrollment",
      content:
        "View enrollment trends across your courses and see how many students are enrolled in each course.",
      skipBeacon: true,
    },

    {
      target: "[data-tour='today-classes']",
      title: "Today's Classes",
      content:
        "Keep track of today's scheduled classes, including the class time, course, and teacher.",
      skipBeacon: true,
    },

    {
      target: "[data-tour='recent-enrollment']",
      title: "Recent Enrollments",
      content:
        "See the latest student enrollments and quickly keep up with new registrations.",
      skipBeacon: true,
    },

    {
      target: "[data-tour='recent-payment']",
      title: "Recent Payments",
      content:
        "Review the most recent payments and monitor your school's latest payment activity.",
      skipBeacon: true,
      placement: "top",
    },

    {
      target: "[data-tour='outstanding-payment']",
      title: "Outstanding Payments",
      content:
        "Track pending payments and see the total amount that is still outstanding.",
      skipBeacon: true,
      placement: "top",
    },
  ];

  return <Tour steps={steps} tourID={"dashboard"} />;
};

export default DashboardTour;
