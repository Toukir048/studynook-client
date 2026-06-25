import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BookOpen, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-emerald-600 font-semibold"
    : "text-slate-600 hover:text-emerald-600";

const mobileNavLinkClass = ({ isActive }) =>
  isActive
    ? "rounded-2xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-600"
    : "rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully");
        setIsMenuOpen(false);
      })
      .catch(() => {
        toast.error("Failed to logout");
      });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <BookOpen size={20} />
          </span>

          <div>
            <h2 className="text-xl font-bold leading-none text-slate-950">
              StudyNook
            </h2>
            <p className="text-xs text-slate-500">Quiet rooms. Easy booking.</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
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

        {/* Desktop Auth Area */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/2KQnYp7/default-avatar.png"
                }
                alt={user.displayName || "User"}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="hidden text-right lg:block">
                <p className="text-sm font-semibold text-slate-900">
                  {user.displayName || "StudyNook User"}
                </p>
                <p className="max-w-[180px] truncate text-xs text-slate-500">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <span className="flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink onClick={closeMenu} to="/" className={mobileNavLinkClass}>
              Home
            </NavLink>

            <NavLink
              onClick={closeMenu}
              to="/rooms"
              className={mobileNavLinkClass}
            >
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink
                  onClick={closeMenu}
                  to="/add-room"
                  className={mobileNavLinkClass}
                >
                  Add Room
                </NavLink>

                <NavLink
                  onClick={closeMenu}
                  to="/my-listings"
                  className={mobileNavLinkClass}
                >
                  My Listings
                </NavLink>

                <NavLink
                  onClick={closeMenu}
                  to="/my-bookings"
                  className={mobileNavLinkClass}
                >
                  My Bookings
                </NavLink>
              </>
            )}

            <div className="mt-3 border-t border-slate-100 pt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/2KQnYp7/default-avatar.png"
                      }
                      alt={user.displayName || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {user.displayName || "StudyNook User"}
                      </p>
                      <p className="max-w-[230px] truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    onClick={closeMenu}
                    to="/login"
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    Login
                  </Link>

                  <Link
                    onClick={closeMenu}
                    to="/register"
                    className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;