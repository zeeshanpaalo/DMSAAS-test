"use client";
import { ZeroDevProvider, createConfig as createZdConfig } from "@zerodev/waas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_ZERODEV_APP_ID) {
  throw new Error("Need zerodev app id");
}

export default function Providers({ children }: { children: ReactNode }) {
  const zdAppId = process.env.NEXT_PUBLIC_ZERODEV_APP_ID || "";
  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(`https://rpc.zerodev.app/api/v2/bundler/${zdAppId}`),
    },
  });
  const queryClient = new QueryClient();

  const zeroDevConfig = createZdConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(`https://rpc.zerodev.app/api/v2/bundler/${zdAppId}`),
    },
    projectIds: {
      [sepolia.id]: zdAppId,
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ZeroDevProvider config={zeroDevConfig}>{children}</ZeroDevProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
