import { Navigate, useLoaderData } from "react-router";
import Settings2FAVerify from "../../settings/components/2fa/Settings2FAVerify";
import AuthResetPasswordForm from "../components/forms/AuthResetPasswordForm";

const ForgePasswordPage = () => {
  const { is2FAEnabled, is2FAVerified, resetCount } = useLoaderData();

  if (!is2FAEnabled || resetCount <= 0) {
    return <Navigate to="/login" />;
  }

  if (!is2FAVerified)
    return (
      <div className="h-dvh flex items-center justify-center">
        <Settings2FAVerify />
      </div>
    );

  return (
    <div className="h-dvh flex items-center justify-center">
      <AuthResetPasswordForm resetCount={resetCount} />
    </div>
  );
};

export default ForgePasswordPage;
