import React, { useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { CloseIcon } from "./Icon.js";

function About(props) {
  // Popup
  const popupRef = useRef();

  // Popup animation
  const animation = useSpring({
    config: {
      duration: 50,
    },
    opacity: props.trigger ? 1 : 0,
  });

  // Exiting popup menu by clicking out of region or pressing escape key
  // eslint-disable-next-line
  const closePopUp = (e) => {
    if (popupRef.current === e.target) {
      props.setTrigger(false);
    } else if (e.key === "Escape") {
      props.setTrigger(false);
    }
  };

  // Reading escape key
  useEffect(() => {
    document.addEventListener("keydown", closePopUp);
    return () => document.removeEventListener("keydown", closePopUp);
  }, [closePopUp]);

  return props.trigger ? (
    <animated.div style={animation}>
      <div
        className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50"
        ref={popupRef}
        onClick={closePopUp}
      >
        <div className="p-6 relative text-black bg-white dark:text-white dark:bg-gray-700 max-w-xl rounded-2xl">
          <button
            className="absolute top-5 right-5"
            onClick={() => props.setTrigger(false)}
          >
            <CloseIcon />
          </button>
          {props.children}
        </div>
      </div>
    </animated.div>
  ) : null;
}

function AboutInfo() {
  return (
    <div className="m-2">
      <h3 className="font-bold text-2xl mb-4">About</h3>
      <p>
        {" "}
        Globe Chat is a real-time web app used to chat with anybody around the
        world. Users will sign in with their Google accounts or log in
        anonymously to be able to chat with other users in a single chat room.
      </p>
      <br />
      <p>Want to be verified on Globe Chat? Contact Brandon for a badge.</p>
      <br />
      <p>Created by Brandon Vo</p>
    </div>
  );
}

export { About, AboutInfo };
