import { Firestore } from "firebase/firestore";
import useSound from "use-sound";
import AboutPopup from "../components/AboutPopup";
import Chat from "../components/Chat";
import Popup from "../components/Popup";
import SettingsPopup from "../components/SettingsPopup";
import SignOutPopup from "../components/SignOutPopup";
import { auth } from "../firebase";
import sounds from "../helpers/getSounds";
import { useUserStore, useVolumeStore } from "../store";

interface MainChatProps {
  db: Firestore;
  showAboutPopup: boolean;
  showSettingsPopup: boolean;
  showSignOutPopup: boolean;
  setShowAboutPopup: (value: boolean) => void;
  setShowSettingsPopup: (value: boolean) => void;
  setShowSignOutPopup: (value: boolean) => void;
}

function MainChat({
  db,
  showAboutPopup,
  showSettingsPopup,
  showSignOutPopup,
  setShowAboutPopup,
  setShowSettingsPopup,
  setShowSignOutPopup,
}: MainChatProps) {
  const { user } = useUserStore();
  const { isMuted } = useVolumeStore();

  const [signOutSound] = useSound(sounds.signOut, {
    volume: isMuted ? 0 : 0.8,
  });

  const signOut = () => {
    setShowSignOutPopup(false);
    auth
      .signOut()
      .then(() => {
        signOutSound();
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (!user) return null;

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
      <Popup
        trigger={showSignOutPopup}
        setTrigger={setShowSignOutPopup}
        confirmMode={true}
        confirmText="Sign Out"
        onConfirm={signOut}
      >
        <SignOutPopup />
      </Popup>
      <Chat user={user} db={db} />
    </>
  );
}

export default MainChat;
