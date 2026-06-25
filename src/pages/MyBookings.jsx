import { Helmet } from "react-helmet-async";

const MyListings = () => {
  return (
    <>
      <Helmet>
        <title>StudyNook – My Listings</title>
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 className="text-3xl font-bold text-slate-950">My Listings</h1>
        <p className="mt-3 text-slate-600">
          User-owned room listings will be shown here.
        </p>
      </section>
    </>
  );
};

export default MyListings;