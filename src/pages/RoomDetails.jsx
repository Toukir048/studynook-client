import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>StudyNook – Room Details</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-600">
            Room ID: {id}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Room Details Page
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Full room information, booking count, owner edit/delete controls,
            and booking modal will be added later.
          </p>

          <button className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
            Book Now
          </button>
        </div>
      </section>
    </>
  );
};

export default RoomDetails;