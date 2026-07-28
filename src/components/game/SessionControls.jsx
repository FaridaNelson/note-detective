export default function SessionControls({ onStop, onOpenResults, resultsButtonRef }) {
  const handleStop = () => {
    onStop();
    onOpenResults();
  };

  return (
    <div className="session-controls">
      <button ref={resultsButtonRef} className="stop-session-button" type="button" onClick={handleStop}>
        Stop &amp; see results
      </button>
    </div>
  );
}
