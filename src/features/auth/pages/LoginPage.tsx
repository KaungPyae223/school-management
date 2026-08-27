import AuthLoginForm from "../components/forms/AuthLoginForm";

const LoginPage = () => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <AuthLoginForm navigateLink="/" />
    </div>
  );
};

export default LoginPage;
