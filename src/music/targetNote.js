import { frequencyOf, labelOf, pitchClassOf } from "./notes.js";

export function createTargetNote(input) {
  const accidental = input.accidental ?? 0;
  const label = labelOf(input.letter, accidental);
  const pitchClass = pitchClassOf(input.letter, accidental);
  const frequency = frequencyOf(input.letter, input.octave, accidental);

  return {
    id: input.id,
    clef: input.clef,
    letter: input.letter,
    octave: input.octave,
    accidental,
    position: input.position,
    frequency,
    label,
    pitchClass,
  };
}

export function getLabel(note) {
  return note.label;
}

export function getDisplayLabel(note) {
  return `${getLabel(note)}${note.octave}`;
}

export function getPitchClass(note) {
  return note.pitchClass;
}

export function getFrequency(note) {
  return note.frequency;
}

export function isCorrect(note, selectedPitchClass) {
  return getPitchClass(note) === selectedPitchClass;
}
