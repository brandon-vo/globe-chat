import React, { useRef, useEffect, useCallback } from "react";
import sounds from "../helpers/getSounds";
import useSound from "use-sound";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface AboutProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children: React.ReactNode;
  confirmMode?: boolean;
  onConfirm?: () => void;
}

function Popup(props: AboutProps) {
  // Popup
  const popupRef = useRef<HTMLDivElement>(null);

  const [clickSound] = useSound(sounds.button2, { volume: 0.5 });

  // Exiting popup menu by clicking out of region or pressing escape key
  const closePopUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => {
      if (popupRef.current === e.target) {
        props.setTrigger(false);
      } else if (e instanceof KeyboardEvent && e.key === "Escape") {
        props.setTrigger(false);
      }
    },
    [props],
  );

  // Reading escape key
  useEffect(() => {
    document.addEventListener("keydown", closePopUp);
    return () => document.removeEventListener("keydown", closePopUp);
  }, [closePopUp]);

  return props.trigger ? (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50"
        ref={popupRef}
        onClick={closePopUp}
      >
        <div className="p-6 relative text-black bg-white dark:text-white dark:bg-gray-700 max-w-xl rounded-2xl">
          {props.confirmMode ? (
            <div className="flex flex-col space-y-4">
              {props.children}
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => props.setTrigger(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clickSound();
                    if (props.onConfirm) props.onConfirm();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                className="absolute top-5 right-5"
                onClick={() => props.setTrigger(false)}
              >
                <CloseOutlinedIcon />
              </button>
              {props.children}
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Popup;
