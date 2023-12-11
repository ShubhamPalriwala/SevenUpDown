import React, { useState } from "react";
import { Game } from "./Game";

const App = () => {
  const [input, setInput] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleButtonSelect = (choice) => {
    setInput(choice);
    setGameKey((prevKey) => prevKey + 1);
    setLoading(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-6">Seven Up Seven Down Game</h2>
        <div className="mb-6 flex justify-center gap-4">
          <button
            className={`py-2 px-4 rounded font-bold ${
              input === "up" && !loading ? "bg-blue-700" : "bg-blue-600"
            } hover:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed`}
            onClick={() => handleButtonSelect("up")}
            disabled={loading}
          >
            {!loading ? "Up" : "Loading..."}
          </button>
          <button
            className={`py-2 px-4 rounded font-bold ${
              input === "down" && !loading ? "bg-blue-700" : "bg-blue-600"
            } hover:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed`}
            onClick={() => handleButtonSelect("down")}
            disabled={loading}
          >
            {!loading ? "Down" : "Loading..."}
          </button>
        </div>
        <Game
          key={gameKey}
          input={input}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default App;
