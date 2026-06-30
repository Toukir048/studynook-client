import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CalendarCheck, Edit, Trash2, Users } from "lucide-react";
import BookingModal from "../components/BookingModal";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import PrimaryButton from "../components/PrimaryButton";
import ErrorMessage from "../components/ErrorMessage";
import useAuth from "../hooks/useAuth";
import { getRoomById } from "../api/roomsApi";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const loadRoomDetails = () => {
    setLoading(true);
    setError("");

    getRoomById(id)
      .then((data) => {
        setRoom(data.room);
      })
      .catch((error) => {
        setRoom(null);
        setError(error.message || "Failed to load room details");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRoomDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading room details..." />;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <ErrorMessage
          title="Could not load room details"
          message={error}
          onRetry={loadRoomDetails}
        />
      </section>
    );
  }

  if (!room) {
    return (
      <EmptyState
        title="Room not found"
        message="The room you are looking for does not exist."
      />
    );
  }

  const isOwner = user?.email === room.ownerEmail;

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    setIsBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{room.roomName} | StudyNook</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <img
              src={room.image}
              alt={room.roomName}
              className="h-[420px] w-full rounded-3xl object-cover shadow-lg"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-3 text-sm font-semibold text-emerald-600">
              {room.floor}
            </p>

            <h1 className="text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
              {room.roomName}
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-300">{room.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <Users className="mb-2 text-emerald-600" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Capacity</p>
                <p className="font-bold dark:text-slate-100">{room.capacity} People</p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <CalendarCheck className="mb-2 text-emerald-600" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Bookings</p>
                <p className="font-bold dark:text-slate-100">{room.bookingCount || 0}</p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Rate</p>
                <p className="text-2xl font-black text-slate-950 dark:text-white">
                  ${room.hourlyRate}/hr
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-bold dark:text-white">Amenities</h3>

              <div className="flex flex-wrap gap-2">
                {room.amenities?.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryButton onClick={handleBookNow} variant="green">
                {user ? "Book Now" : "Login to Book"}
              </PrimaryButton>

              {isOwner && (
                <>
                  <Link
                    to="/my-listings"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 sm:w-auto"
                  >
                    <Edit size={18} /> Manage Room
                  </Link>

                  <Link
                    to="/my-listings"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 sm:w-auto"
                  >
                    <Trash2 size={18} /> Delete Room
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        room={room}
      />
    </>
  );
};

export default RoomDetails;
