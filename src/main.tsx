import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Index from "./routers/Index.tsx";
import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/monarch/theme.css";
import "@fullcalendar/react/themes/monarch/palettes/blue.css"; // You can try other colors here

createRoot(document.getElementById("root")!).render(<Index />);
