const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>

      <p className="font-semibold text-slate-500">{message}</p>
    </div>
  );
};

export default LoadingSpinner;