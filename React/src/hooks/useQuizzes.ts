import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getSession } from "../lib/auth";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const session = await getSession();
      console.log("session:", session);

      const profileId = session?.user?.id ?? null;
      setIsAuthenticated(!!profileId);

      const { data, error } = await supabase
        .from("quizzes")
        .select("*");

      console.log("quizzes data:", data);
      console.log("quizzes error:", error);

      if (error) throw error;

      setQuizzes(data || []);
    } catch (err: any) {
      console.error("useQuizzes error:", err);
      setError(err.message || "Could not load quizzes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return {
    quizzes,
    loading,
    error,
    refresh: fetchQuizzes,
    isAuthenticated,
  };
}