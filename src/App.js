import { auth, db } from './firebase';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import Chat from './components/Chat';
import { About, AboutInfo } from './components/Popup';
import { Logo, GoogleIcon, AnonymousIcon, AboutIcon, DarkModeIcon, SignInIcon, SignOutIcon } from './components/Icon';
import { ParticleBackground, DarkParticleBackground } from './components/ParticleBackground';

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [showAboutPopup, setShowAboutPopup] = useState(false);

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
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage();
    auth.signInWithPopup(provider).catch(error => console.error(error));
  }

  // Anonymous sign in
  const signInAnonymously = () => {
    auth.useDeviceLanguage();
    auth.signInAnonymously().then(user => {
      user.user.updateProfile({
        displayName: "Anonymous " + (Math.random() * 999999 + 1).toFixed(0),
        photoURL: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      })
    })
      .catch(error => alert(error));
  }

  // Sign out
  const signOut = () => {
    auth.signOut().catch(error => alert(error));
  }

  return (
    <div className="max-w-screen-7xl mx-auto dark:bg-gray-700">
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
                <button onClick={() => setShowAboutPopup(prev => !prev)}>
                  <AboutIcon />
                </button>
                <button onClick={() => alert('Toggling dark mode is currently not implemented')}>
                  <DarkModeIcon />
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
                <button onClick={() => setShowAboutPopup(prev => !prev)}>
                  <AboutIcon />
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
          <p className='pt-28 pb-2 font-medium text-5xl tracking-wider text-black dark:text-white text-center'>
            globe chat
          </p>
          <p className=' pb-1 font-normal font-body text-base tracking-widest text-gray-600 dark:text-gray-200 text-center lowercase'>
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
          <div>
            <p className='pt-52 font-medium text-5xl tracking-wider text-black dark:text-white text-center'>
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
              <p className='py-14 pb-96 font-light text-base tracking-widest text-gray-500 dark:text-gray-200 text-center'>
                created by brandon vo
              </p>
              <About trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
                <AboutInfo />
              </About>
            </div>
          </div>
        </>
      )}
    </div >
  );
}

export default App;