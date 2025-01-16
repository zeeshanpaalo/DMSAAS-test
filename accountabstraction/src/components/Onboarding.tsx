import React, { useState } from "react";
import { useCreateKernelClientPasskey, useKernelClient } from "@zerodev/waas";

function Onboarding() {
  const [username, setUsername] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const { isConnected, error } = useKernelClient();

  const { connectRegister, connectLogin, isPending } =
    useCreateKernelClientPasskey({ version: "v3" });

  const handleRegister = async () => {
    if (!username.trim()) {
      // TODO show a toast
      return;
    }
    setIsRegisterLoading(true);
    connectRegister({ username });
  };

  return (
    <>
      <div className="flex flex-col items-center p-6 w-full sm:w-80 min-h-[250px] border-2 border-gray-500 rounded-md bg-gray-300 shadow-md">
        <div className="flex flex-grow justify-center items-center">
          <button
            onClick={() => connectLogin()}
            className="px-4 py-2 bg-gray-400 text-black font-semibold rounded-md shadow-sm hover:bg-gray-500 active:bg-gray-600 transition-all disabled:bg-gray-300"
            disabled={isPending}
          >
            {isPending ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 118 8 8 8 0 01-8-8zm1.6-1.2a6 6 0 1011.6 0 6 6 0 00-11.6 0z"
                />
              </svg>
            ) : (
              "Login with Passkeys"
            )}
          </button>
        </div>
      </div>

      <div className="text-gray-700 font-semibold">OR</div>
      <div className="flex flex-col items-center justify-center p-6 w-full sm:w-80 min-h-[250px] border-2 border-gray-500 rounded-md bg-gray-300 shadow-md">
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="px-4 py-2 w-full border border-gray-500 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="flex justify-center gap-4 w-full">
            <button
              onClick={() => handleRegister()}
              className="px-4 py-2 bg-gray-400 text-black font-semibold rounded-md shadow-sm hover:bg-gray-500 active:bg-gray-600 transition-all disabled:bg-gray-300 w-full"
              disabled={isPending}
            >
              {isRegisterLoading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 118 8 8 8 0 01-8-8zm1.6-1.2a6 6 0 1011.6 0 6 6 0 00-11.6 0z"
                    />
                  </svg>
                  Registering...
                </div>
              ) : (
                "Register with Passkeys"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Onboarding;
