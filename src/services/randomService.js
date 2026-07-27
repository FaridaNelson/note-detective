export function randomValue() {
  return Math.random();
}

export function randomId(rng = randomValue) {
  return rng().toString(36).slice(2);
}

export function chooseRandom(items, rng = randomValue) {
  if (!Array.isArray(items) || items.length === 0) {
    return undefined;
  }

  const index = Math.min(Math.floor(rng() * items.length), items.length - 1);

  return items[index];
}
