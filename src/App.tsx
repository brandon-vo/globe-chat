import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import NavBar from "./components/NavBar";
import NavBarWrapper from "./components/NavBarWrapper";
import ParticleBackground from "./components/ParticleBackground";
import DarkParticleConfig from "./config/dark-particle-config";
import ParticleConfig from "./config/particle-config";
import adjectives from "./constants/adjectives";
import nouns from "./constants/nouns";
import { auth, db } from "./firebase";
import avatars from "./helpers/getAvatar";
import sounds from "./helpers/getSounds";
import HomeScreen from "./pages/HomeScreen";
import MainChat from "./pages/MainChat";
import { useDarkModeStore, useUserStore, useVolumeStore } from "./store";

import "./App.css";

function App() {
  const { user, setUser } = useUserStore();
  const { isDarkMode } = useDarkModeStore();
  const { isMuted } = useVolumeStore();

  const [showAboutPopup, setShowAboutPopup] = useState<boolean>(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState<boolean>(false);
  const [showSignOutPopup, setShowSignOutPopup] = useState<boolean>(false);
  const [refreshAnonymous, setRefreshAnonymous] = useState<boolean>(false); // To fix display name issue
  const [loading, setLoading] = useState<boolean>(true);

  // Sounds
  const [buttonSound] = useSound(sounds.button, { volume: isMuted ? 0 : 1 });
  const [clickSound] = useSound(sounds.click, { volume: isMuted ? 0 : 1 });

  const defaultAvatar = "assets/images/avatars/avatar-1.jpg";

  // Setting user when signing in or out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
      } else {
        const firebaseUser = {
          uid: user.uid,
          displayName: user.displayName ?? "Broken User",
          photoURL: user.photoURL ?? defaultAvatar,
          isAnonymous: user.isAnonymous,
        };
        setUser(firebaseUser);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [setUser]);

  const signInWithGoogle = () => {
    buttonSound();
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider).catch((error) => console.error(error));
  };

  const randomAvatar = () => {
    const max = Object.keys(avatars).length;
    const randomNum = Math.floor(Math.random() * max + 1); // Random number between 1 and max
    const avatar = avatars[randomNum];
    return avatar;
  };

  // TODO: Do something where users on the same device sign into the same anonymous account as before if within a certain time frame?
  const anonymousSignIn = () => {
    buttonSound();
    auth.useDeviceLanguage();
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user) return;

        // number of combinations = number of adjectives * number of nouns
        const displayName =
          adjectives[Math.floor(Math.random() * adjectives.length)] +
          " " +
          nouns[Math.floor(Math.random() * nouns.length)];

        updateProfile(user, {
          displayName,
          photoURL: randomAvatar() || defaultAvatar,
        }).then(() => {
          const firebaseUser = {
            uid: user.uid,
            displayName: user.displayName || "Broken Anonymous",
            photoURL: user.photoURL || defaultAvatar,
            isAnonymous: user.isAnonymous,
          };
          setUser(firebaseUser);
          setRefreshAnonymous(true);
        });
      })
      .catch((error) => console.error(error));
  };

  // To fix the issue where Anonymous username doesnt show up immediately after signing in
  useEffect(() => {}, [refreshAnonymous]);

  // Sign out
  const signOutPopup = () => {
    setShowSignOutPopup((prev) => !prev);
    clickSound();
  };

  // About pop up
  const aboutPopup = () => {
    setShowAboutPopup((prev) => !prev);
    clickSound();
  };

  // Settings pop up
  const settingsPopup = () => {
    setShowSettingsPopup((prev) => !prev);
    clickSound();
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="max-w-screen-7xl mx-auto min-h-screen dark:bg-gray-700">
        {user ? null : (
          <ParticleBackground
            config={isDarkMode ? ParticleConfig : DarkParticleConfig}
          />
        )}
        <NavBarWrapper>
          {loading ? (
            <NavBar aboutPopup={aboutPopup} settingsPopup={settingsPopup} />
          ) : (
            <>
              {user ? (
                <NavBar
                  aboutPopup={aboutPopup}
                  signOutPopup={signOutPopup}
                  settingsPopup={settingsPopup}
                />
              ) : (
                <NavBar
                  aboutPopup={aboutPopup}
                  settingsPopup={settingsPopup}
                  signInWithGoogle={signInWithGoogle}
                />
              )}
            </>
          )}
        </NavBarWrapper>
        {loading ? (
          <div className="flex items-center justify-center w-screen h-screen">
            <p className="pb-2 font-medium text-5xl tracking-wider text-black dark:text-white text-center">
              globe chat
            </p>
          </div>
        ) : (
          <>
            {user ? (
              <MainChat
                db={db}
                showAboutPopup={showAboutPopup}
                showSettingsPopup={showSettingsPopup}
                showSignOutPopup={showSignOutPopup}
                setShowAboutPopup={setShowAboutPopup}
                setShowSettingsPopup={setShowSettingsPopup}
                setShowSignOutPopup={setShowSignOutPopup}
              />
            ) : (
              <HomeScreen
                signInWithGoogle={signInWithGoogle}
                anonymousSignIn={anonymousSignIn}
                showAboutPopup={showAboutPopup}
                showSettingsPopup={showSettingsPopup}
                setShowAboutPopup={setShowAboutPopup}
                setShowSettingsPopup={setShowSettingsPopup}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
