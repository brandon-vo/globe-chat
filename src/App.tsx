import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
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
  const [user, setUser] = useState(() => auth.currentUser); // Setting user
  const [showAboutPopup, setShowAboutPopup] = useState<boolean>(false); // About pop up initially disabled
  const [refreshAnonymous, setRefreshAnonymous] = useState<boolean>(false); // To fix display name issue

  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("dark") === "false" ? false : true,
  );

  // Sounds
  const [buttonSound] = useSound(sounds.button);
  const [clickSound] = useSound(sounds.click);
  const [switchSound] = useSound(sounds.switch);
  const [signOutSound] = useSound(sounds.signOut);

  // Setting user when signing in or out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
    return unsubscribe;
  }, []);

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
          setUser(user);
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

  // Toggle between dark mode and light mode
  const toggleDarkMode = () => {
    localStorage.setItem("dark", (!darkMode).toString());
    setDarkMode(!darkMode);
    switchSound();
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="max-w-screen-7xl mx-auto min-h-screen dark:bg-gray-700">
        {user ? null : (
          <ParticleBackground
            config={darkMode ? DarkParticleConfig : ParticleConfig}
          />
        )}
        <NavBarWrapper>
          {user ? (
            <NavBar
              aboutPopUp={aboutPopUp}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              signOut={signOut}
            />
          ) : (
            <NavBar
              aboutPopUp={aboutPopUp}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              signInWithGoogle={signInWithGoogle}
            />
          )}
        </NavBarWrapper>
        {user ? (
          <MainChat
            user={user}
            showAboutPopup={showAboutPopup}
            setShowAboutPopup={setShowAboutPopup}
            db={db}
          />
        ) : (
          <HomeScreen
            signInWithGoogle={signInWithGoogle}
            anonymousSignIn={anonymousSignIn}
            showAboutPopup={showAboutPopup}
            setShowAboutPopup={setShowAboutPopup}
          />
        )}
      </div>
    </div>
  );
}

export default App;
