import { useEffect, useState } from "react";
import { getRiddles } from "../lib/fanaticApi";
type Riddle = {
  sort_order: number;
  riddle: string;
};

export function useFanaticRiddles() {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRiddles = async () => {
    try {
      setLoading(true);

      const data = await getRiddles();

      setRiddles(data.riddles ?? []);
      setCategory(data.game_category ?? null);

      setError(null);
    } catch (err) {
      console.error("Error in useFanatic hook:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch riddles"),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiddles();
  }, []);

  return {
    riddles,
    category,
    loading,
    error,
    refreshRiddles: fetchRiddles,
  };
}
