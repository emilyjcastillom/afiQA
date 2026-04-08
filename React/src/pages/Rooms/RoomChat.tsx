import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/layout/NavBar";
import type { Room } from "../../components/ui/RoomCard";

type ChatLocationState = {
  room?: Room;
};

type ChatMessage = {
  id: number;
  sender: string;
  text: string;
  time: string;
  align: "left" | "right";
};

const defaultRoom: Room = {
  id: 999,
  title: "Warriors Game Night",
  status: "live",
  members: "Cesar, Luis, Maria +2",
  subtitle: "Live chat is on",
  accent: "#1D428A",
};

const baseMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "Luis",
    text: "Hey everyone! Ready for the game?",
    time: "7:30 PM",
    align: "left",
  },
  {
    id: 2,
    sender: "You",
    text: "Let's go Warriors!",
    time: "7:31 PM",
    align: "right",
  },
  {
    id: 3,
    sender: "Maria",
    text: "This is going to be epic!",
    time: "7:32 PM",
    align: "left",
  },
  {
    id: 4,
    sender: "Cesar",
    text: "Curry is starting hot",
    time: "8:15 PM",
    align: "left",
  },
  {
    id: 5,
    sender: "Luis",
    text: "That dunk was insane",
    time: "8:38 PM",
    align: "left",
  },
];

function initialsFromTitle(title: string) {
  const words = title.split(" ").filter(Boolean);
  if (words.length === 0) return "RM";
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function scoreSeed(room: Room) {
  const base = room.id % 13;
  return {
    leftScore: 96 + base,
    rightScore: 90 + (base % 7),
    quarter: "4th",
    time: "8:42",
  };
}

function RoomChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ChatLocationState | null;
  const room = state?.room ?? defaultRoom;
  const [draft, setDraft] = useState("");

  const scoreboard = useMemo(() => scoreSeed(room), [room]);
  const roomInitials = initialsFromTitle(room.title);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fbff_0%,_#eef3fb_48%,_#dce6f3_100%)]">
      <NavBar />

      <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1440px] flex-col px-3 py-3 sm:px-5 sm:py-6 xl:px-8">
        <section className="mx-auto flex w-full max-w-md flex-1 flex-col overflow-hidden rounded-[1.85rem] bg-white/92 shadow-[0_24px_70px_rgba(30,41,59,0.14)] backdrop-blur-sm sm:max-w-2xl xl:max-w-3xl">
          <div className="bg-secondary px-4 py-3 text-white sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate("/rooms")}
                aria-label="Go back"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/18"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <p className="truncate font-lato text-sm font-bold sm:text-base">
                  {room.title}
                </p>
                <p className="truncate font-lato text-[0.72rem] text-white/70 sm:text-xs">
                  {room.members}
                </p>
              </div>

              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: room.accent }}
              >
                {roomInitials}
              </div>
            </div>
          </div>

          <div className="bg-primary px-4 py-4 text-secondary sm:px-5">
            <div className="grid grid-cols-3 items-center">
              <div className="text-center">
                <p className="font-lato text-xs font-bold uppercase tracking-[0.16em] text-secondary/65">
                  Warriors
                </p>
                <p className="font-anton text-[2rem] leading-none sm:text-[2.4rem]">
                  {scoreboard.leftScore}
                </p>
              </div>

              <div className="text-center">
                <p className="font-lato text-xs font-bold uppercase tracking-[0.16em] text-secondary/65">
                  {scoreboard.quarter}
                </p>
                <p className="mt-1 font-barlow-condensed text-[1.6rem] font-semibold leading-none sm:text-[2rem]">
                  {scoreboard.time}
                </p>
                <p className="mt-1 font-lato text-[0.72rem] font-bold uppercase tracking-[0.18em] text-secondary/70">
                  Live
                </p>
              </div>

              <div className="text-center">
                <p className="font-lato text-xs font-bold uppercase tracking-[0.16em] text-secondary/65">
                  Lakers
                </p>
                <p className="font-anton text-[2rem] leading-none sm:text-[2.4rem]">
                  {scoreboard.rightScore}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white px-4 py-4 sm:px-5">
            <div className="space-y-4">
              {baseMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.align === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="max-w-[82%]">
                    {message.align === "left" && (
                      <p className="mb-1 px-1 font-lato text-[0.7rem] text-[#9aa6b8]">
                        {message.sender}
                      </p>
                    )}
                    <div
                      className={`rounded-[1.2rem] px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${
                        message.align === "right"
                          ? "rounded-tr-md bg-secondary text-white"
                          : "rounded-tl-md border border-[#d5dfef] bg-[#fbfdff] text-[#31435f]"
                      }`}
                    >
                      <p className="font-lato text-sm leading-6 sm:text-[0.95rem]">
                        {message.text}
                      </p>
                    </div>
                    <p
                      className={`mt-1 px-1 font-lato text-[0.68rem] text-[#b0bac8] ${
                        message.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e7edf6] bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3 rounded-full bg-[#f6f8fc] px-4 py-2.5">
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a message..."
                className="w-full bg-transparent font-lato text-sm text-[#334155] placeholder:text-[#9aa6b8] focus:outline-none"
              />
              <button
                type="button"
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7e5fb] text-secondary transition-colors hover:bg-[#c6daf8]"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RoomChat;
