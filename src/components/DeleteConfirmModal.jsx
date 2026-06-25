import { X, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

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
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="text-xl font-black text-slate-950">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-slate-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;