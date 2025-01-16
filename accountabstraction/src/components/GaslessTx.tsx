import React from "react";
import { parseEther } from "viem";
import { useGaslessTransaction } from "@/hooks/useGaslessTransaction";
import { recipient } from "@/constants";
import { useKernelClient } from "@zerodev/waas";

function GaslessTx() {
  const {
    write,
    isPending,
    transactionHash,
    status,
    isLoadingStatus,
    statusError,
  } = useGaslessTransaction();

  const { address } = useKernelClient();

  const amountToSend = "0.005";

  const transferAmount = async () => {
    try {
      write([
        {
          to: recipient,
          value: parseEther(amountToSend),
          data: "0x",
        },
      ]);
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };
  console.log(status);
  console.log(isLoadingStatus);
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <p className="mt-5 text-xl text-gray-700 font-medium">
          Welcome to gasless transfers sponsored by Paymaster service - Self
          funded On ZERODev
        </p>

        <button
          onClick={() => transferAmount()}
          disabled={isPending}
          className={`mt-5 px-4 py-2 font-semibold rounded-lg shadow-md text-white ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isPending
            ? `Sending...${amountToSend}ETH`
            : "Send Gasless Transaction"}
        </button>
        {isLoadingStatus && <div>Getting status</div>}
        {status && (
          <>
            <p className="mt-4 text-lg text-gray-600">{`Status: ${status}`}</p>
            <p className="mt-4 text-lg text-gray-600">{`Hash: ${transactionHash}`}</p>
            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to open in Sepolia scan
            </a>
          </>
        )}
        <div className="mt-auto">
          <p className="mt-4 text-lg text-gray-600">{`Sometimes TX status is not returned by ZeroDev Kernel Client`}</p>
          <a
            href={`https://sepolia.etherscan.io/address/${address}#internaltx`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-800"
          >
            Click here to open Address in Sepolia scan
          </a>
        </div>
      </div>
    </div>
  );
}

export default GaslessTx;
