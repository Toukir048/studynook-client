import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-xl font-bold text-slate-950">StudyNook</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            A simple platform for students and library users to find, list, and
            book quiet study rooms.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-950">Useful Links</h4>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-emerald-600">
              Home
            </Link>
            <Link to="/rooms" className="hover:text-emerald-600">
              Rooms
            </Link>
            <Link to="/" className="hover:text-emerald-600">
              About
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-950">Contact</h4>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>Email: support@studynook.com</p>
            <p>Phone: +1 555 0199</p>
          </div>

          <div className="mt-5 flex gap-3">
            {["f", "X", "in", "ig"].map((item) => (
              <span
                key={item}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} StudyNook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;