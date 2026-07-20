import { useRef, useState } from "react";

import ResultsDialog from "../components/dialogs/ResultsDialog";
import SettingsDialog from "../components/dialogs/SettingsDialog";
import GameCard from "../components/game/GameCard";
import PageHeader from "../components/game/PageHeader";
import TopBar from "../components/top-bar/TopBar";

const STATIC_SESSION_STATS = [
  { label: "Score", value: "0" },
  { label: "Streak", value: "0", tone: "streak" },
  { label: "Best", value: "0" },
  { label: "Time", value: "∞" },
];

export default function GamePage() {
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
          stats={STATIC_SESSION_STATS}
          onOpenResults={() => openResults(stopResultsButtonRef)}
          resultsButtonRef={stopResultsButtonRef}
        />
      </div>
      <SettingsDialog
        isOpen={activeOverlay === "settings"}
        onClose={closeOverlay}
        returnFocusRef={settingsButtonRef}
      />
      <ResultsDialog
        isOpen={activeOverlay === "results"}
        onClose={closeOverlay}
        returnFocusRef={resultsReturnFocusRef ?? resultsButtonRef}
      />
    </main>
  );
}
