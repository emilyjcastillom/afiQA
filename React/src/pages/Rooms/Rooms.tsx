import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/layout/NavBar";
import Button from "../../components/ui/Button";
import { fetchMyRooms } from "../../services/rooms";
import RoomCard, { type Room } from "../../components/ui/RoomCard";

function RoomsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "live" | "offline">(
    "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRooms() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyRooms();
        setRooms(data);
      } catch (err) {
        console.error("Error loading rooms:", err);
        setError(
          err instanceof Error ? err.message : "Could not load rooms."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, []);

  const orderedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => {
      if (a.status === "live" && b.status !== "live") return -1;
      if (a.status !== "live" && b.status === "live") return 1;
      return a.title.localeCompare(b.title);
    });
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    if (activeFilter === "all") return orderedRooms;
    return orderedRooms.filter((room) => room.status === activeFilter);
  }, [orderedRooms, activeFilter]);

  const liveCount = rooms.filter((room) => room.status === "live").length;
  const offlineCount = rooms.filter((room) => room.status === "offline").length;

  function handleCreateRoom() {
    navigate("/rooms/create");
  }

  function handleRoomAction(room: Room) {
    if (room.status === "live") {
      navigate(`/rooms/${room.id}`, { state: { from: location.pathname } });
      return;
    }

    navigate(`/rooms/${room.id}/summary`, {
      state: { from: location.pathname },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="mx-auto w-full max-w-[1280px] px-6 pb-10 pt-8 lg:px-10">
        <div className="mb-8">
          <p className="font-lato text-[0.72rem] uppercase tracking-[0.28em] text-primary-3">
            Fan Community
          </p>
          <h1 className="font-lato text-4xl font-black tracking-tight text-secondary lg:text-5xl">
            Private Fan Rooms
          </h1>
        </div>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] bg-secondary p-4 shadow-[0_20px_45px_rgba(29,66,138,0.18)]">
            <div className="rounded-[1.55rem] border border-white/10 bg-white/10 p-4 text-white sm:p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-lato text-[0.68rem] uppercase tracking-[0.24em] text-white/70">
                    Create Room
                  </p>
                  <h2 className="mt-2 font-lato text-[2rem] font-black leading-[1.05]">
                    Start a new
                    <br />
                    watch party
                  </h2>
                </div>

                <button
                  onClick={handleCreateRoom}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f7c62f] text-[#1d2d5c] shadow-[0_10px_24px_rgba(247,198,47,0.45)] transition hover:brightness-95"
                  aria-label="Create room"
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>

              <p className="font-lato text-sm leading-6 text-white/80">
                Open a new private room for live reactions, predictions, and
                game-day chat.
              </p>

              <Button
                variant="primary"
                onClick={handleCreateRoom}
                className="mt-6 w-full rounded-2xl border-none bg-[#f7c62f] px-4 py-3 font-lato text-sm font-bold text-[#172b5b] hover:brightness-95"
              >
                Create Room
              </Button>
            </div>
          </aside>

          <div className="rounded-[2rem] bg-surface-container-lowest p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="font-lato text-2xl font-bold text-on-surface">
                  Your Rooms
                </h2>
                <p className="mt-1 font-lato text-sm text-on-surface-variant">
                  {filteredRooms.length} of {rooms.length} conversations visible
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-full px-4 py-2 font-lato text-sm font-bold transition ${
                    activeFilter === "all"
                      ? "bg-secondary text-white"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setActiveFilter("live")}
                  className={`rounded-full px-4 py-2 font-lato text-sm font-bold transition ${
                    activeFilter === "live"
                      ? "bg-[#ffe7ea] text-[#ff4d57]"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  Live ({liveCount})
                </button>

                <button
                  onClick={() => setActiveFilter("offline")}
                  className={`rounded-full px-4 py-2 font-lato text-sm font-bold transition ${
                    activeFilter === "offline"
                      ? "bg-[#e9edf5] text-[#667085]"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  Offline ({offlineCount})
                </button>
              </div>
            </div>

            {loading && (
              <div className="mt-8 rounded-2xl bg-surface-container px-4 py-6 text-center font-lato text-on-surface-variant">
                Loading rooms...
              </div>
            )}

            {error && (
              <div className="mt-8 rounded-2xl bg-[#fff1f2] px-4 py-6 text-center font-lato text-[#be123c]">
                {error}
              </div>
            )}

            {!loading && !error && filteredRooms.length === 0 && (
              <div className="mt-8 rounded-2xl bg-surface-container px-4 py-8 text-center">
                <p className="font-lato text-base font-semibold text-on-surface">
                  No rooms yet
                </p>
                <p className="mt-2 font-lato text-sm text-on-surface-variant">
                  Create your first room to start chatting with friends.
                </p>
              </div>
            )}

            {!loading && !error && filteredRooms.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onActionClick={handleRoomAction}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default RoomsPage;
