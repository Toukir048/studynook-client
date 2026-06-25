import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import EmptyState from "../components/EmptyState";
import RoomCard from "../components/RoomCard";
import SectionHeader from "../components/SectionHeader";
import { amenitiesOptions, demoRooms } from "../utils/demoRooms";

const Rooms = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState("");

  const filteredRooms = useMemo(() => {
    return demoRooms.filter((room) => {
      const matchesSearch = room.roomName
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesAmenity = selectedAmenity
        ? room.amenities.includes(selectedAmenity)
        : true;

      return matchesSearch && matchesAmenity;
    });
  }, [searchText, selectedAmenity]);

  return (
    <>
      <Helmet>
        <title>StudyNook – Available Rooms</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <SectionHeader
          eyebrow="Browse Rooms"
          title="Available Study Rooms"
          description="Search and filter study rooms by name and amenities. Backend MongoDB search will be connected later."
        />

        <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_260px]">
          <input
            type="text"
            placeholder="Search by room name..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
          />

          <select
            value={selectedAmenity}
            onChange={(event) => setSelectedAmenity(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="">All amenities</option>
            {amenitiesOptions.map((amenity) => (
              <option key={amenity} value={amenity}>
                {amenity}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          {filteredRooms.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No rooms found"
              description="Try changing your search keyword or selected amenity filter."
              buttonText="Back to All Rooms"
              buttonTo="/rooms"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Rooms;