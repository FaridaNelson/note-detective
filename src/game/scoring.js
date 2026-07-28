import { getDisplayLabel, isCorrect } from "../music/targetNote.js";

export function calculateAccuracy(correctCount, incorrectCount) {
  const attempts = correctCount + incorrectCount;

  if (attempts === 0) {
    return 0;
  }

  return Math.round((correctCount / attempts) * 100);
}

export function applyAnswer(stats, targetNote, selectedPitchClass) {
  const correct = isCorrect(targetNote, selectedPitchClass);
  const key = getDisplayLabel(targetNote);
  const noteStats = {
    ...(stats.noteStats[key] ?? { wrong: 0, seen: 0 }),
  };

  noteStats.seen += 1;

  if (!correct) {
    noteStats.wrong += 1;
  }

  const streak = correct ? stats.streak + 1 : 0;

  return {
    correct,
    score: correct ? stats.score + 1 : stats.score,
    correctCount: correct ? stats.correctCount + 1 : stats.correctCount,
    incorrectCount: correct ? stats.incorrectCount : stats.incorrectCount + 1,
    streak,
    bestStreak: Math.max(stats.bestStreak, streak),
    noteStats: {
      ...stats.noteStats,
      [key]: noteStats,
    },
  };
}
