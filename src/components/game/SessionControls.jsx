export default function SessionControls({ onOpenResults, resultsButtonRef }) {
  return (
    <div className="session-controls">
      <button ref={resultsButtonRef} className="stop-session-button" type="button" onClick={onOpenResults}>
        Stop &amp; see results
      </button>
    </div>
  );
}
