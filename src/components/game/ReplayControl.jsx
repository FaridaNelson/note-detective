export default function ReplayControl({ targetNote }) {
  return (
    <button
      className="replay-control"
      type="button"
      aria-label={targetNote ? "Replay note unavailable" : "Replay note unavailable until a note appears"}
      title="Audio replay is not available yet"
      disabled
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
      Replay
    </button>
  );
}
