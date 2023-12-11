import { Contract, networks } from "seven-up-seven-down";
import React, { useEffect, useState } from "react";

export const Game = ({ input, loading, setLoading }) => {
  const upOrDown = new Contract({
    contractId: networks.futurenet.contractId,
    networkPassphrase: networks.futurenet.networkPassphrase,
    rpcUrl: "https://rpc-futurenet.stellar.org/",
  });

  const [gambled, setGambled] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="mt-6 text-center">
      <h1 className="text-2xl font-bold">
        {loading && <div className="mt-4 text-center">Loading...</div>}

        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {gambled}
        </span>
      </h1>
    </div>
  );
};
