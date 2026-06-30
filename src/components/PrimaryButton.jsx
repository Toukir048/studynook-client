import { Link } from "react-router-dom";

const baseClass =
    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-semibold leading-tight shadow-sm transition hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto";

const variants = {
    dark: "bg-slate-950 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white",
    light: "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500 dark:hover:bg-slate-800",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
};

const PrimaryButton = ({
    children,
    to,
    variant = "dark",
    className = "",
    ...props
}) => {
    const finalClass = `${baseClass} ${variants[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={finalClass}>
                {children}
            </Link>
        );
    }

    return (
        <button className={finalClass} {...props}>
            {children}
        </button>
    );
};


export default PrimaryButton;
