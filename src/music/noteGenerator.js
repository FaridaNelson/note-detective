import { chooseRandom, randomId, randomValue } from "../services/randomService.js";
import { CLEF_BASE_INDEX, normalizeSettings } from "./noteRanges.js";
import {
  FLATABLE_LETTERS,
  SHARPABLE_LETTERS,
  diatonicIndex,
  noteFromDiatonicIndex,
} from "./notes.js";
import { createTargetNote } from "./targetNote.js";

export function candidateDiatonicIndexes(settings, clef) {
  const normalized = normalizeSettings(settings);
  const base = CLEF_BASE_INDEX[clef];
  const minPosition = -2 * normalized.ledger;
  const maxPosition = 8 + 2 * normalized.ledger;
  const low = diatonicIndex(normalized.low.letter, normalized.low.octave);
  const high = diatonicIndex(normalized.high.letter, normalized.high.octave);
  const candidates = [];

  for (let index = base + minPosition; index <= base + maxPosition; index += 1) {
    if (index >= low && index <= high) {
      candidates.push(index);
    }
  }

  if (candidates.length > 0) {
    return candidates;
  }

  for (let index = base + minPosition; index <= base + maxPosition; index += 1) {
    candidates.push(index);
  }

  return candidates;
}

export function accidentalOptionsFor(letter, settings) {
  const options = [0];

  if (settings.sharps && SHARPABLE_LETTERS.has(letter)) {
    options.push(1);
  }

  if (settings.flats && FLATABLE_LETTERS.has(letter)) {
    options.push(-1);
  }

  return options;
}

export function generateTargetNote(settings, rng = randomValue) {
  const normalized = normalizeSettings(settings);
  const clef = chooseRandom(normalized.clefs, rng);
  const base = CLEF_BASE_INDEX[clef];
  const diatonic = chooseRandom(candidateDiatonicIndexes(normalized, clef), rng);
  const { letter, octave } = noteFromDiatonicIndex(diatonic);
  const accidental = chooseRandom(accidentalOptionsFor(letter, normalized), rng);

  return createTargetNote({
    id: `${clef}-${diatonic}-${accidental}-${randomId(rng)}`,
    clef,
    letter,
    octave,
    accidental,
    position: diatonic - base,
  });
}
