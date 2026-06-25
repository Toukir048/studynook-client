import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { amenitiesOptions } from "../utils/demoRooms";

const EditRoomModal = ({ isOpen, room, onClose, onUpdate }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (room?.amenities) {
      setSelectedAmenities(room.amenities);
    }
  }, [room]);

  if (!isOpen || !room) return null;

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((item) => item !== amenity)
        : [...prevAmenities, amenity]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const form = event.target;

    const updatedRoom = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),
      amenities: selectedAmenities,
    };

    onUpdate(updatedRoom);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-950">Edit Room</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <input
            name="roomName"
            defaultValue={room.roomName}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            required
          />

          <input
            name="image"
            defaultValue={room.image}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            required
          />

          <textarea
            name="description"
            defaultValue={room.description}
            rows="4"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            required
          />

          <div className="grid gap-4 md:grid-cols-3">
            <input
              name="floor"
              defaultValue={room.floor}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />

            <input
              name="capacity"
              type="number"
              min="1"
              defaultValue={room.capacity}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />

            <input
              name="hourlyRate"
              type="number"
              min="1"
              defaultValue={room.hourlyRate}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <h3 className="mb-3 font-bold">Amenities</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 p-3"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white">
            Update Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;