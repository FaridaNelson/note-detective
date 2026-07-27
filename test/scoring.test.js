import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { applyAnswer, calculateAccuracy } from "../src/game/scoring.js";
import { createTargetNote } from "../src/music/targetNote.js";

function emptyStats() {
  return {
    score: 0,
    correctCount: 0,
    incorrectCount: 0,
    streak: 0,
    bestStreak: 0,
    noteStats: {},
  };
}

describe("scoring", () => {
  it("calculates rounded whole-number accuracy", () => {
    assert.equal(calculateAccuracy(0, 0), 0);
    assert.equal(calculateAccuracy(1, 0), 100);
    assert.equal(calculateAccuracy(1, 1), 50);
    assert.equal(calculateAccuracy(2, 1), 67);
  });

  it("updates score and streak after a correct answer", () => {
    const note = createTargetNote({
      id: "c4",
      clef: "treble",
      letter: "C",
      octave: 4,
      position: -2,
    });
    const result = applyAnswer(emptyStats(), note, 0);

    assert.equal(result.correct, true);
    assert.equal(result.score, 1);
    assert.equal(result.correctCount, 1);
    assert.equal(result.incorrectCount, 0);
    assert.equal(result.streak, 1);
    assert.equal(result.bestStreak, 1);
    assert.deepEqual(result.noteStats.C4, { seen: 1, wrong: 0 });
  });

  it("tracks misses and resets streak after an incorrect answer", () => {
    const note = createTargetNote({
      id: "c4",
      clef: "treble",
      letter: "C",
      octave: 4,
      position: -2,
    });
    const result = applyAnswer({ ...emptyStats(), streak: 3, bestStreak: 3 }, note, 2);

    assert.equal(result.correct, false);
    assert.equal(result.score, 0);
    assert.equal(result.correctCount, 0);
    assert.equal(result.incorrectCount, 1);
    assert.equal(result.streak, 0);
    assert.equal(result.bestStreak, 3);
    assert.deepEqual(result.noteStats.C4, { seen: 1, wrong: 1 });
  });
});
