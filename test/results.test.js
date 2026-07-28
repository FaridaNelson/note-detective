import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { noteStatRows } from "../src/game/results.js";

describe("noteStatRows", () => {
  it("sorts by mistakes, seen count, then note label", () => {
    const rows = noteStatRows({
      G4: { wrong: 2, seen: 3 },
      C4: { wrong: 2, seen: 4 },
      D4: { wrong: 2, seen: 4 },
      E4: { wrong: 0, seen: 6 },
    });

    assert.deepEqual(rows.map((row) => row.note), ["C4", "D4", "G4", "E4"]);
  });

  it("omits notes that have not been seen", () => {
    assert.deepEqual(noteStatRows({ C4: { wrong: 0, seen: 0 } }), []);
  });
});
