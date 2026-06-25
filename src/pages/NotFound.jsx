import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>StudyNook – Page Not Found</title>
      </Helmet>

      <section className="mx-auto flex min-h-[calc(100vh-180px)] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-7xl font-black text-emerald-500">404</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">
          Page not found
        </h1>
        <p className="mt-3 max-w-xl text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </section>
    </>
  );
};

export default NotFound;