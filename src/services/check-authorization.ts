import { useNavigate } from "react-router";

export const checkAuthorization = (error: string): void => {
  const navigate = useNavigate();

  if (error === "UNAUTHORIZED") {
    navigate("/login", { replace: true });
  }
};
