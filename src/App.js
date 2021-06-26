import { auth, db } from './firebase';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import Channel from './components/Channel';
import Popup from './components/Popup';

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

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
      .catch(error => console.error(error));
  }

  // Sign out
  const signOut = () => {
    auth.signOut().catch(error => alert(error));
  }

  return (
    <div className="max-w-screen-7xl mx-auto dark:bg-gray-700">
      <nav className="fixed left-0 right-0">
        <div className="bg-gray-100 dark:bg-gray-800 px-8 py-5 flex justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-semibold text-lg font-body dark:text-white">Globe Chat</span>
          </div>
          {user ? (
            <>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAboutPopup(prev => !prev)}
                  className="text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500 bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 px-4 py-1 z-10 rounded transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => alert('Not implemented')}
                  className="text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500 bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 px-4 py-1 z-10 rounded transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                <button
                  onClick={signOut}
                  className="text-sm font-thin text-primary-500 hover:bg-red-400 tracking-wide hover:bg-primary-500 bg-gradient-to-r from-red-500 to-red-200 dark:text-white px-4 py-1 z-10 rounded transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAboutPopup(prev => !prev)}
                  className="text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500 bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 px-4 py-1 z-10 rounded transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={signInWithGoogle}
                  className="text-sm font-thin text-primary-500 hover:bg-green-200 tracking-wide hover:bg-primary-500 bg-gradient-to-r from-green-500 to-green-200 dark:text-white px-4 py-1 z-10 rounded transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
      {user ? (
        <>
          <p className='pt-28 pb-2 font-medium text-5xl tracking-wider text-black dark:text-white text-center'>
            globe chat
          </p>
          <p className=' pb-1 font-normal font-body text-base tracking-widest text-gray-600 dark:text-gray-200 text-center lowercase'>
            welcome {user.displayName}
          </p>
          <p className="border-b border-gray-200 dark:border-gray-600 py-4 mb-4" />
          <Popup trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
            <h3 className="font-bold">About</h3>
            <p> Globe Chat is a real-time web app used to chat with anybody around the world. Users will sign in with their Google accounts or log in
              anonymously to be able to chat with other users in a single chat room.
            </p><br />
            <p>
              It is built with Javascript using React and Firebase as a database.
            </p><br />
            <p>Created by Brandon Vo</p>
          </Popup>
          <Popup trigger={showSettingsPopup} setTrigger={setShowSettingsPopup}>
            <h3 className="font-bold">Settings</h3>
            <p>
              TODO
            </p>
          </Popup>
          <Channel user={user} db={db} />
        </>
      ) : (
        <>
          <div>
            <p className='pt-52 font-medium text-5xl tracking-wider text-black dark:text-white text-center'>
              globe chat
            </p>
            <p className="pb-5 font-light text-2xl tracking-normal text-gray-600 dark:text-gray-300 text-center">
              a live chatting web app
            </p>
            <div className="pt-4 pb-2 flex items-center justify-center">
              <div className="mb-2 text-2xl flex items-center">
                <button
                  onClick={signInWithGoogle}
                  className="rounded shadow-button pl-6 pr-8 py-5 bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md">
                  <svg
                    viewBox="5 -5 30 30"
                    enableBackground="new 5 -5 30 30"
                    className="w-6 h-6 mr-4 flex-shrink-0"
                  >
                    <path
                      fill="#EA4335"
                      d="M15.3-4.2c3.3-1.1 7-1.1 10.3.1 1.8.7 3.5 1.7 4.9 3-.5.5-1 1-1.5 1.5-.9.9-1.9 1.8-2.8 2.8-.9-.9-2.1-1.5-3.3-1.9-1.4-.4-3-.5-4.5-.2-1.7.4-3.3 1.2-4.6 2.5-1 1-1.8 2.2-2.2 3.5-1.7-1.3-3.3-2.5-5-3.8 1.8-3.5 5-6.2 8.7-7.5z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M5.3 7c.3-1.3.7-2.6 1.3-3.7 1.7 1.3 3.3 2.5 5 3.8-.7 1.9-.7 4 0 5.8-1.7 1.3-3.3 2.5-5 3.8-1.5-2.9-2-6.4-1.3-9.7z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M20.3 7.2c4.8 0 9.6 0 14.4 0 .5 2.6.4 5.4-.4 8-.7 2.4-2 4.6-3.9 6.2-1.6-1.2-3.2-2.5-4.9-3.7 1.6-1.1 2.7-2.8 3.1-4.6-2.8 0-5.6 0-8.3 0 0-2 0-4 0-5.9z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M6.6 16.7c1.7-1.3 3.3-2.5 5-3.8.6 1.8 1.9 3.5 3.5 4.6 1 .7 2.2 1.2 3.4 1.4 1.2.2 2.4.2 3.7 0 1.2-.2 2.4-.6 3.4-1.3 1.6 1.2 3.2 2.5 4.9 3.7-1.8 1.6-3.9 2.7-6.3 3.2-2.6.6-5.3.6-7.8-.1-2-.5-3.9-1.5-5.6-2.7-1.7-1.3-3.2-3-4.2-5z"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="mb-2 text-base flex items-center">
                <button
                  onClick={signInAnonymously}
                  className="rounded shadow-button pl-6 pr-8 py-5 bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 font-medium flex items-center justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign in Anonymously
                </button>
              </div>
            </div>
            <p className='py-14 pb-96 font-light text-base tracking-widest text-gray-500 dark:text-gray-200 text-center'>
              created by brandon vo
            </p>
            <Popup trigger={showAboutPopup} setTrigger={setShowAboutPopup}>
              <h3 className="font-bold">About</h3>
              <p> Globe Chat is a real-time web app used to chat with anybody around the world. Users will sign in with their Google accounts or log in
                anonymously to be able to chat with other users in a single chat room.
              </p><br />
              <p>
                It is built with Javascript using React and Firebase as a database.
              </p><br />
              <p>Created by Brandon Vo</p>
            </Popup>
          </div>
        </>
      )}

    </div>
  );
}

export default App;