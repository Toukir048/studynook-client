import { RefreshCcw } from "lucide-react";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}) => {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/30 dark:bg-red-500/10">
      <h2 className="text-2xl font-black text-red-700 dark:text-red-300">{title}</h2>

      <p className="mt-3 text-red-600 dark:text-red-300">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700 sm:w-auto"
      >
        <RefreshCcw size={18} />
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
