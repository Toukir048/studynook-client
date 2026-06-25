import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

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

const getHour = (time) => Number(time.split(":")[0]);

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const BookingModal = ({ room, onClose }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    return timeSlots.filter((slot) => getHour(slot) > getHour(startTime));
  }, [startTime]);

  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const duration = getHour(endTime) - getHour(startTime);
    return duration * room.hourlyRate;
  }, [startTime, endTime, room.hourlyRate]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    setEndTime("");
  };

  const handleConfirmBooking = (event) => {
    event.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error("Please select date, start time, and end time");
      return;
    }

    const bookingData = {
      roomId: room._id,
      roomName: room.roomName,
      date,
      startTime,
      endTime,
      totalCost,
      specialNote,
      status: "confirmed",
    };

    console.log(bookingData);

    toast.success("Booking form is ready. Backend will be connected later.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl md:p-8">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              Confirm Study Room Booking
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              {room.roomName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              ${room.hourlyRate}/hr · {room.capacity} people · {room.floor}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleConfirmBooking} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Booking Date
            </label>
            <input
              type="date"
              min={getTodayDate()}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={handleStartTimeChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              >
                <option value="">Select start time</option>
                {timeSlots.slice(0, -1).map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                required
                disabled={!startTime}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">Select end time</option>
                {endTimeOptions.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-700">
              Total Cost
            </p>
            <h3 className="mt-1 text-3xl font-bold text-emerald-800">
              ${totalCost}
            </h3>
            <p className="mt-1 text-sm text-emerald-700">
              Calculated from selected time duration and hourly rate.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Special Note
            </label>
            <textarea
              rows="4"
              value={specialNote}
              onChange={(event) => setSpecialNote(event.target.value)}
              placeholder="Optional note for the room owner..."
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton type="submit" className="w-full sm:w-auto">
              Confirm Booking
            </PrimaryButton>

            <PrimaryButton
              type="button"
              variant="light"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;