import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>StudyNook – Register</title>
      </Helmet>

      <section className="mx-auto flex min-h-[calc(100vh-180px)] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">Register</h1>
          <p className="mt-2 text-sm text-slate-500">
            Create your StudyNook account.
          </p>

          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <button className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white">
              Register
            </button>

            <button
              type="button"
              className="w-full rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700"
            >
              Continue with Google
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;