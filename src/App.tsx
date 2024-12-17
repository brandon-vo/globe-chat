import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { useDarkModeStore, useUserStore, useVolumeStore } from "./store";
import MainChat from "./pages/MainChat";
import HomeScreen from "./pages/HomeScreen";
import NavBarWrapper from "./components/NavBarWrapper";
import NavBar from "./components/NavBar";
import ParticleBackground from "./components/ParticleBackground";
import ParticleConfig from "./config/particle-config";
import DarkParticleConfig from "./config/dark-particle-config";
import useSound from "use-sound";
import avatars from "./helpers/getAvatar";
import sounds from "./helpers/getSounds";
import adjectives from "./constants/adjectives";
import nouns from "./constants/nouns";
import defaultAvatar from "./assets/images/avatars/avatar-1.jpg";

import "./App.css";

function App() {
  const { user, setUser } = useUserStore();
  const { isDarkMode } = useDarkModeStore();
  const { isMuted } = useVolumeStore();
  const [showAboutPopup, setShowAboutPopup] = useState<boolean>(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState<boolean>(false);
  const [refreshAnonymous, setRefreshAnonymous] = useState<boolean>(false); // To fix display name issue

  // Sounds
  const [buttonSound] = useSound(sounds.button, { volume: isMuted ? 0 : 1 });
  const [clickSound] = useSound(sounds.click, { volume: isMuted ? 0 : 1 });
  const [signOutSound] = useSound(sounds.signOut, {
    volume: isMuted ? 0 : 0.8,
  });

  // Setting user when signing in or out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        return;
      }
      const firebaseUser = {
        uid: user.uid,
        displayName: user.displayName || "Broken",
        photoURL: user.photoURL || "",
        isAnonymous: user.isAnonymous,
      };
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, [setUser]);

  const signInWithGoogle = () => {
    buttonSound();
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider).catch((error: any) => console.error(error));
  };

  const randomAvatar = () => {
    const max = Object.keys(avatars).length;
    const randomNum = Math.floor(Math.random() * max + 1); // Random number between 1 and max
    const avatar = avatars[randomNum];
    return avatar;
  };

  // TODO: Do something where users on the same device sign into the same anonymous account as before if within a certain time frame
  const anonymousSignIn = () => {
    buttonSound();
    auth.useDeviceLanguage();
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        const displayName =
          adjectives[Math.floor(Math.random() * adjectives.length)] +
          " " +
          nouns[Math.floor(Math.random() * nouns.length)];
        if (!user) return;
        updateProfile(user, {
          displayName,
          photoURL: randomAvatar() || defaultAvatar,
        }).then(() => {
          const firebaseUser = {
            uid: user.uid,
            displayName: user.displayName || "Broken",
            photoURL: user.photoURL || "",
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
  const signOut = () => {
    auth.signOut().catch((error) => alert(error));
    signOutSound();
  };

  // About pop up
  const aboutPopUp = () => {
    setShowAboutPopup((prev) => !prev);
    clickSound();
  };

  // Settings pop up
  const settingsPopUp = () => {
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
          {user ? (
            <NavBar
              aboutPopUp={aboutPopUp}
              settingsPopUp={settingsPopUp}
              signOut={signOut}
            />
          ) : (
            <NavBar
              aboutPopUp={aboutPopUp}
              settingsPopUp={settingsPopUp}
              signInWithGoogle={signInWithGoogle}
            />
          )}
        </NavBarWrapper>
        {user ? (
          <MainChat
            db={db}
            showAboutPopup={showAboutPopup}
            showSettingsPopup={showSettingsPopup}
            setShowAboutPopup={setShowAboutPopup}
            setShowSettingsPopup={setShowSettingsPopup}
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
      </div>
    </div>
  );
}

export default App;
