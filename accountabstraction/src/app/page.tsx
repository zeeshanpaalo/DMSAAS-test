"use client";
import React from "react";
import { useKernelClient } from "@zerodev/waas";
import Header from "../components/Header";
import GaslessTx from "@/components/GaslessTx";
import Onboarding from "@/components/Onboarding";

function HomePage() {
  const { isConnected, error } = useKernelClient();

  return (
    <div className="h-screen flex flex-col bg-gray-200 font-sans">
      <Header />
      <div className="flex flex-col items-center gap-6 justify-center flex-grow p-4">
        {!isConnected ? <Onboarding /> : <GaslessTx />}
      </div>
    </div>
  );
}

export default HomePage;
