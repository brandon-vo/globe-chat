import Chat from "../components/Chat";
import { About, AboutInfo } from "../components/Popup";

function MainChat({ user, showAboutPopup, setShowAboutPopup, db }) {
  return (
    <>
      <p className="pt-28 pb-4 font-medium text-5xl tracking-wider text-black dark:text-white text-center">
        globe chat
      </p>
      <p className="font-normal font-body text-base tracking-widest text-gray-600 dark:text-gray-200 text-center lowercase">
        welcome {user.displayName}
      </p>
      <p className="border-b border-gray-200 dark:border-gray-600 py-4 mb-4" />
      <About trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
        <AboutInfo />
      </About>
      <Chat user={user} db={db} />
    </>
  );
}

export default MainChat;
