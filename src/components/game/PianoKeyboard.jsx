const WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_KEYS = [
  { label: "C#", position: 1 },
  { label: "D#", position: 2 },
  { label: "F#", position: 4 },
  { label: "G#", position: 5 },
  { label: "A#", position: 6 },
];

function PianoKey({ label, variant, position }) {
  const style = position ? { left: `calc(${((position / 7) * 100).toFixed(3)}% - 4.25%)` } : undefined;

  return (
    <button className={`piano-key piano-key--${variant}`} type="button" style={style}>
      {label}
    </button>
  );
}

export default function PianoKeyboard() {
  return (
    <div className="piano-keyboard" aria-label="Piano keyboard preview">
      <div className="piano-keyboard__whites">
        {WHITE_KEYS.map((key) => (
          <PianoKey key={key} label={key} variant="white" />
        ))}
      </div>
      <div className="piano-keyboard__blacks" aria-hidden="true">
        {BLACK_KEYS.map((key) => (
          <PianoKey key={key.label} label={key.label} variant="black" position={key.position} />
        ))}
      </div>
    </div>
  );
}
