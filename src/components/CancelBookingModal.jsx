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
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">
            Cancel this booking?
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-slate-600">
          You are cancelling your booking for{" "}
          <span className="font-bold">{booking.roomName}</span> on{" "}
          <span className="font-bold">{booking.date}</span> from{" "}
          <span className="font-bold">{booking.startTime}</span> to{" "}
          <span className="font-bold">{booking.endTime}</span>.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-300"
          >
            Keep Booking
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;