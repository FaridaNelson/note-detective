import ProfileChipMenu from "./ProfileChipMenu";
import StudioPulseBrandPill from "./StudioPulseBrandPill";

export default function TopBar() {
  return (
    <header className="top-bar" aria-label="StudioPulse game header">
      <StudioPulseBrandPill />
      <ProfileChipMenu />
    </header>
  );
}
