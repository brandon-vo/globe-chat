import { auth, db } from './firebase';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import Chat from './components/Chat';
import { About, AboutInfo } from './components/Popup';
import { Logo, GoogleIcon, AnonymousIcon, AboutIcon, MoonIcon, SunIcon, SignInIcon, SignOutIcon, NewIcon } from './components/Icon';
import { ParticleBackground, DarkParticleBackground } from './components/ParticleBackground';
import useSound from 'use-sound';
import avatars from './assets/avatars/avatar';
import sounds from './assets/sounds/sounds';
import { BrowserView } from 'react-device-detect';
import './App.css';

function App() {
  const [user, setUser] = useState(() => auth.currentUser); // Setting user
  const [showAboutPopup, setShowAboutPopup] = useState(false); // About pop up initially disabled
  let darkTheme = true;
  if (localStorage.getItem('dark') === 'false') {
    darkTheme = false;
  }
  let contentSize = true;
  if (localStorage.getItem('size') === 'false') {
    contentSize = false;
  }
  const [darkMode, setDarkMode] = useState(darkTheme); // Dark mode initially enabled
  const [defaultSize, setDefaultSize] = useState(contentSize);

  // Sounds
  const [buttonSound] = useSound(sounds.button);
  const [clickSound] = useSound(sounds.click);
  const [switchSound] = useSound(sounds.switch);
  const [signOutSound] = useSound(sounds.signOut);

  // Setting user when signing in or out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
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
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage();
    auth.signInWithPopup(provider).catch(error => console.error(error));
  }

  const randomAvatar = () => {
    let max = 20;
    let num = 1;
    let randomNum = Math.floor(Math.random() * max);
    let avatarArr = Array(max).fill().map(() => avatars[num++])
    let avatar = avatarArr[randomNum];
    return avatar;
  }

  // Anonymous sign in
  const signInAnonymously = () => {
    buttonSound();
    auth.useDeviceLanguage();
    auth.signInAnonymously().then(user => {
      user.user.updateProfile({
        displayName: "Anonymous " + Math.floor(Math.random() * 999999 + 1),
        photoURL: randomAvatar()
      })
    })
      .catch(error => alert(error));
  }

  // Sign out
  const signOut = () => {
    auth.signOut().catch(error => alert(error))
    signOutSound();
  }

  // About pop up
  const aboutPopUp = () => {
    setShowAboutPopup(prev => !prev)
    clickSound();
  }

  const changeLayout = () => {
    if (defaultSize) {
      localStorage.setItem('size', false);
    } else {
      localStorage.setItem('size', true);
    }
    setDefaultSize(!defaultSize);
    clickSound();
  }

  // Toggle between dark mode and light mode
  const toggleDarkMode = () => {
    localStorage.setItem('dark', !darkMode);
    setDarkMode(!darkMode)
    switchSound();
  }

  // Changing between moon and sun icon when toggling dark mode
  const ModeIcon = darkMode ? MoonIcon : SunIcon

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="max-w-screen-7xl mx-auto min-h-screen dark:bg-gray-700">
        {user ? (
          null
        ) : <>
          <ParticleBackground />
          <DarkParticleBackground />
        </>
        }
        <nav className="fixed left-0 right-0">
          <div className="bg-gray-100 dark:bg-gray-800 px-8 py-5 flex justify-between">
            <Logo />
            {user ? (
              // Navigation bar for users signed in
              <>
                <div className="flex items-center space-x-3">
                  <button onClick={aboutPopUp}>
                    <AboutIcon />
                  </button>
                  <BrowserView>
                    <button onClick={changeLayout}>
                      <NewIcon />
                    </button>
                  </BrowserView>
                  <button onClick={toggleDarkMode}>
                    <ModeIcon />
                  </button>
                  <button onClick={signOut}>
                    <SignOutIcon />
                  </button>
                </div>
              </>
            ) : (
              // Navigation bar for users not signed in
              <>
                <div className="flex items-center space-x-3">
                  <button onClick={aboutPopUp}>
                    <AboutIcon />
                  </button>
                  <button onClick={toggleDarkMode}>
                    <ModeIcon />
                  </button>
                  <button onClick={signInWithGoogle}>
                    <SignInIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
        {user ? (
          // User signed in (Main chat)
          <>
            <p className='pt-28 pb-4 font-medium text-5xl tracking-wider text-black dark:text-white text-center'>
              globe chat
            </p>
            <p className=' font-normal font-body text-base tracking-widest text-gray-600 dark:text-gray-200 text-center lowercase'>
              welcome {user.displayName}
            </p>
            <p className="border-b border-gray-200 dark:border-gray-600 py-4 mb-4" />
            <About trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
              <AboutInfo />
            </About>
            <Chat user={user} db={db} />
          </>
        ) : (
          // User not signed in (Home screen)
          <>
            <div class="flex h-screen">
              <div class="m-auto">
                <p className='pb-2 font-medium text-5xl tracking-wider text-black dark:text-white text-center'>
                  globe chat
                </p>
                <p className="pb-5 font-light text-2xl tracking-normal text-gray-600 dark:text-gray-300 text-center">
                  a live chatting web app
                </p>
                <div className="relative">
                  <div className="pt-4 pb-2 flex justify-center mb-2 text-2xl">
                    <button onClick={signInWithGoogle}>
                      <GoogleIcon />
                    </button>
                  </div>
                  <div className="flex justify-center mb-2">
                    <button onClick={signInAnonymously}>
                      <AnonymousIcon />
                    </button>
                  </div>
                  <p className='pt-6 font-light text-base tracking-widest text-gray-500 dark:text-gray-200 text-center'>
                    created by brandon vo
                  </p>
                  <About trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
                    <AboutInfo />
                  </About>
                </div>
              </div>
            </div>
          </>
        )}
      </div >
    </div>
  );
}

export default App;