import { useEffect, useRef } from "react";

const MENU_ID = "guest-profile-menu";

function getMenuItems(menuElement) {
  return Array.from(
    menuElement.querySelectorAll('[role="menuitem"]:not([disabled])'),
  );
}

export default function ProfileChipMenu({
  isOpen,
  onClose,
  onToggle,
  triggerRef,
}) {
  const wrapRef = useRef(null);
  const menuRef = useRef(null);
  const openedFromKeyboardRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    if (openedFromKeyboardRef.current) {
      getMenuItems(menuRef.current)[0]?.focus();
    }

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) {
        onCloseRef.current();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, triggerRef]);

  const toggleFromPointer = () => {
    openedFromKeyboardRef.current = false;
    onToggle();
  };

  const toggleFromKeyboard = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openedFromKeyboardRef.current = !isOpen;
    onToggle();
  };

  const handleMenuKeyDown = (event) => {
    const menuItems = getMenuItems(menuRef.current);
    const activeIndex = menuItems.indexOf(document.activeElement);

    if (menuItems.length === 0) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        activeIndex === -1
          ? 0
          : (activeIndex + offset + menuItems.length) % menuItems.length;
      menuItems[nextIndex].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      menuItems[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      menuItems[menuItems.length - 1].focus();
    } else if (
      (event.key === "Enter" || event.key === " ") &&
      activeIndex !== -1
    ) {
      event.preventDefault();
      menuItems[activeIndex].click();
    }
  };

  return (
    <div ref={wrapRef} className="profile-menu-wrap">
      <button
        ref={triggerRef}
        className="profile-chip"
        type="button"
        aria-label="Guest profile menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={toggleFromPointer}
        onKeyDown={toggleFromKeyboard}
      >
        <span className="profile-chip__avatar">G</span>
        <span>
          Guest{" "}
          <span className="profile-chip__caret" aria-hidden="true">
            v
          </span>
        </span>
      </button>

      {isOpen ? (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="profile-menu-shell"
          role="menu"
          aria-label="Guest profile options"
          onKeyDown={handleMenuKeyDown}
        >
          <p className="profile-menu-shell__eyebrow" role="none">
            Playing as guest
          </p>
          <p className="profile-menu-shell__note" role="none">
            Progress saves on this device only. Sign in to keep it in
            StudioPulse.
          </p>
          <a
            className="profile-menu-shell__button"
            href="https://studiopulse.co/?openAuth=signin"
            role="menuitem"
            onClick={onClose}
          >
            Sign in to StudioPulse
          </a>
        </div>
      ) : null}
    </div>
  );
}
