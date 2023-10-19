import { auth, db } from "./firebase";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import MainChat from "./pages/MainChat";
import HomeScreen from "./pages/HomeScreen";
import NavBarWrapper from "./components/NavBarWrapper";
import NavBar from "./components/NavBar";
import ParticleBackground from "./components/ParticleBackground";
import ParticleConfig from "./config/particle-config";
import DarkParticleConfig from "./config/dark-particle-config";
import useSound from "use-sound";
import avatars from "./assets/images/avatars/avatar";
import sounds from "./assets/sounds/sounds";
import adjectives from "./constants/adjectives";
import nouns from "./constants/nouns";
import defaultAvatar from "./assets/images/avatars/avatar-1.jpg";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => auth.currentUser); // Setting user
  const [showAboutPopup, setShowAboutPopup] = useState(false); // About pop up initially disabled
  const [refreshAnonymous, setRefreshAnonymous] = useState(false); // To fix display name issue

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark") === "false" ? false : true
  );

  // Sounds
  const [buttonSound] = useSound(sounds.button);
  const [clickSound] = useSound(sounds.click);
  const [switchSound] = useSound(sounds.switch);
  const [signOutSound] = useSound(sounds.signOut);
  const [playbackRate, setPlaybackRate] = useState(0.6);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSound, { stop }] = useSound(sounds.background, {
    playbackRate,
    volume: 0.4,
  });

  // Setting user when signing in or out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Google sign in
  const signInWithGoogle = () => {
    buttonSound();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    auth.signInWithPopup(provider).catch((error) => console.error(error));
  };

  const randomAvatar = () => {
    let max = 50;
    let num = 1;
    let randomNum = Math.floor(Math.random() * max);
    let avatarArr = Array(max)
      .fill()
      .map(() => avatars[num++]);
    let avatar = avatarArr[randomNum];
    return avatar;
  };

  // Anonymous sign in
  const signInAnonymously = () => {
    buttonSound();
    auth.useDeviceLanguage();
    auth
      .signInAnonymously()
      .then((userCredential) => {
        const user = userCredential.user;
        const displayName =
          adjectives[Math.floor(Math.random() * adjectives.length)] +
          " " +
          nouns[Math.floor(Math.random() * nouns.length)];
        return user
          .updateProfile({
            displayName,
            photoURL: randomAvatar() || defaultAvatar,
          })
          .then(() => {
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

  // Clicking the music button
  const musicClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    setIsPlaying(!isPlaying);

    isPlaying ? stop() : musicSound();

    clickSound();

    playbackRate > 4 && setPlaybackRate(0.5);
  };

  // Toggle between dark mode and light mode
  const toggleDarkMode = () => {
    localStorage.setItem("dark", !darkMode);
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
              musicClick={musicClick}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              signOut={signOut}
            />
          ) : (
            <NavBar
              aboutPopUp={aboutPopUp}
              musicClick={musicClick}
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
            signInAnonymously={signInAnonymously}
            showAboutPopup={showAboutPopup}
            setShowAboutPopup={setShowAboutPopup}
          />
        )}
      </div>
    </div>
  );
}

export default App;
