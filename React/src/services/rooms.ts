import { supabase } from "../lib/supabaseClient";

export type RoomCardData = {
  id: number;
  title: string;
  status: "live" | "offline";
  members: string;
  subtitle: string;
  accent: string;
};

function formatMembers(usernames: string[]) {
  if (usernames.length <= 3) return usernames.join(", ");
  return `${usernames.slice(0, 3).join(", ")} +${usernames.length - 3}`;
}

function buildQueryError(scope: string, message: string) {
  return new Error(`${scope}: ${message}`);
}

export async function fetchMyRooms(): Promise<RoomCardData[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return [];

  console.log("Authenticated user:", user.id);

  const { data: myMemberships, error: membershipsError } = await supabase
    .from("room_members")
    .select("room_id")
    .eq("profile_id", user.id);

  if (membershipsError) {
    console.error("room_members error:", membershipsError);
    throw buildQueryError("room_members query failed", membershipsError.message);
  }

  const roomIds = (myMemberships ?? []).map((item) => item.room_id);

  console.log("My room ids:", roomIds);

  if (roomIds.length === 0) return [];

  const { data: rooms, error: roomsError } = await supabase
    .from("rooms")
    .select("id, title, status, accent")
    .in("id", roomIds);

  if (roomsError) {
    console.error("rooms error:", roomsError);
    throw buildQueryError("rooms query failed", roomsError.message);
  }

  const { data: allMembers, error: allMembersError } = await supabase
    .from("room_members")
    .select("room_id, profile_id")
    .in("room_id", roomIds);

  if (allMembersError) {
    console.error("allMembers error:", allMembersError);
    throw buildQueryError(
      "room_members members query failed",
      allMembersError.message
    );
  }

  const memberIds = Array.from(
    new Set((allMembers ?? []).map((item) => item.profile_id))
  );

  const { data: profiles, error: profilesError } =
    memberIds.length === 0
      ? { data: [], error: null }
      : await supabase
          .from("profiles")
          .select("id, username")
          .in("id", memberIds);

  if (profilesError) {
    console.error("profiles error:", profilesError);
    throw buildQueryError("profiles query failed", profilesError.message);
  }

  const { data: messages, error: messagesError } = await supabase
    .from("room_messages")
    .select("room_id, sender_profile_id, content, created_at")
    .in("room_id", roomIds)
    .order("created_at", { ascending: false });

  if (messagesError) {
    console.error("messages error:", messagesError);
    throw buildQueryError("room_messages query failed", messagesError.message);
  }

  const profileMap = new Map(
    (profiles ?? []).map((profile) => [profile.id, profile.username])
  );

  return (rooms ?? []).map((room) => {
    const membersForRoom = (allMembers ?? [])
      .filter((member) => member.room_id === room.id)
      .map((member) => profileMap.get(member.profile_id))
      .filter(Boolean) as string[];

    const lastMessage = (messages ?? []).find(
      (message) => message.room_id === room.id
    );

    const subtitle = lastMessage
      ? `${profileMap.get(lastMessage.sender_profile_id) ?? "User"}: ${lastMessage.content}`
      : "No messages yet";

    return {
      id: room.id,
      title: room.title,
      status: room.status,
      accent: room.accent,
      members: formatMembers(membersForRoom),
      subtitle,
    };
  });
}
