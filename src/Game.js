import { Contract, networks } from "seven-up-seven-down";
import React, { useEffect, useState } from "react";
import {
  greenColor,
  redColor,
  secondaryColor,
  textColor,
  primaryColor,
} from "./colors";

export const Game = ({ input, loading, setLoading }) => {
  // Define the Contract object with the nectwork, the rpc to communicate with the network and the contractId
  const upOrDown = new Contract({
    contractId: networks.futurenet.contractId,
    networkPassphrase: networks.futurenet.networkPassphrase,
    rpcUrl: "https://rpc-futurenet.stellar.org/",
  });

  const [gambled, setGambled] = useState(null);

  useEffect(() => {
    if (input) {
      setLoading(true);
      upOrDown
        .play({ prediction: input })
        .then((result) => {
          setGambled(result.result.join(" "));
        })
        .catch((error) => {
          console.error("Error playing game:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [input, setLoading]);

  const renderGameResult = () => {
    if (!gambled) return null;

    // Parse the vector received from the contract
    const parts = gambled.split(" ");
    const [firstWord, resultWord, , , , , , number] = parts;

    return (
      <>
        <span style={{ color: textColor }}>{firstWord}</span>{" "}
        <span style={{ color: resultWord === "lost" ? redColor : greenColor }}>
          {resultWord}
        </span>{" "}
        <span style={{ color: textColor }}>{parts.slice(2, 7).join(" ")}</span>{" "}
        <span
          style={{
            color: resultWord === "won" ? secondaryColor : primaryColor,
          }}
        >
          {number}
        </span>
      </>
    );
  };

  return (
    <div className="mt-6 text-center">
      {loading && (
        <div className="text-center">
          <div role="status">
            {/* Loader SVG*/}
            <svg
              aria-hidden="true"
              class="w-8 h-8 animate-spin fill-[#f9db4a]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-semibold">{renderGameResult()}</h1>
    </div>
  );
};
