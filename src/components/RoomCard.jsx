import { DollarSign, Layers, Users } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  const visibleAmenities = amenities.slice(0, 3);
  const remainingAmenities = amenities.length - visibleAmenities.length;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-950/40">
      <div className="h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={roomName}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{roomName}</h3>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">
          {truncateText(description)}
        </p>

        <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Layers size={17} className="text-emerald-600" />
            <span>{floor}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={17} className="text-emerald-600" />
            <span>{capacity} people</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign size={17} className="text-emerald-600" />
            <span>${hourlyRate}/hr</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleAmenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              {amenity}
            </span>
          ))}

          {remainingAmenities > 0 && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              +{remainingAmenities} more
            </span>
          )}
        </div>

        <div className="mt-auto pt-6">
          <PrimaryButton to={`/rooms/${_id}`} className="w-full">
            View Details
          </PrimaryButton>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
