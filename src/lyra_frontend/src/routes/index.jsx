import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-montserrat flex flex-col items-center justify-center">
      {/* Background Bubbles */}
      <div className="absolute top-14 left-14 w-60 h-60 bg-emerald-400 rounded-full opacity-60 animate-bubble-1"></div>
      <div className="absolute bottom-4 left-3/4 w-65 h-65 bg-indigo-400 rounded-full opacity-60 animate-bubble-5"></div>
      <div className="absolute top-2/4 right-1/3 w-20 h-20 bg-fuchsia-500 rounded-full opacity-60 animate-bubble-3"></div>
      <div className="absolute bottom-24 right-2/3 w-40 h-40 bg-rose-500 rounded-full opacity-60 animate-bubble-2"></div>
      <div className="absolute top-2/5 left-2/5 w-18 h-18 bg-violet-500 rounded-full opacity-60 animate-bubble-4"></div>

      <div className="absolute w-55 h-55 bg-blue-300 rounded-full opacity-60 animate-bubble-1"></div>
      <div className="absolute bottom-10 right-10 w-65 h-65 bg-teal-300 rounded-full opacity-60 animate-bubble-2"></div>
      <div className="absolute top-20 left-20 w-30 h-30 bg-purple-300 rounded-full opacity-60 animate-bubble-3"></div>
      <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-yellow-300 rounded-full opacity-60 animate-bubble-4"></div>
      <div className="absolute top-1/2 right-1/4 w-26 h-26 bg-pink-300 rounded-full opacity-60 animate-bubble-5"></div>

      <div className="absolute w-55 h-55 bg-indigo-400 rounded-full opacity-60 animate-bubble-6"></div>
      <div className="absolute bottom-10 right-10 w-55 h-55 bg-fuchsia-500 rounded-full opacity-60 animate-bubble-6"></div>
      <div className="absolute top-20 left-20 w-30 h-30 bg-purple-300 rounded-full opacity-60 animate-bubble-7"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-yellow-300 rounded-full opacity-60 animate-bubble-8"></div>
      <div className="absolute top-1/2 right-1/4 w-26 h-26 bg-pink-300 rounded-full opacity-60 animate-bubble-9"></div>

      <div className="absolute w-full h-full backdrop-blur-md isolate aspect-video bg-gray/20 shadow-lg ring-1 ring-black/5"></div>

      {/* Hero Section */}
      <section className="relative text-center px-4">
        <h1 className="text-5xl font-bold animate-fade-in-up mb-8">
          Welcome to Lyra
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Accountability, Reliability, Transparency.
        </p>
        <button
          href="#login-section"
          className="bg-secondary  text-gray-500  font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 focus:outline-none animate-bounce"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      {/* <section className="mt-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Go to Dashboard</h2>
          <p> </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Start Chat</h2>
          <p>lorem ipsum and some randome wordsss lorem ipsum lorem ipsum</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">My Token Balance</h2>
          <p>lorem ipsum and some randome wordsss lorem ipsum lorem</p>
        </div>
      </section> */}
    </div>
  );
}
