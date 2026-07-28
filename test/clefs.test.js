import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getClefLabel } from "../src/music/clefs.js";

describe("getClefLabel", () => {
  it("formats treble and bass clef labels", () => {
    assert.deepEqual(getClefLabel("treble"), { name: "Treble", kind: "G clef" });
    assert.deepEqual(getClefLabel("bass"), { name: "Bass", kind: "F clef" });
  });

  it("falls back to treble for missing clefs", () => {
    assert.deepEqual(getClefLabel(undefined), { name: "Treble", kind: "G clef" });
  });
});
