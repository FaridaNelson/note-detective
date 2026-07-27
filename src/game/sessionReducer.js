import { getDisplayLabel } from "../music/targetNote.js";
import { applyAnswer, calculateAccuracy } from "./scoring.js";

export const FEEDBACK_DELAY_MS = 1150;

export const initialSessionState = {
  status: "idle",
  transitionToken: 0,
  targetNote: null,
  locked: true,
  feedback: {
    tone: "idle",
    message: "Listen, look, then choose the matching key.",
    selectedPitchClass: null,
  },
  score: 0,
  correctCount: 0,
  incorrectCount: 0,
  streak: 0,
  bestStreak: 0,
  noteStats: {},
  lastSummary: null,
  timeLeft: null,
};

function sessionStats(state) {
  return {
    score: state.score,
    correctCount: state.correctCount,
    incorrectCount: state.incorrectCount,
    streak: state.streak,
    bestStreak: state.bestStreak,
    noteStats: state.noteStats,
  };
}

function summaryFor(state, reason) {
  const attempts = state.correctCount + state.incorrectCount;

  return {
    score: state.score,
    correct: state.correctCount,
    incorrect: state.incorrectCount,
    attempts,
    accuracy: calculateAccuracy(state.correctCount, state.incorrectCount),
    bestStreak: state.bestStreak,
    timed: reason === "time",
  };
}

export function sessionReducer(state, action) {
  switch (action.type) {
    case "start": {
      return {
        ...initialSessionState,
        status: "active",
        targetNote: action.targetNote,
        locked: false,
        timeLeft: action.minutes > 0 ? action.minutes * 60 : null,
      };
    }

    case "answer": {
      if (state.status !== "active" || state.locked || !state.targetNote) {
        return state;
      }

      const result = applyAnswer(sessionStats(state), state.targetNote, action.pitchClass);
      const transitionToken = state.transitionToken + 1;

      return {
        ...state,
        ...result,
        transitionToken,
        locked: true,
        feedback: {
          tone: result.correct ? "correct" : "incorrect",
          message: result.correct
            ? "Correct - well spotted."
            : `Not quite - that was ${getDisplayLabel(state.targetNote)}.`,
          selectedPitchClass: action.pitchClass,
        },
      };
    }

    case "next": {
      if (state.status !== "active" || action.transitionToken !== state.transitionToken) {
        return state;
      }

      return {
        ...state,
        targetNote: action.targetNote,
        locked: false,
        feedback: {
          tone: "idle",
          message: "Listen, look, then choose the matching key.",
          selectedPitchClass: null,
        },
      };
    }

    case "stop": {
      if (state.status !== "active") {
        return state;
      }

      return {
        ...state,
        status: "stopped",
        locked: true,
        lastSummary: summaryFor(state, action.reason),
        feedback: {
          tone: "idle",
          message:
            action.reason === "time"
              ? `Time! Final score ${state.score} - ${state.correctCount} correct.`
              : `Stopped - score ${state.score}, ${state.correctCount} correct.`,
          selectedPitchClass: null,
        },
      };
    }

    case "tick": {
      if (state.status !== "active" || state.timeLeft === null) {
        return state;
      }

      const timeLeft = Math.max(0, state.timeLeft - 1);

      if (timeLeft === 0) {
        const expiredState = { ...state, timeLeft };

        return {
          ...expiredState,
          status: "stopped",
          locked: true,
          lastSummary: summaryFor(expiredState, "time"),
          feedback: {
            tone: "idle",
            message: `Time! Final score ${state.score} - ${state.correctCount} correct.`,
            selectedPitchClass: null,
          },
        };
      }

      return { ...state, timeLeft };
    }

    case "resetHistory":
      return {
        ...state,
        noteStats: {},
      };

    default:
      return state;
  }
}
