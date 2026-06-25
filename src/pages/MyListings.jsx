import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import EditRoomModal from "../components/EditRoomModal";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { deleteRoom, getMyListings, updateRoom } from "../api/roomsApi";

const MyListings = () => {
  const { user } = useAuth();

  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadMyRooms = () => {
    setLoading(true);

    getMyListings()
      .then((data) => {
        setMyRooms(data.rooms || []);
      })
      .catch(() => {
        setMyRooms([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMyRooms();
  }, []);

  const handleUpdateRoom = (updatedData) => {
    updateRoom(selectedRoom._id, updatedData)
      .then((data) => {
        setMyRooms((prevRooms) =>
          prevRooms.map((room) =>
            room._id === selectedRoom._id ? data.room : room
          )
        );

        toast.success("Room updated successfully");
        setSelectedRoom(null);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update room");
      });
  };

  const handleDeleteRoom = () => {
    deleteRoom(deleteTarget._id)
      .then(() => {
        setMyRooms((prevRooms) =>
          prevRooms.filter((room) => room._id !== deleteTarget._id)
        );

        toast.success("Room deleted successfully");
        setDeleteTarget(null);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete room");
      });
  };

  return (
    <>
      <Helmet>
        <title>My Listings | StudyNook</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-8">
          <p className="font-semibold text-emerald-600">
            Logged in as {user?.email}
          </p>
          <h1 className="text-3xl font-black text-slate-950 md:text-4xl">
            My Listed Rooms
          </h1>
          <p className="mt-2 text-slate-600">
            Manage the study rooms you have added to StudyNook.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : myRooms.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {myRooms.map((room) => (
              <div
                key={room._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950">
                        {room.roomName}
                      </h2>
                      <p className="mt-1 text-slate-500">{room.floor}</p>
                    </div>

                    <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                      {room.bookingCount || 0} bookings
                    </p>
                  </div>

                  <p className="mt-4 text-slate-600">{room.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities?.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
                    >
                      <Edit size={18} /> Edit
                    </button>

                    <button
                      onClick={() => setDeleteTarget(room)}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No listed rooms yet"
            message="Rooms you add will appear here."
          />
        )}
      </section>

      <EditRoomModal
        isOpen={!!selectedRoom}
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onUpdate={handleUpdateRoom}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this room?"
        message="This action cannot be undone."
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteRoom}
      />
    </>
  );
};

export default MyListings;