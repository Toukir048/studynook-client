import { Helmet } from "react-helmet-async";
import { CheckCircle, Clock, Search, ShieldCheck } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";
import RoomCard from "../components/RoomCard";
import SectionHeader from "../components/SectionHeader";
import { demoRooms } from "../utils/demoRooms";

const Home = () => {
  const latestRooms = demoRooms.slice(0, 6);

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
            <PrimaryButton to="/rooms">Explore Rooms</PrimaryButton>
            <PrimaryButton to="/add-room" variant="light">
              Add Your Room
            </PrimaryButton>
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

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Available Rooms"
            title="Latest Study Rooms"
            description="Explore recently listed rooms with clear pricing, capacity, and useful amenities."
          />

          <PrimaryButton to="/rooms" variant="light">
            View All Rooms
          </PrimaryButton>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeader
            align="center"
            eyebrow="How It Works"
            title="Book a quiet room in three simple steps"
            description="StudyNook keeps the process simple so students can spend less time searching and more time studying."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Browse Rooms",
                text: "Search available rooms based on your preferred study environment.",
              },
              {
                icon: Clock,
                title: "Choose Time Slot",
                text: "Pick a date, start time, and end time that match your schedule.",
              },
              {
                icon: CheckCircle,
                title: "Confirm Booking",
                text: "Book instantly and manage your reservations from your dashboard.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <item.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid items-center gap-8 rounded-[2rem] bg-slate-950 p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-200">
              Trusted Booking Experience
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Designed to prevent double booking
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              The final system will check room availability before confirming a
              booking, so users cannot reserve the same room for overlapping
              time slots.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Secure login system",
              "Owner-only room management",
              "Booking conflict detection",
              "Responsive recruiter-friendly UI",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
              >
                <ShieldCheck className="text-emerald-300" size={22} />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;