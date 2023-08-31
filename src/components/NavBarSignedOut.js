import { AboutIcon, SignInIcon, MusicIcon, MoonIcon, SunIcon } from "./Icon";

function NavBarSignedOut({
  aboutPopUp,
  musicClick,
  darkMode,
  toggleDarkMode,
  signInWithGoogle,
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
        <button onClick={signInWithGoogle}>
          <SignInIcon />
        </button>
      </div>
    </>
  );
}

export default NavBarSignedOut;
