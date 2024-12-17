import Chat from "../components/Chat";
import Popup from "../components/Popup";
import AboutPopup from "../components/AboutPopup";
import SettingsPopup from "../components/SettingsPopup";
import { useUserStore } from "../store";

interface MainChatProps {
  db: any; // TODO
  showAboutPopup: boolean;
  showSettingsPopup: boolean;
  setShowAboutPopup: (value: boolean) => void;
  setShowSettingsPopup: (value: boolean) => void;
}

function MainChat({
  db,
  showAboutPopup,
  showSettingsPopup,
  setShowAboutPopup,
  setShowSettingsPopup,
}: MainChatProps) {
  const { user } = useUserStore();

  return (
    <>
      <p className="pt-28 pb-4 font-medium text-5xl tracking-wider text-black dark:text-white text-center">
        globe chat
      </p>
      <p className="font-normal font-body text-base tracking-widest text-gray-600 dark:text-gray-200 text-center lowercase">
        welcome {user?.displayName}
      </p>
      <p className="border-b border-gray-200 dark:border-gray-600 py-4 mb-4" />
      <Popup trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
        <AboutPopup />
      </Popup>
      <Popup trigger={showSettingsPopup} setTrigger={setShowSettingsPopup}>
        <SettingsPopup />
      </Popup>
      <Chat user={user} db={db} />
    </>
  );
}

export default MainChat;
