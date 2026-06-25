import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import { amenitiesOptions } from "../utils/demoRooms";

const EditRoomModal = ({ room, onClose, onUpdate }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(room.amenities || []);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((previousAmenities) => {
      if (previousAmenities.includes(amenity)) {
        return previousAmenities.filter((item) => item !== amenity);
      }

      return [...previousAmenities, amenity];
    });
  };

  const handleUpdateRoom = (event) => {
    event.preventDefault();

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const form = event.target;

    const updatedRoom = {
      ...room,
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),
      amenities: selectedAmenities,
    };

    onUpdate(updatedRoom);
    toast.success("Room updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl md:p-8">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              Edit Listing
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Update Room Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              This is a frontend modal. Backend update API will be connected later.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleUpdateRoom} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Room Name
              </label>
              <input
                type="text"
                name="roomName"
                required
                defaultValue={room.roomName}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                defaultValue={room.description}
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                required
                defaultValue={room.image}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Floor
              </label>
              <input
                type="text"
                name="floor"
                required
                defaultValue={room.floor}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                defaultValue={room.capacity}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hourly Rate
              </label>
              <input
                type="number"
                name="hourlyRate"
                required
                min="1"
                defaultValue={room.hourlyRate}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Amenities
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                {amenitiesOptions.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);

                  return (
                    <label
                      key={amenity}
                      className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleAmenityChange(amenity)}
                        className="mr-2 accent-emerald-600"
                      />
                      {amenity}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton type="submit" className="w-full sm:w-auto">
              Update Room
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

export default EditRoomModal;