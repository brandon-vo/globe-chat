import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NavBarButton from "./NavBarButton";

interface NavBarSignedInProps {
  aboutPopUp: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  signInWithGoogle?: () => void;
  signOut?: () => void;
}

function NavBarSignedIn({
  aboutPopUp,
  darkMode,
  toggleDarkMode,
  signInWithGoogle,
  signOut,
}: NavBarSignedInProps) {
  return (
    <ul className="flex items-center space-x-3">
      <NavBarButton
        onClick={aboutPopUp}
        // darkMode={darkMode} TODO i forgot what this is
        text={<InfoOutlinedIcon />}
      />
      <NavBarButton
        onClick={toggleDarkMode}
        // darkMode={darkMode}
        icon={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      />
      {signInWithGoogle ? (
        <NavBarButton
          onClick={signInWithGoogle}
          session={"login"}
          // darkMode={darkMode}
          icon={<LoginOutlinedIcon />}
        />
      ) : (
        <NavBarButton
          onClick={signOut}
          session={"logout"}
          // darkMode={darkMode}
          icon={<ExitToAppOutlinedIcon />}
        />
      )}
    </ul>
  );
}

export default NavBarSignedIn;
