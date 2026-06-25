import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CalendarCheck,
  DollarSign,
  Layers,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import BookingModal from "../components/BookingModal";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import SectionHeader from "../components/SectionHeader";
import useAuth from "../hooks/useAuth";
import { demoRooms } from "../utils/demoRooms";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const room = demoRooms.find((item) => item._id === id);

  if (!room) {
    return (
      <>
        <Helmet>
          <title>StudyNook – Room Not Found</title>
        </Helmet>

        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <EmptyState
            title="Room not found"
            description="The room you are looking for does not exist in the demo data."
            buttonText="Back to Rooms"
            buttonTo="/rooms"
          />
        </section>
      </>
    );
  }

  const isOwner = user?.email && room.ownerEmail === user.email;

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: {
            pathname: `/rooms/${room._id}`,
          },
        },
      });
      return;
    }

    setIsBookingOpen(true);
  };

  const handleDeleteDemo = () => {
    toast.error("Delete will be connected with backend later.");
  };

  const handleEditDemo = () => {
    toast("Edit modal/page will be added later.");
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – {room.roomName}</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8">
          <Link
            to="/rooms"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            ← Back to rooms
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm">
            <img
              src={room.image}
              alt={room.roomName}
              className="h-[460px] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <SectionHeader
              eyebrow="Room Details"
              title={room.roomName}
              description={room.description}
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <Layers className="mb-3 text-emerald-600" size={22} />
                <p className="text-sm text-slate-500">Floor</p>
                <p className="font-bold text-slate-950">{room.floor}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <Users className="mb-3 text-emerald-600" size={22} />
                <p className="text-sm text-slate-500">Capacity</p>
                <p className="font-bold text-slate-950">
                  {room.capacity} people
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <DollarSign className="mb-3 text-emerald-600" size={22} />
                <p className="text-sm text-slate-500">Hourly Rate</p>
                <p className="font-bold text-slate-950">
                  ${room.hourlyRate}/hr
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <CalendarCheck className="mb-3 text-emerald-600" size={22} />
                <p className="text-sm text-slate-500">Booking Count</p>
                <p className="font-bold text-slate-950">
                  {room.bookingCount} bookings
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                Amenities
              </h3>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={handleBookNow} className="w-full sm:w-auto">
                {user ? "Book Now" : "Login to Book"}
              </PrimaryButton>

              {isOwner && (
                <>
                  <PrimaryButton
                    type="button"
                    variant="light"
                    onClick={handleEditDemo}
                    className="w-full sm:w-auto"
                  >
                    <Pencil size={16} />
                    Edit
                  </PrimaryButton>

                  <button
                    onClick={handleDeleteDemo}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
          <h2 className="text-2xl font-bold">Booking rules</h2>
          <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
            <p className="rounded-2xl bg-white/10 p-4">
              Bookings must be made for today or a future date.
            </p>
            <p className="rounded-2xl bg-white/10 p-4">
              Minimum booking duration is one hour.
            </p>
            <p className="rounded-2xl bg-white/10 p-4">
              Backend will prevent overlapping confirmed bookings.
            </p>
          </div>
        </div>
      </section>

      {isBookingOpen && (
        <BookingModal room={room} onClose={() => setIsBookingOpen(false)} />
      )}
    </>
  );
};

export default RoomDetails;