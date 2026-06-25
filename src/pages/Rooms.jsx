import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Rooms = () => {
  return (
    <>
      <Helmet>
        <title>StudyNook – Available Rooms</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">
            Available Study Rooms
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Search and book quiet rooms for focused study sessions.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Rooms will load here
          </h2>
          <p className="mt-2 text-slate-500">
            We will connect MongoDB data in a later commit.
          </p>

          <Link
            to="/rooms/demo-room"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
          >
            View Demo Details
          </Link>
        </div>
      </section>
    </>
  );
};

export default Rooms;