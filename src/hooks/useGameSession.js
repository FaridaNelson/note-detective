import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { calculateAccuracy } from "../game/scoring.js";
import { FEEDBACK_DELAY_MS, initialSessionState, sessionReducer } from "../game/sessionReducer.js";
import { BLACK_KEYS, WHITE_KEYS } from "../music/notes.js";
import { DEFAULT_GAME_SETTINGS, normalizeSettings } from "../music/noteRanges.js";
import { generateTargetNote } from "../music/noteGenerator.js";
import { getPitchClass } from "../music/targetNote.js";
import useSessionTimer from "./useSessionTimer.js";

export default function useGameSession() {
  const [settings, setSettings] = useState(DEFAULT_GAME_SETTINGS);
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);
  const transitionTimeoutRef = useRef(null);
  const latestSettingsRef = useRef(settings);

  useEffect(() => {
    latestSettingsRef.current = settings;
  }, [settings]);

  const clearTransition = useCallback(() => {
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  const startSession = useCallback((nextSettings = latestSettingsRef.current) => {
    const normalizedSettings = normalizeSettings(nextSettings);
    clearTransition();
    setSettings(normalizedSettings);
    dispatch({
      type: "start",
      targetNote: generateTargetNote(normalizedSettings),
      minutes: normalizedSettings.minutes,
    });
  }, [clearTransition]);

  useEffect(() => {
    startSession(DEFAULT_GAME_SETTINGS);

    return clearTransition;
  }, [clearTransition, startSession]);

  const submitAnswer = useCallback((pitchClass) => {
    dispatch({ type: "answer", pitchClass });
  }, []);

  useEffect(() => {
    if (state.status !== "active" || !state.locked || state.feedback.selectedPitchClass === null) {
      return undefined;
    }

    const transitionToken = state.transitionToken;
    clearTransition();
    transitionTimeoutRef.current = window.setTimeout(() => {
      dispatch({
        type: "next",
        transitionToken,
        targetNote: generateTargetNote(latestSettingsRef.current),
      });
      transitionTimeoutRef.current = null;
    }, FEEDBACK_DELAY_MS);

    return clearTransition;
  }, [
    clearTransition,
    state.feedback.selectedPitchClass,
    state.locked,
    state.status,
    state.transitionToken,
  ]);

  useSessionTimer({
    isRunning: state.status === "active",
    minutes: settings.minutes,
    onTick: () => dispatch({ type: "tick" }),
  });

  useEffect(() => {
    if (state.status === "stopped") {
      clearTransition();
    }
  }, [clearTransition, state.status]);

  const stopSession = useCallback(() => {
    clearTransition();
    dispatch({ type: "stop", reason: "manual" });
  }, [clearTransition]);

  const resetHistory = useCallback(() => {
    dispatch({ type: "resetHistory" });
  }, []);

  const applySettings = useCallback((nextSettings) => {
    startSession(nextSettings);
  }, [startSession]);

  const stats = useMemo(() => [
    { label: "Score", value: String(state.score) },
    { label: "Accuracy", value: `${calculateAccuracy(state.correctCount, state.incorrectCount)}%` },
    { label: "Streak", value: String(state.streak), tone: "streak" },
    { label: "Best", value: String(state.bestStreak) },
  ], [state.bestStreak, state.correctCount, state.incorrectCount, state.score, state.streak]);

  const pianoKeys = useMemo(() => {
    const useFlats = state.targetNote?.accidental === -1;

    return {
      whites: WHITE_KEYS.map((key) => ({
        ...key,
        feedback:
          state.feedback.selectedPitchClass === key.pitchClass
            ? state.feedback.tone
            : state.locked && state.targetNote && getPitchClass(state.targetNote) === key.pitchClass
              ? "correct"
              : null,
      })),
      blacks: BLACK_KEYS.map((key) => ({
        label: settings.showNames ? (useFlats ? key.flat : key.sharp) : "",
        pitchClass: key.pitchClass,
        position: key.position,
        feedback:
          state.feedback.selectedPitchClass === key.pitchClass
            ? state.feedback.tone
            : state.locked && state.targetNote && getPitchClass(state.targetNote) === key.pitchClass
              ? "correct"
              : null,
      })),
    };
  }, [
    settings.showNames,
    state.feedback.selectedPitchClass,
    state.feedback.tone,
    state.locked,
    state.targetNote,
  ]);

  return {
    settings,
    state,
    stats,
    pianoKeys,
    targetNote: state.targetNote,
    submitAnswer,
    stopSession,
    applySettings,
    resetHistory,
    isInputLocked: state.locked || state.status !== "active",
  };
}
