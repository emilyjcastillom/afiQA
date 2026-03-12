import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface GameRow {
  game_category: string;
  sort_order: number;
  riddle: string;
}

export async function getRiddles(_req: Request) {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data } = await supabase.rpc("fanatic_get_current_game");

  return new Response(
    JSON.stringify({
      game_category: data?.[0]?.game_category,
      riddles: data?.map((row: GameRow) => ({
        sort_order: row.sort_order,
        riddle: row.riddle,
      })),
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
