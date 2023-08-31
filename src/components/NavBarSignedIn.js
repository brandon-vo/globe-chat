import { AboutIcon, MusicIcon, MoonIcon, SunIcon, SignOutIcon } from "./Icon";

function NavBarSignedIn({
  aboutPopUp,
  musicClick,
  darkMode,
  toggleDarkMode,
  signOut,
}) {
  // Changing between moon and sun icon when toggling dark mode
  const ModeIcon = darkMode ? MoonIcon : SunIcon;
  return (
    <>
      <div className="flex items-center space-x-3">
        <button onClick={aboutPopUp}>
          <AboutIcon />
        </button>
        <button onClick={musicClick}>
          <MusicIcon />
        </button>
        <button onClick={toggleDarkMode}>
          <ModeIcon />
        </button>
        <button onClick={signOut}>
          <SignOutIcon />
        </button>
      </div>
    </>
  );
}

export default NavBarSignedIn;
