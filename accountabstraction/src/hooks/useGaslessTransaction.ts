import { useState, useEffect } from "react";
import { useSendTransaction } from "@zerodev/waas";
import { getTxStatus } from "@/utils";

// Custom hook for gasless transactions
const useGaslessTransaction = () => {
  const [transactionHash, setTransactionHash] = useState(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [statusError, setStatusError] = useState(null);

  // Use the third-party hook for sending transactions
  const { write, isPending, data } = useSendTransaction({
    paymaster: {
      type: "SPONSOR", // By self-funded paymaster on Zerodev
      gasToken: "ETH",
    },
  });
  // Update transaction hash when data changes
  useEffect(() => {
    if (data) {
      setTransactionHash(data);
    }
  }, [data]);

  // Fetch transaction status when transactionHash changes
  useEffect(() => {
    if (!transactionHash) return;

    let isMounted = true;

    const fetchStatus = async () => {
      setIsLoadingStatus(true);
      setStatusError(null);

      try {
        const fetchedStatus = await getTxStatus(transactionHash);
        if (isMounted) setStatus(fetchedStatus);
      } catch (err: any) {
        if (isMounted) setStatusError(err.message);
      } finally {
        if (isMounted) setIsLoadingStatus(false);
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [transactionHash]);

  return {
    write,
    isPending,
    transactionHash,
    data,
    status,
    isLoadingStatus,
    statusError,
  };
};

export { useGaslessTransaction };
