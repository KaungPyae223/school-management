import { useEffect, useState } from "react";
import { authService } from "../services/auth";
import LoadingPage from "../components/loading/LoadingPage";
import { Navigate } from "react-router";

type AuthStatus = "loading" | "setup" | "locked" | "authenticated";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const initialize = async () => {
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        setStatus("authenticated");
        return;
      }
      const hasPassword = await authService.hasPassword();
      setStatus(hasPassword ? "locked" : "setup");
    };

    initialize();
  }, []);

  if (status === "loading") return <LoadingPage />;
  if (status === "locked") return <Navigate to="/login" replace />;
  if (status === "authenticated" || status === "setup") return children;
};

export default AuthGuard;
