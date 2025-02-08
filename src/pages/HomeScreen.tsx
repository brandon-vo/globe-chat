import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AboutPopup from "../components/AboutPopup";
import { GoogleSignIn } from "../components/Icon";
import Popup from "../components/Popup";
import SettingsPopup from "../components/SettingsPopup";

interface HomeScreenProps {
  signInWithGoogle: () => void;
  anonymousSignIn: () => void;
  showAboutPopup: boolean;
  showSettingsPopup: boolean;
  setShowAboutPopup: (value: boolean) => void;
  setShowSettingsPopup: (value: boolean) => void;
}

function HomeScreen({
  signInWithGoogle,
  anonymousSignIn,
  showAboutPopup,
  showSettingsPopup,
  setShowAboutPopup,
  setShowSettingsPopup,
}: HomeScreenProps) {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <p className="pb-2 font-medium text-5xl tracking-wider text-black dark:text-white text-center">
          globe chat
        </p>
        <p className="pb-5 font-light text-2xl tracking-normal text-gray-600 dark:text-gray-300 text-center">
          chat with the world
        </p>
        <div className="relative">
          <div className="pt-4 pb-2 flex justify-center mb-2 text-2xl">
            <button onClick={signInWithGoogle}>
              <GoogleSignIn />
            </button>
          </div>
          <div className="flex justify-center mb-2">
            <button
              className="rounded shadow-button pl-6 pr-8 py-5 bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600
                dark:text-white dark:hover:bg-gray-500 font-medium flex items-center justify-center overflow-y-hidden
                focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md"
              onClick={anonymousSignIn}
            >
              <PersonOutlineOutlinedIcon className="h-6 w-6 mr-3" />
              Sign in Anonymously
            </button>
          </div>
          <p className="pt-6 font-light text-base tracking-widest text-gray-500 dark:text-gray-200 text-center">
            created by brandon vo
          </p>
          <Popup trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
            <AboutPopup />
          </Popup>
          <Popup trigger={showSettingsPopup} setTrigger={setShowSettingsPopup}>
            <SettingsPopup />
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
