const FormError = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return;

  return (
    <div
      className={`border border-destructive bg-destructive/10 text-destructive rounded-md p-3 text-sm`}
    >
      {errorMessage}
    </div>
  );
};

export default FormError;
