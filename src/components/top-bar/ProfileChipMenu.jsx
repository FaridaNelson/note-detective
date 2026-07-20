export default function ProfileChipMenu() {
  return (
    <div className="profile-menu-wrap">
      <button className="profile-chip" type="button" aria-label="Guest profile menu">
        <span className="profile-chip__avatar">G</span>
        <span>
          Guest <span className="profile-chip__caret" aria-hidden="true">v</span>
        </span>
      </button>

      <div className="profile-menu-shell" aria-label="Guest profile preview">
        <p className="profile-menu-shell__eyebrow">Playing as guest</p>
        <p className="profile-menu-shell__note">
          Progress saves on this device only. Sign in to keep it in StudioPulse.
        </p>
        <button className="profile-menu-shell__button" type="button">
          Sign in to StudioPulse
        </button>
      </div>
    </div>
  );
}
