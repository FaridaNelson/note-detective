import { getClefLabel } from "../../music/clefs";

export default function ClefLabel({ clef }) {
  const label = getClefLabel(clef);

  return (
    <p className="clef-label">
      <strong>{label.name}</strong> <span aria-hidden="true">·</span> {label.kind}
    </p>
  );
}
