import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>StudyNook – Home</title>
      </Helmet>

      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Library Study Room Booking
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Find Your Perfect Study Room
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Browse and book quiet, private study rooms in your library. List
            your own room and manage bookings from one simple dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/rooms"
              className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Rooms
            </Link>

            <Link
              to="/add-room"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-slate-400"
            >
              Add Your Room
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-4 shadow-xl shadow-slate-200">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
            alt="Library study space"
            className="h-[420px] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Home;