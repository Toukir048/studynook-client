import { NavLink, Link } from "react-router-dom";
import { BookOpen, Menu } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-emerald-600 font-semibold"
    : "text-slate-600 hover:text-emerald-600";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
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

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/rooms" className={navLinkClass}>
            Rooms
          </NavLink>
          <NavLink to="/add-room" className={navLinkClass}>
            Add Room
          </NavLink>
          <NavLink to="/my-listings" className={navLinkClass}>
            My Listings
          </NavLink>
          <NavLink to="/my-bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
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
        </div>

        <button className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden">
          <Menu size={22} />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;