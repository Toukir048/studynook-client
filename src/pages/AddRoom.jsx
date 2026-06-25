import { Helmet } from "react-helmet-async";

const AddRoom = () => {
  return (
    <>
      <Helmet>
        <title>StudyNook – Add Room</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 className="text-3xl font-bold text-slate-950">Add Room</h1>
        <p className="mt-3 text-slate-600">
          Room creation form will be added later.
        </p>
      </section>
    </>
  );
};

export default AddRoom;