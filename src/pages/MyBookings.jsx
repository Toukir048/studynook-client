import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import CancelBookingModal from "../components/CancelBookingModal";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import SectionHeader from "../components/SectionHeader";
import useAuth from "../hooks/useAuth";
import { demoRooms } from "../utils/demoRooms";

const getDateAfterDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const isBookingCancelable = (booking) => {
  return booking.status === "confirmed" && booking.date >= getTodayDate();
};

const createDemoBookings = (user) => {
  if (!user) return [];

  return [
    {
      _id: "booking-001",
      roomId: demoRooms[0]._id,
      roomName: demoRooms[0].roomName,
      roomImage: demoRooms[0].image,
      floor: demoRooms[0].floor,
      userEmail: user.email,
      date: getDateAfterDays(2),
      startTime: "09:00",
      endTime: "11:00",
      totalCost: 10,
      specialNote: "Need a quiet space for exam preparation.",
      status: "confirmed",
    },
    {
      _id: "booking-002",
      roomId: demoRooms[1]._id,
      roomName: demoRooms[1].roomName,
      roomImage: demoRooms[1].image,
      floor: demoRooms[1].floor,
      userEmail: user.email,
      date: getDateAfterDays(5),
      startTime: "14:00",
      endTime: "17:00",
      totalCost: 24,
      specialNote: "Group study session with classmates.",
      status: "confirmed",
    },
    {
      _id: "booking-003",
      roomId: demoRooms[2]._id,
      roomName: demoRooms[2].roomName,
      roomImage: demoRooms[2].image,
      floor: demoRooms[2].floor,
      userEmail: user.email,
      date: getDateAfterDays(-3),
      startTime: "10:00",
      endTime: "12:00",
      totalCost: 24,
      specialNote: "Completed research meeting.",
      status: "confirmed",
    },
    {
      _id: "booking-004",
      roomId: demoRooms[3]._id,
      roomName: demoRooms[3].roomName,
      roomImage: demoRooms[3].image,
      floor: demoRooms[3].floor,
      userEmail: user.email,
      date: getDateAfterDays(7),
      startTime: "16:00",
      endTime: "18:00",
      totalCost: 12,
      specialNote: "Cancelled demo booking.",
      status: "cancelled",
    },
  ];
};

const StatusBadge = ({ status }) => {
  const badgeClass =
    status === "confirmed"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-600";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${badgeClass}`}
    >
      {status}
    </span>
  );
};

const MyBookings = () => {
  const { user } = useAuth();

  const initialBookings = useMemo(() => createDemoBookings(user), [user]);

  const [bookings, setBookings] = useState(initialBookings);
  const [cancelingBooking, setCancelingBooking] = useState(null);

  useEffect(() => {
    setBookings(initialBookings);
  }, [initialBookings]);

  const handleCancelBooking = () => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking._id === cancelingBooking._id
          ? { ...booking, status: "cancelled" }
          : booking
      )
    );

    toast.success("Booking cancelled");
    setCancelingBooking(null);
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – My Bookings</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Booking Dashboard"
            title="My Bookings"
            description="View your study room reservations, check booking status, and cancel upcoming confirmed bookings."
          />

          <PrimaryButton to="/rooms">Book Another Room</PrimaryButton>
        </div>

        {bookings.length > 0 ? (
          <div className="grid gap-5">
            {bookings.map((booking) => {
              const canCancel = isBookingCancelable(booking);

              return (
                <article
                  key={booking._id}
                  className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[240px_1fr]"
                >
                  <img
                    src={booking.roomImage}
                    alt={booking.roomName}
                    className="h-56 w-full rounded-[1.5rem] object-cover lg:h-full"
                  />

                  <div className="flex flex-col p-2">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div>
                        <div className="mb-3">
                          <StatusBadge status={booking.status} />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-950">
                          {booking.roomName}
                        </h2>

                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <MapPin size={16} className="text-emerald-600" />
                          {booking.floor}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center">
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Total Cost
                        </p>
                        <p className="text-2xl font-bold text-slate-950">
                          ${booking.totalCost}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
                        <CalendarDays size={17} className="text-emerald-600" />
                        <span>{booking.date}</span>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
                        <Clock size={17} className="text-emerald-600" />
                        <span>
                          {booking.startTime} - {booking.endTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
                        <DollarSign size={17} className="text-emerald-600" />
                        <span>${booking.totalCost}</span>
                      </div>
                    </div>

                    {booking.specialNote && (
                      <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                        <span className="font-bold">Special Note:</span>{" "}
                        {booking.specialNote}
                      </div>
                    )}

                    <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                      <PrimaryButton
                        to={`/rooms/${booking.roomId}`}
                        variant="light"
                        className="w-full sm:w-auto"
                      >
                        View Room
                      </PrimaryButton>

                      {canCancel && (
                        <button
                          onClick={() => setCancelingBooking(booking)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                        >
                          <XCircle size={16} />
                          Cancel
                        </button>
                      )}

                      {!canCancel && (
                        <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-500 sm:w-auto">
                          Cancel unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="You have no bookings yet"
            description="Browse available study rooms and reserve your first focused study session."
            buttonText="Explore Rooms"
            buttonTo="/rooms"
          />
        )}
      </section>

      {cancelingBooking && (
        <CancelBookingModal
          booking={cancelingBooking}
          onClose={() => setCancelingBooking(null)}
          onConfirm={handleCancelBooking}
        />
      )}
    </>
  );
};

export default MyBookings;