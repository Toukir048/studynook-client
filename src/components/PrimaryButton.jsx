import { Link } from "react-router-dom";

const baseClass =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";

const variants = {
  dark: "bg-slate-950 text-white hover:bg-slate-800",
  light: "border border-slate-300 bg-white text-slate-800 hover:border-slate-400",
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