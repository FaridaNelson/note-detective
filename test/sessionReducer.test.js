import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { initialSessionState, sessionReducer } from "../src/game/sessionReducer.js";
import { createTargetNote } from "../src/music/targetNote.js";

function note(id, letter, pitchClassPosition = -2) {
  return createTargetNote({
    id,
    clef: "treble",
    letter,
    octave: 4,
    position: pitchClassPosition,
  });
}

describe("sessionReducer", () => {
  it("prevents one target note from being scored more than once", () => {
    let state = sessionReducer(initialSessionState, {
      type: "start",
      targetNote: note("c4", "C"),
      minutes: 0,
    });

    state = sessionReducer(state, { type: "answer", pitchClass: 0 });
    const scoredState = sessionReducer(state, { type: "answer", pitchClass: 0 });

    assert.equal(scoredState.score, 1);
    assert.equal(scoredState.correctCount, 1);
  });

  it("includes attempts and accuracy in completed session summaries", () => {
    let state = sessionReducer(initialSessionState, {
      type: "start",
      targetNote: note("c4", "C"),
      minutes: 0,
    });

    state = sessionReducer(state, { type: "answer", pitchClass: 0 });
    state = sessionReducer(state, {
      type: "next",
      transitionToken: state.transitionToken,
      targetNote: note("d4", "D", -1),
    });
    state = sessionReducer(state, { type: "answer", pitchClass: 0 });
    state = sessionReducer(state, { type: "stop", reason: "manual" });

    assert.deepEqual(state.lastSummary, {
      score: 1,
      correct: 1,
      incorrect: 1,
      attempts: 2,
      accuracy: 50,
      bestStreak: 1,
      timed: false,
    });
  });
});
