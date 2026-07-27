import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { generateTargetNote } from "../src/music/noteGenerator.js";

describe("generateTargetNote", () => {
  it("uses injected RNG and respects clef/range settings", () => {
    const rngValues = [0, 0, 0, 0.5];
    const rng = () => rngValues.shift() ?? 0;
    const note = generateTargetNote(
      {
        clefs: ["treble"],
        low: { letter: "C", octave: 4 },
        high: { letter: "C", octave: 4 },
        sharps: false,
        flats: false,
        minutes: 0,
        ledger: 1,
        showNames: true,
      },
      rng,
    );

    assert.equal(note.clef, "treble");
    assert.equal(note.letter, "C");
    assert.equal(note.octave, 4);
    assert.equal(note.position, -2);
    assert.equal(note.pitchClass, 0);
    assert.equal(note.id, "treble-28-0-i");
  });

  it("can generate accidentals from prototype sharp and flat rules", () => {
    const rngValues = [0, 0, 0.99, 0.25];
    const rng = () => rngValues.shift() ?? 0;
    const note = generateTargetNote(
      {
        clefs: ["treble"],
        low: { letter: "D", octave: 4 },
        high: { letter: "D", octave: 4 },
        sharps: true,
        flats: true,
        minutes: 0,
        ledger: 1,
        showNames: true,
      },
      rng,
    );

    assert.equal(note.label, "Db");
    assert.equal(note.pitchClass, 1);
  });
});
