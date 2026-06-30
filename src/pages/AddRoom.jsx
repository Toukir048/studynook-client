import { useState } from "react";
import { createRoom } from "../api/roomsApi";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { ImagePlus, Layers, Users, DollarSign, FileText } from "lucide-react";
import PrimaryButton from "../components/PrimaryButton";
import SectionHeader from "../components/SectionHeader";
import { amenitiesOptions } from "../utils/demoRooms";

const AddRoom = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((previousAmenities) => {
      if (previousAmenities.includes(amenity)) {
        return previousAmenities.filter((item) => item !== amenity);
      }

      return [...previousAmenities, amenity];
    });
  };

  const handleAddRoom = (event) => {
    event.preventDefault();

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    const form = event.target;

    const newRoom = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),
      amenities: selectedAmenities,
    };

    createRoom(newRoom)
      .then(() => {
        toast.success("Room added successfully");
        form.reset();
        setSelectedAmenities([]);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add room");
      });
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – Add Room</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              eyebrow="List Your Room"
              title="Add a Study Room"
              description="Create a clear room listing with pricing, capacity, floor details, and useful amenities for students."
            />

            <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white dark:border dark:border-slate-800">
              <h3 className="text-xl font-bold">Room listing checklist</h3>

              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
                  <p>Use a real room image URL from the internet.</p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
                  <p>Write a useful description instead of lorem ipsum text.</p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
                  <p>Select amenities that are actually available.</p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
                  <p>Capacity and hourly rate must be numeric values.</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleAddRoom}
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Room Name
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500 dark:border-slate-700 dark:focus-within:border-emerald-500">
                  <FileText size={18} className="text-slate-400" />
                  <input
                    type="text"
                    name="roomName"
                    required
                    placeholder="Example: Quiet Pod A1"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="5"
                  placeholder="Write a helpful description about the room environment, use case, and facilities."
                  className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Image URL
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500 dark:border-slate-700 dark:focus-within:border-emerald-500">
                  <ImagePlus size={18} className="text-slate-400" />
                  <input
                    type="url"
                    name="image"
                    required
                    placeholder="https://example.com/room-image.jpg"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Floor
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500 dark:border-slate-700 dark:focus-within:border-emerald-500">
                  <Layers size={18} className="text-slate-400" />
                  <input
                    type="text"
                    name="floor"
                    required
                    placeholder="3rd Floor"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Capacity
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500 dark:border-slate-700 dark:focus-within:border-emerald-500">
                  <Users size={18} className="text-slate-400" />
                  <input
                    type="number"
                    name="capacity"
                    required
                    min="1"
                    placeholder="4"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Hourly Rate
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500 dark:border-slate-700 dark:focus-within:border-emerald-500">
                  <DollarSign size={18} className="text-slate-400" />
                  <input
                    type="number"
                    name="hourlyRate"
                    required
                    min="1"
                    placeholder="5"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Amenities
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {amenitiesOptions.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity);

                    return (
                      <label
                        key={amenity}
                        className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isSelected
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-emerald-500"
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton type="submit" className="w-full sm:w-auto">
                Add Room
              </PrimaryButton>

              <PrimaryButton
                type="reset"
                variant="light"
                className="w-full sm:w-auto"
                onClick={() => setSelectedAmenities([])}
              >
                Clear Form
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
