import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Register = () => {
    const { createUser, loginWithGoogle } = useAuth();
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }

        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }

        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }

        return "";
    };

    const handleRegister = (event) => {
        event.preventDefault();
        setPasswordError("");

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        const errorMessage = validatePassword(password);

        if (errorMessage) {
            setPasswordError(errorMessage);
            return;
        }

        createUser(name, email, photoURL, password)
            .then(() => {
                toast.success("Registration successful! Please login.");
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.message || "Registration failed");
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(() => {
                toast.success("Google registration successful");
                navigate("/");
            })
            .catch(() => {
                toast.error("Google registration failed");
            });
    };

    return (
        <>
            <Helmet>
                <title>StudyNook – Register</title>
            </Helmet>

            <section className="mx-auto flex min-h-[calc(100vh-180px)] max-w-md items-center px-4 py-12">
                <div className="w-full rounded-3xl bg-white p-8 shadow-sm dark:border dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Register</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Create your StudyNook account.
                    </p>

                    <form onSubmit={handleRegister} className="mt-6 space-y-4">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Full name"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
                        />

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email address"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
                        />

                        <input
                            type="text"
                            name="photoURL"
                            required
                            placeholder="Photo URL"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
                        />

                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
                        />

                        {passwordError && (
                            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {passwordError}
                            </p>
                        )}

                        <button className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white">
                            Register
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
