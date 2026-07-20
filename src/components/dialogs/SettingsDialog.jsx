import DialogShell from "./DialogShell";

const SESSION_LENGTHS = ["Practice", "1 min", "2 min", "3 min", "5 min"];
const LEDGER_LINES = ["1", "2", "3", "4"];

function ToggleGroup({ label, options, activeOption }) {
  return (
    <div className="settings-group">
      <p className="settings-group__label">{label}</p>
      <div className="toggle-group" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            className={option === activeOption ? "toggle-button is-active" : "toggle-button"}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckButton({ children, active = false }) {
  return (
    <button className={active ? "check-button is-active" : "check-button"} type="button">
      <span className="check-button__box" aria-hidden="true">
        {active ? "✓" : ""}
      </span>
      {children}
    </button>
  );
}

export default function SettingsDialog() {
  return (
    <DialogShell title="Settings">
      <ToggleGroup label="Session length" options={SESSION_LENGTHS} activeOption="Practice" />

      <div className="settings-group">
        <p className="settings-group__label">Clef</p>
        <p className="settings-group__hint">
          Pick one or both. With both, each note can appear in either clef.
        </p>
        <div className="check-row">
          <CheckButton active>Treble</CheckButton>
          <CheckButton>Bass</CheckButton>
        </div>
      </div>

      <div className="settings-group">
        <p className="settings-group__label">Note range</p>
        <div className="range-row">
          <label>
            <span>Lowest</span>
            <select defaultValue="C" aria-label="Lowest note letter">
              {["C", "D", "E", "F", "G", "A", "B"].map((letter) => (
                <option key={letter}>{letter}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Octave</span>
            <select defaultValue="4" aria-label="Lowest note octave">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((octave) => (
                <option key={octave}>{octave}</option>
              ))}
            </select>
          </label>
          <span className="range-row__arrow" aria-hidden="true">
            →
          </span>
          <label>
            <span>Highest</span>
            <select defaultValue="C" aria-label="Highest note letter">
              {["C", "D", "E", "F", "G", "A", "B"].map((letter) => (
                <option key={letter}>{letter}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Octave</span>
            <select defaultValue="5" aria-label="Highest note octave">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((octave) => (
                <option key={octave}>{octave}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="range-preview" aria-label="Selected keyboard range preview">
          {Array.from({ length: 18 }, (_, index) => (
            <span key={index} className={index >= 7 && index <= 13 ? "is-selected" : ""} />
          ))}
          <strong>Middle C</strong>
        </div>
      </div>

      <ToggleGroup label="Ledger lines" options={LEDGER_LINES} activeOption="1" />

      <div className="settings-group">
        <p className="settings-group__label">Accidentals</p>
        <div className="check-row">
          <CheckButton>Sharp notes</CheckButton>
          <CheckButton>Flat notes</CheckButton>
        </div>
      </div>

      <ToggleGroup label="Show key names" options={["Show", "Hide"]} activeOption="Show" />

      <button className="apply-button" type="button">
        Apply &amp; restart
      </button>
    </DialogShell>
  );
}
