import { RefreshCcw } from "lucide-react";

const ErrorMessage = ({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}) => {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-2xl font-black text-red-700">{title}</h2>

      <p className="mt-3 text-red-600">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
      >
        <RefreshCcw size={18} />
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;