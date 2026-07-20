import DialogShell from "./DialogShell";

export default function ResultsDialog({ isOpen, onClose, returnFocusRef }) {
  return (
    <DialogShell title="Results" isOpen={isOpen} onClose={onClose} returnFocusRef={returnFocusRef}>
      <p className="dialog-note">Notes ranked by mistakes across all your sessions, until you reset.</p>
      <div className="session-banner">
        <strong>Score 0 · 0 correct</strong>
        <span>Practice preview · Saved on this device</span>
      </div>
      <div className="results-empty" role="status">
        No plays recorded yet. Play a few rounds!
      </div>
      <button className="reset-button" type="button">
        Reset history
      </button>
    </DialogShell>
  );
}
