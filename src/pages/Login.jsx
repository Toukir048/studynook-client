import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message || "Invalid email or password");
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Google login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message || "Google login failed");
      });
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – Login</title>
      </Helmet>

      <section className="mx-auto flex min-h-[calc(100vh-180px)] max-w-md items-center px-4 py-12">
        <div className="w-full rounded-3xl bg-white p-8 shadow-sm dark:border dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Login</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Access your StudyNook dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
            />

            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
            />

            <button className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white">
              Login
            </button>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
            >
              Continue with Google
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-emerald-600">
              Register
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
