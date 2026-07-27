import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createTargetNote,
  getDisplayLabel,
  getFrequency,
  getLabel,
  getPitchClass,
  isCorrect,
} from "../src/music/targetNote.js";

describe("targetNote", () => {
  it("creates the consistent target note shape", () => {
    const note = createTargetNote({
      id: "note-1",
      clef: "treble",
      letter: "C",
      octave: 4,
      accidental: 1,
      position: -2,
    });

    assert.equal(note.id, "note-1");
    assert.equal(note.clef, "treble");
    assert.equal(note.label, "C#");
    assert.equal(note.pitchClass, 1);
    assert.equal(note.position, -2);
  });

  it("provides label, display label, pitch class, and frequency helpers", () => {
    const note = createTargetNote({
      id: "a4",
      clef: "treble",
      letter: "A",
      octave: 4,
      position: 5,
    });

    assert.equal(getLabel(note), "A");
    assert.equal(getDisplayLabel(note), "A4");
    assert.equal(getPitchClass(note), 9);
    assert.equal(getFrequency(note), 440);
  });

  it("validates correct and incorrect pitch-class answers", () => {
    const note = createTargetNote({
      id: "bb3",
      clef: "bass",
      letter: "B",
      octave: 3,
      accidental: -1,
      position: 8,
    });

    assert.equal(isCorrect(note, 10), true);
    assert.equal(isCorrect(note, 11), false);
  });
});
