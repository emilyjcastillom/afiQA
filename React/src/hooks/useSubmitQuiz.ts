import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getSession } from "../lib/auth";

export function useSubmitQuiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuiz = async ({
    quiz_id,
    answers,
  }: {
    quiz_id: string;
    answers: { question_id: string; option_id: string }[];
  }) => {
    setLoading(true);
    setError(null);

    try {
      const profileId = (await getSession())?.user?.id ?? null;

      if (!profileId) {
        throw new Error("You need to be logged in to submit this quiz.");
      }

      const { data: latestAttempt, error: latestAttemptError } = await supabase
        .from("quiz_attempts")
        .select("id, available_again_at")
        .eq("user_id", profileId)
        .eq("quiz_id", quiz_id)
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestAttemptError) throw latestAttemptError;

      if (
        latestAttempt?.available_again_at &&
        new Date(latestAttempt.available_again_at).getTime() > Date.now()
      ) {
        throw new Error("This quiz is still on cooldown.");
      }

      const { data: attempt, error: attemptError } = await supabase
        .from("quiz_attempts")
        .insert({
          user_id: profileId,
          quiz_id,
          status: "in_progress",
          started_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (attemptError) throw attemptError;

      const optionIds = answers.map((answer) => answer.option_id);

      const { data: optionsData, error: optionsError } = await supabase
        .from("quiz_options")
        .select("id, question_id, result_id")
        .in("id", optionIds);

      if (optionsError) throw optionsError;

      const optionsMap = (optionsData || []).reduce((acc: any, option: any) => {
        acc[option.id] = option;
        return acc;
      }, {});

      const answerRows = answers.map((answer) => ({
        attempt_id: attempt.id,
        question_id: answer.question_id,
        option_id: answer.option_id,
        result_id: optionsMap[answer.option_id]?.result_id,
      }));

      const { error: answersError } = await supabase
        .from("quiz_attempt_answers")
        .insert(answerRows);

      if (answersError) throw answersError;

      const counts: Record<string, number> = {};

      for (const row of answerRows) {
        if (!row.result_id) continue;
        counts[row.result_id] = (counts[row.result_id] || 0) + 1;
      }

      const sortedResults = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const winningResultId = sortedResults[0]?.[0];

      if (!winningResultId) {
        throw new Error("Could not determine a result for this quiz.");
      }

      const now = new Date();
      const availableAgainAt = new Date(now);
      availableAgainAt.setDate(availableAgainAt.getDate() + 7);

      const { error: updateAttemptError } = await supabase
        .from("quiz_attempts")
        .update({
          result_id: winningResultId,
          status: "completed",
          completed_at: now.toISOString(),
          available_again_at: availableAgainAt.toISOString(),
        })
        .eq("id", attempt.id);

      if (updateAttemptError) throw updateAttemptError;

      const { data: resultData, error: resultError } = await supabase
        .from("quiz_results")
        .select("id, title, subtitle, description, image_url")
        .eq("id", winningResultId)
        .single();

      if (resultError) throw resultError;

      return resultData;
    } catch (err: any) {
      setError(err.message || "Could not submit quiz.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitQuiz,
    loading,
    error,
  };
}