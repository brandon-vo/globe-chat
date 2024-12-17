import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NavBarButton from "./NavBarButton";

interface NavBarProps {
  aboutPopUp: () => void;
  settingsPopUp: () => void;
  signInWithGoogle?: () => void;
  signOut?: () => void;
}

function NavBar({
  aboutPopUp,
  settingsPopUp,
  signInWithGoogle,
  signOut,
}: NavBarProps) {
  return (
    <ul className="flex items-center space-x-3">
      <NavBarButton onClick={aboutPopUp} icon={<InfoOutlinedIcon />} />
      <NavBarButton onClick={settingsPopUp} icon={<SettingsOutlinedIcon />} />
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

export default NavBar;
