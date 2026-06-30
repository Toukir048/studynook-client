import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { CalendarCheck, Clock, DollarSign, XCircle } from "lucide-react";
import CancelBookingModal from "../components/CancelBookingModal";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import useAuth from "../hooks/useAuth";
import { cancelBooking, getMyBookings } from "../api/bookingsApi";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const isBookingCancelable = (booking) => {
  return booking.status === "confirmed" && booking.date >= getTodayDate();
};

const StatusBadge = ({ status }) => {
  const isConfirmed = status === "confirmed";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-bold ${
        isConfirmed
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
      }`}
    >
      {status}
    </span>
  );
};

const MyBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);

  const loadBookings = () => {
    setLoading(true);
    setError("");

    getMyBookings()
      .then((data) => {
        setBookings(data.bookings || []);
      })
      .catch((error) => {
        setError(error.message || "Failed to load your bookings");
        setBookings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancelBooking = () => {
    if (!cancelTarget?._id) return;

    cancelBooking(cancelTarget._id)
      .then((data) => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === cancelTarget._id ? data.booking : booking
          )
        );

        toast.success("Booking cancelled successfully");
        setCancelTarget(null);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to cancel booking");
      });
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | StudyNook</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-8">
          <p className="font-semibold text-emerald-600">
            Logged in as {user?.email}
          </p>

          <h1 className="text-3xl font-black text-slate-950 dark:text-white md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            View and manage your study room bookings.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading your bookings..." />
        ) : error ? (
          <ErrorMessage
            title="Could not load your bookings"
            message={error}
            onRetry={loadBookings}
          />
        ) : bookings.length > 0 ? (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex"
              >
                <img
                  src={booking.roomImage || booking.room?.image}
                  alt={booking.roomName}
                  className="h-64 w-full object-cover md:h-auto md:w-80"
                />

                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                        {booking.roomName}
                      </h2>

                      <p className="mt-1 text-slate-500 dark:text-slate-400">{booking.floor}</p>
                    </div>

                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                      <CalendarCheck
                        className="mb-2 text-emerald-600"
                        size={22}
                      />
                      <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                      <p className="font-bold dark:text-slate-100">{booking.date}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                      <Clock className="mb-2 text-emerald-600" size={22} />
                      <p className="text-sm text-slate-500 dark:text-slate-400">Time</p>
                      <p className="font-bold dark:text-slate-100">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                      <DollarSign
                        className="mb-2 text-emerald-600"
                        size={22}
                      />
                      <p className="text-sm text-slate-500 dark:text-slate-400">Total Cost</p>
                      <p className="font-bold dark:text-slate-100">${booking.totalCost}</p>
                    </div>
                  </div>

                  {booking.specialNote && (
                    <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <span className="font-bold">Note:</span>{" "}
                      {booking.specialNote}
                    </p>
                  )}

                  <div className="mt-6">
                    {isBookingCancelable(booking) ? (
                      <button
                        type="button"
                        onClick={() => setCancelTarget(booking)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 sm:w-auto"
                      >
                        <XCircle size={18} /> Cancel Booking
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:w-auto"
                      >
                        Cancel unavailable
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No bookings yet"
            message="Your confirmed study room bookings will appear here."
          />
        )}
      </section>

      <CancelBookingModal
        isOpen={!!cancelTarget}
        booking={cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancelBooking}
      />
    </>
  );
};

export default MyBookings;
