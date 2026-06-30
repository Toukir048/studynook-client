import { X } from "lucide-react";

const CancelBookingModal = ({ isOpen, booking, onClose, onConfirm }) => {
  if (!isOpen || !booking) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:border dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Cancel this booking?
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-slate-600 dark:text-slate-300">
          You are cancelling your booking for{" "}
          <span className="font-bold">{booking.roomName}</span> on{" "}
          <span className="font-bold">{booking.date}</span> from{" "}
          <span className="font-bold">{booking.startTime}</span> to{" "}
          <span className="font-bold">{booking.endTime}</span>.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-auto"
          >
            Keep Booking
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700 sm:w-auto"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
