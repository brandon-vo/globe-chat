import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NavBarButton from "./NavBarButton";

interface NavBarProps {
  aboutPopup: () => void;
  settingsPopup: () => void;
  signOutPopup?: () => void;
  signInWithGoogle?: () => void;
}

function NavBar({
  aboutPopup,
  settingsPopup,
  signInWithGoogle,
  signOutPopup,
}: NavBarProps) {
  return (
    <ul className="flex items-center space-x-3">
      <NavBarButton onClick={aboutPopup} icon={<InfoOutlinedIcon />} />
      <NavBarButton onClick={settingsPopup} icon={<SettingsOutlinedIcon />} />
      {signInWithGoogle && (
        <NavBarButton
          onClick={signInWithGoogle}
          session={"login"}
          icon={<LoginOutlinedIcon />}
        />
      )}
      {signOutPopup && (
        <NavBarButton
          onClick={signOutPopup}
          session={"logout"}
          icon={<ExitToAppOutlinedIcon />}
        />
      )}
    </ul>
  );
}

export default NavBar;
