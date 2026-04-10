import { UserCircleIcon } from "@heroicons/react/24/solid";
import NavBar from "../components/layout/NavBar";

const MOCK_LEADERBOARD = [
    { rank: 1, username: "@masterscrumm", points: 102, avatar_url: null },
    { rank: 2, username: "@thegoatlebron2", points: 95, avatar_url: null },
    { rank: 3, username: "@mjohndiere38", points: 89, avatar_url: null },
    { rank: 4, username: "@ivanperezz", points: 87, avatar_url: null },
    { rank: 5, username: "@marceljuge9", points: 83, avatar_url: null },
    { rank: 6, username: "@notmee01", points: 77, avatar_url: null },
    { rank: 7, username: "@no1warriorsfan", points: 75, avatar_url: null },
];

const MOCK_MY_RANK = 126;
const MOCK_MY_POINTS = 25;
const MOCK_TOP_10_GAP = 77;

function Ranking() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
                <h1 className="font-anton text-4xl text-text">Top Fans</h1>
                <p className="font-lato text-text-light text-sm mt-1 mb-6">of the month</p>
                <div className="w-full max-w-md flex flex-col gap-3">
                    {MOCK_LEADERBOARD.map((entry) => (
                        <LeaderboardRow
                        key={entry.rank}
                        rank={entry.rank}
                        username={entry.username}
                        points={entry.points}
                        avatar_url={entry.avatar_url}
                        isCurrentUser={false}
                        />
                    ))}
                </div>
                <div className="w-full max-w-md flex items-center gap-3 my-5">
                    <div className="flex-1 border-t-2 border-text-light" />
                    <span className="font-lato text-xs text-text-light tracking-widest uppercase">Your Rank</span>
                    <div className="flex-1 border-t-2 border-text-light" />
                </div>
                <div className="w-full max-w-md">
                    <LeaderboardRow
                    rank={MOCK_MY_RANK}
                    username="you"
                    points={MOCK_MY_POINTS}
                    avatar_url={null}
                    isCurrentUser={true}
                    />
                </div>
                <div className="w-full max-w-md grid grid-cols-3 gap-3 mt-6">
                    <StatChip label="Your Rank" value={MOCK_MY_RANK} />
                    <StatChip label="Your Points" value={MOCK_MY_POINTS} />
                    <StatChip label="To Top 10" value={MOCK_TOP_10_GAP} />
                </div>
            </div>
        </>
    );
}

export default Ranking;

interface LeaderboardRowProps {
    rank: number;
    username: string;
    points: number;
    avatar_url: string | null;
    isCurrentUser: boolean;
}

function LeaderboardRow({ rank, username, points, avatar_url, isCurrentUser }: LeaderboardRowProps) {
    return (
        <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
            isCurrentUser ? "bg-secondary text-white" : "bg-white border-2 border-gray-100"
        }`}>
            <div className="w-8 h-8 rounded-lg bg-[#C9A961] flex items-center justify-center shrink-0">
                <span className="font-anton text-sm text-text">{rank}</span>
            </div>
            {avatar_url ? (
                <img src={avatar_url} alt={username} className="w-9 h-9 rounded-full object-cover shrink-0" />
            ) : (
                <UserCircleIcon className={`w-9 h-9 shrink-0 ${isCurrentUser ? "text-white" : "text-text-light"}`} />
            )}
            <span className={`font-lato text-sm flex-1 ${isCurrentUser ? "text-white" : "text-text"}`}>
                {username}
            </span>
            <div className="bg-[#C9A961] rounded-lg px-3 py-1 shrink-0">
                <span className="font-anton text-sm text-text">{points}</span>
            </div>
        </div>
    );
}

interface StatChipProps {
    label: string;
    value: number;
}

function StatChip({ label, value }: StatChipProps) {
    return (
        <div className="flex flex-col items-center bg-white border-2 border-gray-100 rounded-2xl py-3 px-2">
            <span className="font-anton text-xl text-text">{value}</span>
            <span className="font-lato text-xs text-text-light text-center leading-tight mt-1">{label}</span>
        </div>
    );
}