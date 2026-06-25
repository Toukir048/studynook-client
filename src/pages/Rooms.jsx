import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import RoomCard from "../components/RoomCard";
import SectionHeader from "../components/SectionHeader";
import ErrorMessage from "../components/ErrorMessage";
import { getAllRooms } from "../api/roomsApi";
import { amenitiesOptions } from "../utils/demoRooms";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRooms = useCallback(() => {
    const params = {};

    if (searchText.trim()) {
      params.search = searchText.trim();
    }

    if (selectedAmenity) {
      params.amenities = selectedAmenity;
    }

    setLoading(true);
    setError("");

    getAllRooms(params)
      .then((data) => {
        setRooms(data.rooms || []);
      })
      .catch((error) => {
        setError(error.message || "Failed to load rooms");
        setRooms([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchText, selectedAmenity]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  return (
    <>
      <Helmet>
        <title>All Rooms | StudyNook</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <SectionHeader
          title="All Study Rooms"
          subtitle="Search and filter available library study spaces."
        />

        <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
          <input
            type="text"
            placeholder="Search by room name..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            value={selectedAmenity}
            onChange={(event) => setSelectedAmenity(event.target.value)}
          >
            <option value="">All Amenities</option>

            {amenitiesOptions.map((amenity) => (
              <option key={amenity} value={amenity}>
                {amenity}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading rooms..." />
        ) : error ? (
          <ErrorMessage
            title="Could not load rooms"
            message={error}
            onRetry={loadRooms}
          />
        ) : rooms.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No rooms found"
            message="Try changing your search text or selected amenity."
          />
        )}
      </section>
    </>
  );
};

export default Rooms;