import GameCard from "../components/game/GameCard";
import PageHeader from "../components/game/PageHeader";
import TopBar from "../components/top-bar/TopBar";

const STATIC_SESSION_STATS = [
  { label: "Score", value: "0" },
  { label: "Streak", value: "0", tone: "streak" },
  { label: "Best", value: "0" },
  { label: "Time", value: "∞" },
];

export default function GamePage() {
  return (
    <main className="game-page" aria-labelledby="game-title">
      <div className="game-page__surface">
        <TopBar />
        <PageHeader />
        <GameCard stats={STATIC_SESSION_STATS} />
      </div>
    </main>
  );
}
