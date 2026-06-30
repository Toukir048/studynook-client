const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600 dark:border-slate-800 dark:border-t-emerald-400"></div>

      <p className="font-semibold text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
