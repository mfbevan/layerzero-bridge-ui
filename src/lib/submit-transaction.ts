import { toast } from "sonner";

export const submitTransaction = async <T>(txPromise: Promise<T>) => {
  const tx = toast.promise(txPromise, {
    loading: "Submitting transaction...",
    success: "Transaction submitted",
    error: (error) => `Failed to submit transaction: ${error.message}`,
  });

  return tx.unwrap();
};
