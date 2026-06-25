import { Helmet } from "react-helmet-async";
import { Home, SearchX } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found | StudyNook</title>
      </Helmet>

      <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <SearchX size={40} />
          </div>

          <p className="text-lg font-bold text-emerald-600">404 Error</p>

          <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            The page you are looking for may have been moved, deleted, or does
            not exist. Please return to the homepage and continue browsing
            StudyNook.
          </p>

          <div className="mt-8 flex justify-center">
            <PrimaryButton to="/" variant="green">
              <Home size={18} />
              Back to Home
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;