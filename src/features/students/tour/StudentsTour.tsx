import type { Step } from "react-joyride";
import Tour from "../../../components/tour/Tour";

const StudentsTour = () => {
  const steps: Step[] = [
    {
      target: "[data-tour='search']",
      title: "Search Students",
      content: "Search for students by name, email, or phone number.",
      skipBeacon: true,
    },
    {
      target: "[data-tour='view-change']",
      title: "Change View",
      content: "Change the view of the students data between list and grid. ",
      skipBeacon: true,
    },
    {
      target: "[data-tour='export-csv']",
      title: "Export CSV",
      content: "Export student data to CSV for easy analysis and reporting.",
      skipBeacon: true,
    },

    {
      target: "[data-tour='create-student']",
      title: "Create Student",
      content: "Create a new student by providing the necessary information.",
      skipBeacon: true,
    },
  ];

  return <Tour steps={steps} tourID={"students"} />;
};

export default StudentsTour;
