export default function StudioPulseBrandPill() {
  return (
    <div className="brand-pill" aria-label="StudioPulse">
      <svg width="38" height="16" viewBox="0 0 38 16" aria-hidden="true">
        <line
          x1="0"
          y1="8"
          x2="5"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <polyline
          points="5,8 7.5,8 9,2 11,14 13,4 15,12 17,8 19,8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="19"
          y1="8"
          x2="38"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <span>
        STUDIO <strong>PULSE</strong>
      </span>
    </div>
  );
}
