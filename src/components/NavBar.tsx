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
      <NavBarButton onClick={aboutPopUp} icon={<InfoOutlinedIcon />} />
      <NavBarButton
        onClick={toggleDarkMode}
        icon={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      />
      {signInWithGoogle && (
        <NavBarButton
          onClick={signInWithGoogle}
          session={"login"}
          icon={<LoginOutlinedIcon />}
        />
      )}
      {signOut && (
        <NavBarButton
          onClick={signOut}
          session={"logout"}
          icon={<ExitToAppOutlinedIcon />}
        />
      )}
    </ul>
  );
}

export default NavBarSignedIn;
