const CLEF_LABELS = {
  treble: { name: "Treble", kind: "G clef" },
  bass: { name: "Bass", kind: "F clef" },
};

export function getClefLabel(clef) {
  return CLEF_LABELS[clef] ?? CLEF_LABELS.treble;
}
