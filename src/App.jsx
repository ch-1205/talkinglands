import React, { useState } from "react";
import "./App.css";
import InteractiveMap from "./Components/interactiveMap";
import UsaMap from "./Components/usaMap";

function App() {
  const [activeMap, setActiveMap] = useState("interactiveMap");

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex space-x-2 mb-4">
        {["interactiveMap", "usaMap"].map((map) => (
          <button
            key={map}
            onClick={() => setActiveMap(map)}
            className={`px-4 py-2 rounded-md ${
              activeMap === map
                ? "bg-blue-500 text-white"
                : "bg-blue-200 text-blue-700 hover:bg-blue-300"
            }`}
          >
            {map === "usaMap" ? "USA Map" : "Interactive Map"}
          </button>
        ))}
      </div>

      <div className="w-full">
        {activeMap === "interactiveMap" ? <InteractiveMap /> : <UsaMap />}
      </div>
    </div>
  );
}

export default App;
