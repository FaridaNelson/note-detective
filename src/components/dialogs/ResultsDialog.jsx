import { noteStatRows } from "../../game/results";
import DialogShell from "./DialogShell";

function SessionBanner({ summary }) {
  if (!summary) {
    return (
      <div className="session-banner">
        <strong>No completed session</strong>
        <span>Practice a few rounds, then stop to see a session summary.</span>
      </div>
    );
  }

  return (
    <div className="session-banner">
      <strong>Score {summary.score} · {summary.accuracy}% accuracy</strong>
      <span>
        {summary.timed ? "Timed" : "Practice"} session · {summary.correct} correct · {summary.incorrect} incorrect ·{" "}
        {summary.attempts} attempts · best streak {summary.bestStreak}
      </span>
    </div>
  );
}

export default function ResultsDialog({ isOpen, summary, noteStats, onResetHistory, onClose, returnFocusRef }) {
  const rows = noteStatRows(noteStats);
  const hasRecordedPlays = rows.length > 0;
  const hasMistakes = rows.some((row) => row.wrong > 0);
  const maxWrong = Math.max(...rows.map((row) => row.wrong), 1);

  return (
    <DialogShell title="Results" isOpen={isOpen} onClose={onClose} returnFocusRef={returnFocusRef}>
      <p className="dialog-note">Notes ranked by mistakes for the current in-memory play history.</p>
      <SessionBanner summary={summary} />
      {!hasRecordedPlays && (
        <div className="results-empty" role="status">
          No plays recorded yet. Play a few rounds!
        </div>
      )}
      {hasRecordedPlays && !hasMistakes && (
        <div className="results-empty" role="status">
          No mistakes yet - nicely done.
        </div>
      )}
      {hasMistakes && (
        <div className="result-list" aria-label="Notes ranked by mistakes">
          {rows.slice(0, 14).map((row) => (
            <div className="result-row" key={row.note}>
              <span className="result-row__note">{row.note}</span>
              <span className="result-row__bar-wrap" aria-hidden="true">
                <span className="result-row__bar" style={{ width: `${Math.round((row.wrong / maxWrong) * 100)}%` }} />
              </span>
              <span className="result-row__stats">
                {row.wrong} miss / {row.seen}
              </span>
            </div>
          ))}
        </div>
      )}
      <button className="reset-button" type="button" onClick={onResetHistory}>
        Reset history
      </button>
    </DialogShell>
  );
}
