import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CalendarCheck, Search, ShieldCheck } from "lucide-react";
import RoomCard from "../components/RoomCard";
import SectionHeader from "../components/SectionHeader";
import PrimaryButton from "../components/PrimaryButton";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { getLatestRooms } from "../api/roomsApi";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLatestRooms = () => {
    setLoading(true);
    setError("");

    getLatestRooms()
      .then((data) => {
        setRooms(data.rooms || []);
      })
      .catch((error) => {
        setError(error.message || "Failed to load latest rooms");
        setRooms([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadLatestRooms();
  }, []);

  return (
    <>
      <Helmet>
        <title>StudyNook | Library Study Room Booking</title>
      </Helmet>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 lg:px-6">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              Smart Library Room Booking
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Book quiet study spaces without waiting in line.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              StudyNook helps students find, book, and manage library study
              rooms with real-time room details and a simple booking experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton to="/rooms" variant="green">
                Browse Rooms <ArrowRight size={18} />
              </PrimaryButton>

              <PrimaryButton to="/add-room" variant="light">
                List a Room
              </PrimaryButton>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
              alt="Library study room"
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <SectionHeader
          title="Latest Study Rooms"
          subtitle="Explore recently added study spaces from the library community."
        />

        {loading ? (
          <LoadingSpinner message="Loading latest rooms..." />
        ) : error ? (
          <ErrorMessage
            title="Could not load latest rooms"
            message={error}
            onRetry={loadLatestRooms}
          />
        ) : rooms.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No rooms available yet"
            message="Rooms added by users will appear here."
          />
        )}

        <div className="mt-10 text-center">
          <PrimaryButton to="/rooms" variant="dark">
            View All Rooms
          </PrimaryButton>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeader
            title="How StudyNook Works"
            subtitle="A simple process for finding and booking study spaces."
          />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6">
              <Search className="mb-4 text-emerald-600" size={34} />
              <h3 className="text-xl font-bold">Find a Room</h3>
              <p className="mt-2 text-slate-600">
                Search rooms by name and filter by amenities.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <CalendarCheck className="mb-4 text-emerald-600" size={34} />
              <h3 className="text-xl font-bold">Book a Slot</h3>
              <p className="mt-2 text-slate-600">
                Choose your preferred date and time slot.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <ShieldCheck className="mb-4 text-emerald-600" size={34} />
              <h3 className="text-xl font-bold">Manage Safely</h3>
              <p className="mt-2 text-slate-600">
                View your bookings and manage your listed rooms securely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;