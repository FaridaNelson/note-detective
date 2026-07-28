import { useEffect, useRef, useState } from "react";

import ResultsDialog from "../components/dialogs/ResultsDialog";
import SettingsDialog from "../components/dialogs/SettingsDialog";
import GameCard from "../components/game/GameCard";
import PageHeader from "../components/game/PageHeader";
import TopBar from "../components/top-bar/TopBar";
import useGameSession from "../hooks/useGameSession";

export default function GamePage() {
  const game = useGameSession();
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [resultsReturnFocusRef, setResultsReturnFocusRef] = useState(null);
  const settingsButtonRef = useRef(null);
  const resultsButtonRef = useRef(null);
  const stopResultsButtonRef = useRef(null);
  const profileButtonRef = useRef(null);

  const closeOverlay = () => setActiveOverlay(null);
  const openResults = (returnFocusRef) => {
    setResultsReturnFocusRef(returnFocusRef);
    setActiveOverlay("results");
  };

  useEffect(() => {
    if (game.status === "stopped" && game.summary?.timed && activeOverlay !== "results") {
      openResults(resultsButtonRef);
    }
  }, [activeOverlay, game.status, game.summary]);

  return (
    <main className="game-page" aria-labelledby="game-title">
      <div className="game-page__surface">
        <TopBar
          isProfileMenuOpen={activeOverlay === "profile"}
          onCloseProfileMenu={closeOverlay}
          onToggleProfileMenu={() => setActiveOverlay((current) => (current === "profile" ? null : "profile"))}
          profileButtonRef={profileButtonRef}
        />
        <PageHeader
          onOpenResults={() => openResults(resultsButtonRef)}
          onOpenSettings={() => setActiveOverlay("settings")}
          resultsButtonRef={resultsButtonRef}
          settingsButtonRef={settingsButtonRef}
        />
        <GameCard
          game={game}
          onOpenResults={() => openResults(stopResultsButtonRef)}
          resultsButtonRef={stopResultsButtonRef}
        />
      </div>
      <SettingsDialog
        isOpen={activeOverlay === "settings"}
        settings={game.settings}
        onApply={game.applySettings}
        onClose={closeOverlay}
        returnFocusRef={settingsButtonRef}
      />
      <ResultsDialog
        isOpen={activeOverlay === "results"}
        summary={game.summary}
        noteStats={game.noteStats}
        onResetHistory={game.resetHistory}
        onClose={closeOverlay}
        returnFocusRef={resultsReturnFocusRef ?? resultsButtonRef}
      />
    </main>
  );
}
