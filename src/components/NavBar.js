import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NavBarButton from "./NavBarButton";

function NavBarSignedIn({
  aboutPopUp,
  darkMode,
  toggleDarkMode,
  signInWithGoogle = null,
  signOut = null,
}) {
  return (
    <ul className="flex items-center space-x-3">
      <NavBarButton
        onClick={aboutPopUp}
        darkMode={darkMode}
        text={<InfoOutlinedIcon />}
      />
      <NavBarButton
        onClick={toggleDarkMode}
        darkMode={darkMode}
        icon={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
      />
      {signInWithGoogle ? (
        <NavBarButton
          onClick={signInWithGoogle}
          session={"login"}
          darkMode={darkMode}
          icon={<LoginOutlinedIcon />}
        />
      ) : (
        <NavBarButton
          onClick={signOut}
          session={"logout"}
          darkMode={darkMode}
          icon={<ExitToAppOutlinedIcon />}
        />
      )}
    </ul>
  );
}

export default NavBarSignedIn;
