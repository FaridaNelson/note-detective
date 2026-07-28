import IconButton from "./IconButton";

export default function PageHeader({ onOpenResults, onOpenSettings, resultsButtonRef, settingsButtonRef }) {
  return (
    <div className="page-header">
      <div className="page-header__title-group">
        <h1 id="game-title">
          Note <em>Detective</em>
        </h1>
      </div>
      <div className="page-header__actions" aria-label="Game actions">
        <IconButton ref={resultsButtonRef} icon="results" label="Open results" onClick={onOpenResults} />
        <IconButton ref={settingsButtonRef} icon="settings" label="Open settings" onClick={onOpenSettings} />
      </div>
    </div>
  );
}
