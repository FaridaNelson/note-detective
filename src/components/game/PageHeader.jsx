import IconButton from "./IconButton";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-header__title-group">
        <h1 id="game-title">
          Note <em>Detective</em>
        </h1>
      </div>
      <div className="page-header__actions" aria-label="Game actions">
        <IconButton icon="results" label="Open results" />
        <IconButton icon="settings" label="Open settings" />
      </div>
    </div>
  );
}
