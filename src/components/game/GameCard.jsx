import ClefLabel from "./ClefLabel";
import FeedbackMessage from "./FeedbackMessage";
import PianoKeyboard from "./PianoKeyboard";
import ReplayControl from "./ReplayControl";
import SessionControls from "./SessionControls";
import StaffDisplay from "./StaffDisplay";
import StatsRow from "./StatsRow";

export default function GameCard({ stats, onOpenResults, resultsButtonRef }) {
  return (
    <section className="game-card" aria-label="Note Detective practice surface">
      <StatsRow stats={stats} />
      <StaffDisplay />
      <div className="game-card__meta">
        <ReplayControl />
        <ClefLabel />
      </div>
      <FeedbackMessage />
      <PianoKeyboard />
      <SessionControls onOpenResults={onOpenResults} resultsButtonRef={resultsButtonRef} />
    </section>
  );
}
