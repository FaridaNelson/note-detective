import ClefLabel from "./ClefLabel";
import FeedbackMessage from "./FeedbackMessage";
import PianoKeyboard from "./PianoKeyboard";
import ReplayControl from "./ReplayControl";
import SessionControls from "./SessionControls";
import StaffDisplay from "./StaffDisplay";
import StatsRow from "./StatsRow";

export default function GameCard({ game, onOpenResults, resultsButtonRef }) {
  return (
    <section className="game-card" aria-label="Note Detective practice surface">
      <StatsRow stats={game.stats} />
      <StaffDisplay targetNote={game.targetNote} ledgerLimit={game.settings.ledger} />
      <div className="game-card__meta">
        <ReplayControl targetNote={game.targetNote} />
        <ClefLabel clef={game.targetNote?.clef} />
      </div>
      <FeedbackMessage feedback={game.feedback} />
      <PianoKeyboard keys={game.pianoKeys} disabled={game.isInputLocked} onKeyPress={game.submitAnswer} />
      <SessionControls onStop={game.stopSession} onOpenResults={onOpenResults} resultsButtonRef={resultsButtonRef} />
    </section>
  );
}
