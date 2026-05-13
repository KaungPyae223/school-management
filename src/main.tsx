import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Index from "./routers/Index.tsx";

createRoot(document.getElementById("root")!).render(<Index />);
