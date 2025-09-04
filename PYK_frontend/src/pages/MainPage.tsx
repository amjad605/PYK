function MainPage() {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div className="bg-blue-950 flex flex-col h-screen w-screen p-10 shadow-lg items-center justify-center text-center">
        <h2 className="text-green-600 text-3xl font-bold mb-4">
          Marketing Solutions
        </h2>
        <p className="text-white text-lg mb-6 max-w-md">
          Discover our comprehensive marketing services designed to grow your
          business and reach your target audience effectively.
        </p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-4 py-2"
          onClick={() => (window.location.href = "/marketing")}
        >
          Explore Marketing
        </button>
      </div>
      <div className="bg-lime-400 flex flex-col h-screen w-screen p-10 items-center justify-center shadow-lg text-center">
        <h2 className="text-blue-600 text-3xl font-bold mb-4">
          Real Estate Services
        </h2>
        <p className="text-blue-900 text-lg mb-6 max-w-md">
          Professional real estate brokerage services to help you buy, sell, or
          invest in properties with confidence.
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-4 py-2"
          onClick={() => (window.location.href = "/real-estate")}
        >
          View Properties
        </button>
      </div>
    </div>
  );
}

export default MainPage;
