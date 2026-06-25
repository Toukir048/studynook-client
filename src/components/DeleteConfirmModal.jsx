import { AlertTriangle, X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const DeleteConfirmModal = ({ roomName, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle size={28} />
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-950">
          Delete this room?
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          You are about to delete{" "}
          <span className="font-semibold text-slate-950">{roomName}</span>. This
          action will permanently remove the room after backend integration.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onConfirm}
            className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Yes, Delete
          </button>

          <PrimaryButton
            type="button"
            variant="light"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;