import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { chooseRandom, randomId } from "../src/services/randomService.js";

describe("randomService", () => {
  it("chooses an item with an injected deterministic RNG", () => {
    assert.equal(chooseRandom(["a", "b", "c"], () => 0), "a");
    assert.equal(chooseRandom(["a", "b", "c"], () => 0.99), "c");
  });

  it("handles empty or invalid arrays safely", () => {
    assert.equal(chooseRandom([], () => 0), undefined);
    assert.equal(chooseRandom(null, () => 0), undefined);
  });

  it("creates IDs with an injected RNG", () => {
    assert.equal(randomId(() => 0.5), "i");
  });
});
