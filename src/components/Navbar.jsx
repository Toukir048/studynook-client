import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen, ChevronDown, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { applyTheme, getStoredTheme, storeTheme } from "../utils/theme";

const defaultAvatar = "/default-avatar.svg";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-emerald-600 font-semibold dark:text-emerald-400"
    : "text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400";

const mobileNavLinkClass = ({ isActive }) =>
  isActive
    ? "block rounded-2xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
    : "block rounded-2xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [theme, setTheme] = useState(getStoredTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully");
        closeMenus();
      })
      .catch(() => {
        toast.error("Failed to logout");
      });
  };

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const ThemeToggleButton = ({ className = "" }) => (
    <button
      type="button"
      onClick={handleThemeToggle}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400 ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  const handleAvatarError = (event) => {
    event.currentTarget.src = defaultAvatar;
  };

  const userPhoto = user?.photoURL || defaultAvatar;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <Link to="/" onClick={closeMenus} className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950">
              <BookOpen size={20} />
            </span>

            <div>
              <h2 className="text-xl font-bold leading-none text-slate-950 dark:text-white">
                StudyNook
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quiet rooms. Easy booking.
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/rooms" className={navLinkClass}>
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-room" className={navLinkClass}>
                  Add Room
                </NavLink>

                <NavLink to="/my-listings" className={navLinkClass}>
                  My Listings
                </NavLink>

                <NavLink to="/my-bookings" className={navLinkClass}>
                  My Bookings
                </NavLink>
              </>
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggleButton />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500"
                >
                  <img
                    src={userPhoto}
                    alt={user.displayName || "User"}
                    onError={handleAvatarError}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div className="text-left">
                    <p className="max-w-[140px] truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {user.displayName || "StudyNook User"}
                    </p>
                    <p className="max-w-[160px] truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition dark:text-slate-400 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
                    <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
                      <p className="font-semibold text-slate-950 dark:text-slate-100">
                        {user.displayName || "StudyNook User"}
                      </p>
                      <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/my-listings"
                        onClick={closeMenus}
                        className="block rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                      >
                        My Listings
                      </Link>

                      <Link
                        to="/my-bookings"
                        onClick={closeMenus}
                        className="block rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                      >
                        My Bookings
                      </Link>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggleButton />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-slate-100 py-4 lg:hidden dark:border-slate-800">
            <div className="space-y-2">
              <NavLink to="/" onClick={closeMenus} className={mobileNavLinkClass}>
                Home
              </NavLink>

              <NavLink
                to="/rooms"
                onClick={closeMenus}
                className={mobileNavLinkClass}
              >
                Rooms
              </NavLink>

              {user && (
                <>
                  <NavLink
                    to="/add-room"
                    onClick={closeMenus}
                    className={mobileNavLinkClass}
                  >
                    Add Room
                  </NavLink>

                  <NavLink
                    to="/my-listings"
                    onClick={closeMenus}
                    className={mobileNavLinkClass}
                  >
                    My Listings
                  </NavLink>

                  <NavLink
                    to="/my-bookings"
                    onClick={closeMenus}
                    className={mobileNavLinkClass}
                  >
                    My Bookings
                  </NavLink>
                </>
              )}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-3xl bg-slate-50 p-3 dark:bg-slate-900">
                    <img
                      src={userPhoto}
                      alt={user.displayName || "User"}
                      onError={handleAvatarError}
                      className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-slate-950 dark:text-slate-100">
                        {user.displayName || "StudyNook User"}
                      </p>
                      <p className="max-w-[240px] truncate text-sm text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenus}
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
