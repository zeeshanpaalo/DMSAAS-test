import React from "react";
import {
  useKernelClient,
  useBalance,
  useDisconnectKernelClient,
} from "@zerodev/waas";
import { formatAddress, formatBalance } from "@/utils";

function Header() {
  const { isConnected, address } = useKernelClient();
  const { disconnect } = useDisconnectKernelClient();
  const { data } = useBalance();

  return (
    <header className="w-full bg-gray-300 p-2 shadow-md flex justify-between items-center border-b-2 border-gray-500">
      <div
        className={`text-lg font-medium text-black ${
          isConnected ? "text-left ml-4" : "text-center flex-grow"
        }`}
      >
        Account abstraction POC by Zeeshan
      </div>

      {isConnected && (
        <div className="flex items-center space-x-4">
          {data && (
            <div className="text-sm text-gray-700 font-medium">
              Balance: {formatBalance(data)}
            </div>
          )}
          <span className="text-sm text-gray-700 font-medium">
            {formatAddress(address)}
          </span>
          <button
            className="px-4 py-2 bg-gray-400 text-black font-semibold rounded-md shadow-sm hover:bg-gray-500 active:bg-gray-600 transition-all"
            onClick={() => disconnect()}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
