import SettingsPasswordCreateForm from "../../settings/components/SettingsPasswordCreateForm";

const RegisterPage = () => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <SettingsPasswordCreateForm navigateLink="/" back={false} />
    </div>
  );
};

export default RegisterPage;

