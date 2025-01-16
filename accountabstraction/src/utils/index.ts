import { recipient } from "@/constants";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export function formatBalance(data: any): string {
  if (!data) return "";
  return `${data.formatted} ${data.symbol}`;
}
// If you are checking this, this is a tweak. Zerodev for somereason does not let us use UserOperationHash. Therefore the tweak
export const getTxStatus = async (hash: `0x${string}`) => {
  try {
    // Create a viem client
    const client = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    // Fetch the transaction receipt
    const receipt = await client.getTransactionReceipt({ hash });
    console.log(receipt);
    // Get balance of sender in prev block
    const balanceBefore = await client.getBalance({
      address: recipient,
      blockNumber: receipt.blockNumber - BigInt(1),
    });
    console.log(balanceBefore);
    // balance after
    const balanceAfter = await client.getBalance({
      address: recipient,
      blockNumber: receipt.blockNumber,
    });
    if (balanceAfter > balanceBefore) {
      console.log("balanace if greater after thatn means trnascger went trough")
      return "Success";
    } else {
      console.log("balanace is same failure")
      return "Reverted";
    }
  } catch (err) {
    console.error("Error fetching transaction status:", err);
    return "Unknown Status";
  }
};

