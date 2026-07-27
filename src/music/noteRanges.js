import { diatonicIndex } from "./notes.js";

export const CLEF_BASE_INDEX = {
  treble: diatonicIndex("E", 4),
  bass: diatonicIndex("G", 2),
};

export const DEFAULT_GAME_SETTINGS = {
  clefs: ["treble"],
  low: { letter: "C", octave: 4 },
  high: { letter: "C", octave: 5 },
  sharps: false,
  flats: false,
  minutes: 0,
  ledger: 1,
  showNames: true,
};

export const SESSION_LENGTH_OPTIONS = [
  { label: "Practice", minutes: 0 },
  { label: "1 min", minutes: 1 },
  { label: "2 min", minutes: 2 },
  { label: "3 min", minutes: 3 },
  { label: "5 min", minutes: 5 },
];

export const LEDGER_OPTIONS = [1, 2, 3, 4];
export const OCTAVE_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function normalizeSettings(settings) {
  const merged = {
    ...DEFAULT_GAME_SETTINGS,
    ...settings,
    low: { ...DEFAULT_GAME_SETTINGS.low, ...settings?.low },
    high: { ...DEFAULT_GAME_SETTINGS.high, ...settings?.high },
  };
  const clefs = merged.clefs.filter((clef) => clef in CLEF_BASE_INDEX);

  return {
    ...merged,
    clefs: clefs.length > 0 ? clefs : DEFAULT_GAME_SETTINGS.clefs,
    minutes: Number(merged.minutes) || 0,
    ledger: Number(merged.ledger) || DEFAULT_GAME_SETTINGS.ledger,
    showNames: Boolean(merged.showNames),
    sharps: Boolean(merged.sharps),
    flats: Boolean(merged.flats),
  };
}

export function isValidRange(low, high) {
  return diatonicIndex(low.letter, low.octave) <= diatonicIndex(high.letter, high.octave);
}
