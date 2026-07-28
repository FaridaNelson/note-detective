import { useState } from "react";

import { LEDGER_OPTIONS, OCTAVE_OPTIONS, SESSION_LENGTH_OPTIONS, isValidRange } from "../../music/noteRanges";
import { LETTERS } from "../../music/notes";
import DialogShell from "./DialogShell";

function ToggleGroup({ label, options, activeValue, getLabel = (option) => option, getValue = (option) => option, onSelect }) {
  return (
    <div className="settings-group">
      <p className="settings-group__label">{label}</p>
      <div className="toggle-group" role="group" aria-label={label}>
        {options.map((option) => {
          const value = getValue(option);

          return (
            <button
              key={value}
              className={value === activeValue ? "toggle-button is-active" : "toggle-button"}
              type="button"
              aria-pressed={value === activeValue}
              onClick={() => onSelect(value)}
            >
              {getLabel(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckButton({ children, active = false, onClick }) {
  return (
    <button
      className={active ? "check-button is-active" : "check-button"}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="check-button__box" aria-hidden="true">
        {active ? "✓" : ""}
      </span>
      {children}
    </button>
  );
}

function SelectField({ label, value, options, onChange, ariaLabel }) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} aria-label={ariaLabel} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SettingsForm({ settings, onApply, onClose }) {
  const [draft, setDraft] = useState(settings);
  const rangeIsValid = isValidRange(draft.low, draft.high);
  const toggleClef = (clef) => {
    setDraft((current) => {
      const hasClef = current.clefs.includes(clef);

      if (hasClef && current.clefs.length === 1) {
        return current;
      }

      return {
        ...current,
        clefs: hasClef ? current.clefs.filter((item) => item !== clef) : [...current.clefs, clef],
      };
    });
  };
  const updateRange = (side, field, value) => {
    setDraft((current) => ({
      ...current,
      [side]: {
        ...current[side],
        [field]: field === "octave" ? Number(value) : value,
      },
    }));
  };
  const handleApply = () => {
    if (!rangeIsValid) {
      return;
    }

    onApply(draft);
    onClose();
  };

  return (
    <>
      <ToggleGroup
        label="Session length"
        options={SESSION_LENGTH_OPTIONS}
        activeValue={draft.minutes}
        getLabel={(option) => option.label}
        getValue={(option) => option.minutes}
        onSelect={(minutes) => setDraft((current) => ({ ...current, minutes }))}
      />

      <div className="settings-group">
        <p className="settings-group__label">Clef</p>
        <p className="settings-group__hint">
          Pick one or both. With both, each note can appear in either clef.
        </p>
        <div className="check-row">
          <CheckButton active={draft.clefs.includes("treble")} onClick={() => toggleClef("treble")}>
            Treble
          </CheckButton>
          <CheckButton active={draft.clefs.includes("bass")} onClick={() => toggleClef("bass")}>
            Bass
          </CheckButton>
        </div>
      </div>

      <div className="settings-group">
        <p className="settings-group__label">Note range</p>
        <div className="range-row">
          <SelectField
            label="Lowest"
            value={draft.low.letter}
            options={LETTERS}
            ariaLabel="Lowest note letter"
            onChange={(value) => updateRange("low", "letter", value)}
          />
          <SelectField
            label="Octave"
            value={draft.low.octave}
            options={OCTAVE_OPTIONS}
            ariaLabel="Lowest note octave"
            onChange={(value) => updateRange("low", "octave", value)}
          />
          <span className="range-row__arrow" aria-hidden="true">
            →
          </span>
          <SelectField
            label="Highest"
            value={draft.high.letter}
            options={LETTERS}
            ariaLabel="Highest note letter"
            onChange={(value) => updateRange("high", "letter", value)}
          />
          <SelectField
            label="Octave"
            value={draft.high.octave}
            options={OCTAVE_OPTIONS}
            ariaLabel="Highest note octave"
            onChange={(value) => updateRange("high", "octave", value)}
          />
        </div>
        <div className="range-preview" aria-label="Selected keyboard range preview">
          {Array.from({ length: 18 }, (_, index) => (
            <span key={index} className={index >= 7 && index <= 13 ? "is-selected" : ""} />
          ))}
          <strong>Middle C</strong>
        </div>
        {!rangeIsValid && (
          <p className="settings-error" role="alert">
            Lowest note must be below the highest.
          </p>
        )}
      </div>

      <ToggleGroup
        label="Ledger lines"
        options={LEDGER_OPTIONS}
        activeValue={draft.ledger}
        onSelect={(ledger) => setDraft((current) => ({ ...current, ledger }))}
      />

      <div className="settings-group">
        <p className="settings-group__label">Accidentals</p>
        <div className="check-row">
          <CheckButton active={draft.sharps} onClick={() => setDraft((current) => ({ ...current, sharps: !current.sharps }))}>
            Sharp notes
          </CheckButton>
          <CheckButton active={draft.flats} onClick={() => setDraft((current) => ({ ...current, flats: !current.flats }))}>
            Flat notes
          </CheckButton>
        </div>
      </div>

      <ToggleGroup
        label="Show key names"
        options={[
          { label: "Show", value: true },
          { label: "Hide", value: false },
        ]}
        activeValue={draft.showNames}
        getLabel={(option) => option.label}
        getValue={(option) => option.value}
        onSelect={(showNames) => setDraft((current) => ({ ...current, showNames }))}
      />

      <button className="apply-button" type="button" disabled={!rangeIsValid} onClick={handleApply}>
        Apply &amp; restart
      </button>
    </>
  );
}

export default function SettingsDialog({ isOpen, settings, onApply, onClose, returnFocusRef }) {
  const draftKey = JSON.stringify(settings);

  return (
    <DialogShell title="Settings" isOpen={isOpen} onClose={onClose} returnFocusRef={returnFocusRef}>
      {isOpen && <SettingsForm key={draftKey} settings={settings} onApply={onApply} onClose={onClose} />}
    </DialogShell>
  );
}
