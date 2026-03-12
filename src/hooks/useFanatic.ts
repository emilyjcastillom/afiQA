import { useEffect, useState } from "react";
import { getRiddles, submitAnswer } from "../lib/fanaticApi";
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

export function useSubmitFanaticAnswer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const answer = async (answer: string) => {
    try {
      setLoading(true);

      const data = await submitAnswer(answer);

      setError(null);
      return data;
    } catch (err) {
      console.error("Error in useSubmitAnswer hook:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to submit answer"),
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    answer,
  };
}
