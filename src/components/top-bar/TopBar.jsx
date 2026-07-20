import ProfileChipMenu from "./ProfileChipMenu";
import StudioPulseBrandPill from "./StudioPulseBrandPill";

export default function TopBar({ isProfileMenuOpen, onCloseProfileMenu, onToggleProfileMenu, profileButtonRef }) {
  return (
    <header className="top-bar" aria-label="StudioPulse game header">
      <StudioPulseBrandPill />
      <ProfileChipMenu
        isOpen={isProfileMenuOpen}
        onClose={onCloseProfileMenu}
        onToggle={onToggleProfileMenu}
        triggerRef={profileButtonRef}
      />
    </header>
  );
}
