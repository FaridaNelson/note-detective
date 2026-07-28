export const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

export const DIATONIC_INDEX_BY_LETTER = {
  C: 0,
  D: 1,
  E: 2,
  F: 3,
  G: 4,
  A: 5,
  B: 6,
};

export const SEMITONE_BY_LETTER = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export const SHARPABLE_LETTERS = new Set(["C", "D", "F", "G", "A"]);
export const FLATABLE_LETTERS = new Set(["D", "E", "G", "A", "B"]);

export const WHITE_KEYS = LETTERS.map((letter) => ({
  label: letter,
  pitchClass: pitchClassOf(letter, 0),
}));

export const BLACK_KEYS = [
  { sharp: "C#", flat: "Db", pitchClass: 1, position: 1 },
  { sharp: "D#", flat: "Eb", pitchClass: 3, position: 2 },
  { sharp: "F#", flat: "Gb", pitchClass: 6, position: 4 },
  { sharp: "G#", flat: "Ab", pitchClass: 8, position: 5 },
  { sharp: "A#", flat: "Bb", pitchClass: 10, position: 6 },
];

export function diatonicIndex(letter, octave) {
  return octave * LETTERS.length + DIATONIC_INDEX_BY_LETTER[letter];
}

export function noteFromDiatonicIndex(index) {
  const octave = Math.floor(index / LETTERS.length);

  return {
    letter: LETTERS[index - octave * LETTERS.length],
    octave,
  };
}

export function pitchClassOf(letter, accidental = 0) {
  return (((SEMITONE_BY_LETTER[letter] + accidental) % 12) + 12) % 12;
}

export function frequencyOf(letter, octave, accidental = 0) {
  const midi = (octave + 1) * 12 + SEMITONE_BY_LETTER[letter] + accidental;

  return 440 * 2 ** ((midi - 69) / 12);
}

export function accidentalSymbol(accidental = 0) {
  if (accidental === 1) {
    return "#";
  }

  if (accidental === -1) {
    return "b";
  }

  return "";
}

export function labelOf(letter, accidental = 0) {
  return `${letter}${accidentalSymbol(accidental)}`;
}
