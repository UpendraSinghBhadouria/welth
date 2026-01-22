import { useState } from "react";
import { toast } from "sonner";

type ServerAction<TData, TArgs extends readonly unknown[]> = (
  ...args: TArgs
) => Promise<TData>;

const useServerAction = <TData, TArgs extends readonly unknown[] = []>(
  action: ServerAction<TData, TArgs>
) => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: TArgs): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await action(...args);
      setData(result);
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err : new Error("Something went wrong");
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    executeFn: execute,
    setData,
  };
};

export default useServerAction;
