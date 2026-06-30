import PrimaryButton from "./PrimaryButton";

const EmptyState = ({
  title = "No data found",
  description = "There is nothing to show right now.",
  buttonText,
  buttonTo,
}) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-slate-800">
        📚
      </div>

      <h3 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {buttonText && buttonTo && (
        <div className="mt-6">
          <PrimaryButton to={buttonTo}>{buttonText}</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
