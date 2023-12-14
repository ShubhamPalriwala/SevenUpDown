import React, { useState } from "react";
import { Game } from "./Game";
import { bgColor, primaryColor, secondaryColor, textColor } from "./colors";

const App = () => {
  // We define the below states to keep track of the user's input, game's key to make sure it isnt cached anytime and loading state
  const [input, setInput] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleButtonSelect = (choice) => {
    setInput(choice);
    setGameKey((prevKey) => prevKey + 1);
    setLoading(true);
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: "Inter, sans-serif",
      }}
      className="flex flex-col justify-between min-h-screen p-8"
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-3xl font-bold mb-6">Seven Up or Seven Down</h2>
        <div className="flex justify-center gap-4">
          <button
            style={{
              backgroundColor:
                input === "up" && !loading ? primaryColor : secondaryColor,
            }}
            className={`py-2 px-4 rounded text-black hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed`}
            onClick={() => handleButtonSelect("up")}
            disabled={loading}
          >
            Up
          </button>
          <button
            style={{
              backgroundColor:
                input === "down" && !loading ? primaryColor : secondaryColor,
            }}
            className={`py-2 px-4 rounded text-black hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed`}
            onClick={() => handleButtonSelect("down")}
            disabled={loading}
          >
            Down
          </button>
        </div>
        <Game
          key={gameKey}
          input={input}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <div className="text-center" style={{ color: primaryColor }}>
        <p>
          Built with{" "}
          <a
            style={{ color: textColor }}
            href="https://soroban.stellar.org/"
            target="_blank"
            rel="noreferrer"
          >
            Soroban
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default App;
