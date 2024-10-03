import RadioButtons from "./Component/RadioButtons";
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hello, Tailwind CSS!
        </h1>
        <p className="text-gray-600">
          This is a simple React app with Tailwind CSS integration.
        </p>
        <button className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Click Me
        </button>
      </div>
      <fr></fr>
      <RadioButtons />
    </div>
  );
}

export default App;
