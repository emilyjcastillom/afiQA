import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import { useProfile } from "../hooks/useProfile";
import {
  FireIcon,
  StarIcon,
  UserIcon,
  TrophyIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as HandThumbUpOutline,
  StarIcon as StarOutline,
  CheckIcon as CheckOutline,
  SunIcon as SunOutline,
} from "@heroicons/react/24/outline";

export default function MyProfile() {
  const { user } = useProfile();
  const handle = user?.username ?? "cesart";
  const name = handle === "cesart" ? "Cesar Treviño" : handle;

  // State for editable about text and edit mode
  const [aboutText, setAboutText] = useState("25 year old Mexican basketball fan");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSave = () => {
    if (isEditing) {
      // Save mode: just exit editing mode (text is already saved in state)
      setIsEditing(false);
    } else {
      // Edit mode: enter editing mode
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-text">
      <NavBar />

      <main className="mx-auto max-w-lg px-4 pb-10 pt-5">

        {/* Info general */}
        <section className="rounded-2xl border border-gray-200 bg-[var(--color-text-light-soft)] mb-5 overflow-hidden">

          {/* Header azul con avatar */}
          <div className="bg-secondary flex flex-col items-center text-center px-6 pt-8 pb-6">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-secondary/60 border-6 border-white/20 mb-3">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Avatar" className="h-[88px] w-[88px] rounded-full object-cover" />
              ) : (
                <UserIcon className="h-11 w-11 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-white">{name}</h1>
            <p className="text-sm text-white/60">@{handle}</p>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-3 gap-3 p-4">
            <div className="flex flex-col items-center rounded-xl border border-[var(--color-container-border)] shadow-sm bg-[var(--color-background)] p-3">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <FireIcon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xl font-extrabold text-secondary">5</p>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Streak</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[var(--color-container-border)] shadow-sm bg-[var(--color-background)] p-3">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <StarIcon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xl font-extrabold text-secondary">25</p>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Points</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-[var(--color-container-border)] shadow-sm bg-[var(--color-background)] p-3">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <TrophyIcon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xl font-extrabold text-secondary">⚡</p>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">League</p>
            </div>
          </div>
        </section>

        {/* About me */}
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)]">About me</h2>
          <button 
            className="text-xs font-bold text-secondary"
            onClick={handleEditSave}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <section className="rounded-2xl border border-gray-200 bg-[var(--color-text-light-soft)] p-4 mb-5">
          <div className="rounded-xl bg-[var(--color-background)] border border-[var(--color-container-border)] shadow-sm px-4 py-3 text-sm text-gray-600">
            {isEditing ? (
              <input
                type="text"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-600"
                autoFocus
              />
            ) : (
              <div>{aboutText}</div>
            )}
          </div>
        </section>

        {/* Achievements */}
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)]">Achievements</h2>
          <button className="text-xs font-bold text-secondary">View All</button>
        </div>
        <section className="rounded-2xl border border-gray-200 bg-[var(--color-text-light-soft)] p-4 mb-5">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <HandThumbUpOutline className="h-6 w-6 text-secondary" /> },
              { icon: <StarOutline className="h-6 w-6 text-secondary" /> },
              { icon: <CheckOutline className="h-6 w-6 text-secondary" /> },
              { icon: <SunOutline className="h-6 w-6 text-secondary" /> },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-2xl border-4 border-secondary bg-[var(--color-background)] py-5"
              >
                {item.icon}
              </div>
            ))}
          </div>
        </section>

        {/* Points History */}
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)]">Points History</h2>
          <button className="text-xs font-bold text-secondary">See All</button>
        </div>
        <section className="rounded-2xl border border-gray-200 bg-[var(--color-text-light-soft)] p-4">
          <div className="space-y-3">
            {[
              {
                title: "Daily login",
                subtitle: "Welcome back to AFI · 2/27/2026",
                points: "+10",
                icon: <ClockIcon className="h-5 w-5 text-gray-400" />,
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-container-border)] shadow-sm p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e0e6f0]">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-secondary">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.subtitle}</p>
                </div>
                <p className="text-base font-extrabold text-primary">{item.points}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}