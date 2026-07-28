export function noteStatRows(noteStats) {
  return Object.entries(noteStats)
    .map(([note, value]) => ({
      note,
      wrong: value.wrong ?? 0,
      seen: value.seen ?? 0,
    }))
    .filter((row) => row.seen > 0)
    .sort((a, b) => b.wrong - a.wrong || b.seen - a.seen || a.note.localeCompare(b.note));
}
