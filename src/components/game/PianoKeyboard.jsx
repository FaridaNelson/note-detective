function PianoKey({ feedback, label, onPress, pitchClass, disabled, variant, position }) {
  const style = position ? { left: `calc(${((position / 7) * 100).toFixed(3)}% - 4.25%)` } : undefined;
  const className = [
    "piano-key",
    `piano-key--${variant}`,
    feedback ? `piano-key--${feedback}` : "",
  ].filter(Boolean).join(" ");

  return (
    <button
      className={className}
      type="button"
      style={style}
      disabled={disabled}
      onClick={() => onPress(pitchClass)}
      aria-label={`Answer ${label || "black key"}`}
    >
      {label}
    </button>
  );
}

export default function PianoKeyboard({ keys, disabled, onKeyPress }) {
  return (
    <div className="piano-keyboard" aria-label="Answer using the piano keyboard">
      <div className="piano-keyboard__whites">
        {keys.whites.map((key) => (
          <PianoKey
            key={key.label}
            {...key}
            disabled={disabled}
            onPress={onKeyPress}
            variant="white"
          />
        ))}
      </div>
      <div className="piano-keyboard__blacks">
        {keys.blacks.map((key) => (
          <PianoKey
            key={key.pitchClass}
            {...key}
            disabled={disabled}
            onPress={onKeyPress}
            variant="black"
          />
        ))}
      </div>
    </div>
  );
}
