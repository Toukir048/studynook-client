import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { createBooking } from "../api/bookingsApi";

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getHour = (time) => {
  return Number(time.split(":")[0]);
};

const BookingModal = ({ isOpen, onClose, room }) => {
  const [date, setDate] = useState(getTodayDate());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [specialNote, setSpecialNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !room) return null;

  const availableEndTimes = timeSlots.filter(
    (slot) => getHour(slot) > getHour(startTime)
  );

  const duration = getHour(endTime) - getHour(startTime);
  const totalCost = duration > 0 ? duration * Number(room.hourlyRate) : 0;

  const handleStartTimeChange = (event) => {
    const selectedStartTime = event.target.value;
    setStartTime(selectedStartTime);

    const nextEndTime = timeSlots.find(
      (slot) => getHour(slot) > getHour(selectedStartTime)
    );

    setEndTime(nextEndTime || "");
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error("Please select date and time");
      return;
    }

    if (getHour(endTime) <= getHour(startTime)) {
      toast.error("End time must be after start time");
      return;
    }

    const bookingData = {
      roomId: room._id,
      date,
      startTime,
      endTime,
      specialNote,
    };

    setSubmitting(true);

    createBooking(bookingData)
      .then(() => {
        toast.success("Room booked successfully");
        setSpecialNote("");
        onClose();
      })
      .catch((error) => {
        toast.error(error.message || "Failed to book room");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Book {room.roomName}
            </h2>
            <p className="mt-1 text-slate-500">
              Select your preferred date and time slot.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleBookingSubmit} className="grid gap-5">
          <div>
            <label className="mb-2 block font-semibold">Booking Date</label>
            <input
              type="date"
              min={getTodayDate()}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold">Start Time</label>
              <select
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                required
              >
                {timeSlots.slice(0, -1).map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">End Time</label>
              <select
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                required
              >
                {availableEndTimes.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold">Special Note</label>
            <textarea
              rows="3"
              value={specialNote}
              onChange={(event) => setSpecialNote(event.target.value)}
              placeholder="Write any special request..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-700">
              Estimated Total
            </p>
            <p className="text-3xl font-black text-emerald-700">
              ${totalCost}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;