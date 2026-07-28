export const STAFF_LINES = [0, 2, 4, 6, 8];
export const NOTE_X = 210;

export function positionToY(position) {
  return 130 - position * 10;
}

export function ledgerPositionsFor(position) {
  const ledgers = [];

  if (position <= -2) {
    const stop = position % 2 === 0 ? position : position + 1;

    for (let ledger = -2; ledger >= stop; ledger -= 2) {
      ledgers.push(ledger);
    }
  } else if (position >= 10) {
    const stop = position % 2 === 0 ? position : position - 1;

    for (let ledger = 10; ledger <= stop; ledger += 2) {
      ledgers.push(ledger);
    }
  }

  return ledgers;
}

export function viewBoxForLedgerLimit(ledgerLimit) {
  const maxPosition = 8 + 2 * ledgerLimit;
  const minPosition = -2 * ledgerLimit;
  const top = Math.min(positionToY(maxPosition) - 16, 18);
  const bottom = Math.max(positionToY(minPosition) + 16, 166);

  return `0 ${top} 300 ${bottom - top}`;
}
