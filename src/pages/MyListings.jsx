import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { DollarSign, Layers, Pencil, Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import EditRoomModal from "../components/EditRoomModal";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import SectionHeader from "../components/SectionHeader";
import useAuth from "../hooks/useAuth";
import { demoRooms } from "../utils/demoRooms";

const MyListings = () => {
    const { user } = useAuth();

    const initialListings = useMemo(() => {
        if (!user) return [];

        return demoRooms.slice(0, 4).map((room) => ({
            ...room,
            ownerEmail: user.email,
            ownerName: user.displayName || "StudyNook User",
        }));
    }, [user]);

    const [myRooms, setMyRooms] = useState(initialListings);
    const [editingRoom, setEditingRoom] = useState(null);
    const [deletingRoom, setDeletingRoom] = useState(null);

    useEffect(() => {
        setMyRooms(initialListings);
    }, [initialListings]);

    const handleUpdateRoom = (updatedRoom) => {
        setMyRooms((previousRooms) =>
            previousRooms.map((room) =>
                room._id === updatedRoom._id ? updatedRoom : room
            )
        );
    };

    const handleDeleteRoom = () => {
        setMyRooms((previousRooms) =>
            previousRooms.filter((room) => room._id !== deletingRoom._id)
        );

        toast.success("Room deleted successfully");
        setDeletingRoom(null);
    };

    return (
        <>
            <Helmet>
                <title>StudyNook – My Listings</title>
            </Helmet>

            <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <SectionHeader
                        eyebrow="Owner Dashboard"
                        title="My Listings"
                        description="Manage the study rooms you have listed. Edit room details or remove listings when needed."
                    />

                    <PrimaryButton to="/add-room">Add New Room</PrimaryButton>
                </div>

                {myRooms.length > 0 ? (
                    <div className="grid gap-6">
                        {myRooms.map((room) => (
                            <article
                                key={room._id}
                                className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[280px_1fr]"
                            >
                                <img
                                    src={room.image}
                                    alt={room.roomName}
                                    className="h-64 w-full rounded-[1.5rem] object-cover lg:h-full"
                                />

                                <div className="flex flex-col p-2">
                                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-950">
                                                {room.roomName}
                                            </h2>

                                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                                                {room.description}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center">
                                            <p className="text-xs font-semibold uppercase text-emerald-700">
                                                Bookings
                                            </p>
                                            <p className="text-2xl font-bold text-emerald-800">
                                                {room.bookingCount}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                                        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
                                            <Layers size={17} className="text-emerald-600" />
                                            <span>{room.floor}</span>
                                        </div>

                                        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
                                            <Users size={17} className="text-emerald-600" />
                                            <span>{room.capacity} people</span>
                                        </div>

                                        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
                                            <DollarSign size={17} className="text-emerald-600" />
                                            <span>${room.hourlyRate}/hr</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {room.amenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                                        <PrimaryButton
                                            type="button"
                                            variant="light"
                                            onClick={() => setEditingRoom(room)}
                                            className="w-full sm:w-auto"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </PrimaryButton>

                                        <button
                                            onClick={() => setDeletingRoom(room)}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="You have no listings yet"
                        description="Start by adding your first study room listing."
                        buttonText="Add Room"
                        buttonTo="/add-room"
                    />
                )}
            </section>

            {editingRoom && (
                <EditRoomModal
                    room={editingRoom}
                    onClose={() => setEditingRoom(null)}
                    onUpdate={handleUpdateRoom}
                />
            )}

            {deletingRoom && (
                <DeleteConfirmModal
                    roomName={deletingRoom.roomName}
                    onClose={() => setDeletingRoom(null)}
                    onConfirm={handleDeleteRoom}
                />
            )}
        </>
    );
};

export default MyListings;