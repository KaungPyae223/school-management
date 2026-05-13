const LoadingPage = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Please wait
        </p>

        <h1 className="text-4xl font-bold text-primary">Loading</h1>

        <p className="text-muted-foreground mt-3 mb-8">
          Fetching the page content for you...
        </p>

        <div className="flex items-center justify-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
