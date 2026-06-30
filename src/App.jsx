function App() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          StudyNook Starter Project
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
          Find Your Perfect Study Room
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
          Browse and book quiet, private study rooms in your library. List your
          own room and manage bookings from one simple dashboard.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto">
            Explore Rooms
          </button>

          <button className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500 dark:hover:bg-slate-800 sm:w-auto">
            Add Your Room
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
