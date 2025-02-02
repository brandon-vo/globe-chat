import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useCallback, useEffect, useRef } from "react";
import useSound from "use-sound";
import sounds from "../helpers/getSounds";
import { useVolumeStore } from "../store";

interface AboutProps {
  className?: string;
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children: React.ReactNode;
  confirmMode?: boolean;
  confirmText?: string;
  onConfirm?: () => void;
}

function Popup({
  className = "",
  trigger,
  setTrigger,
  children,
  confirmMode,
  confirmText,
  onConfirm,
}: AboutProps) {
  // Popup
  const popupRef = useRef<HTMLDivElement>(null);

  const { isMuted } = useVolumeStore();

  const [clickSound] = useSound(sounds.button2, { volume: isMuted ? 0 : 0.5 });

  // Exiting popup menu by clicking out of region or pressing escape key
  const closePopUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => {
      if (popupRef.current === e.target) {
        setTrigger(false);
      } else if (e instanceof KeyboardEvent && e.key === "Escape") {
        setTrigger(false);
      }
    },
    [setTrigger],
  );

  // Reading escape key
  useEffect(() => {
    document.addEventListener("keydown", closePopUp);
    return () => document.removeEventListener("keydown", closePopUp);
  }, [closePopUp]);

  return trigger ? (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        ref={popupRef}
        onClick={closePopUp}
      />
      {/* Popup Window */}
      <div
        className={`  ${confirmText === "Sign Out" ? "w-2/3 md:w-1/3 lg:w-1/4 xl:w-1/5" : "w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3"} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white dark:bg-gray-700 text-black dark:text-white rounded-2xl z-50`}
      >
        {confirmMode ? (
          <div className="flex flex-col space-y-4">
            {children}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setTrigger(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clickSound();
                  if (onConfirm) onConfirm();
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                {confirmText}
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              className="absolute top-5 right-5"
              onClick={() => setTrigger(false)}
            >
              <CloseOutlinedIcon />
            </button>
            {children}
          </>
        )}
      </div>
    </>
  ) : null;
}

export default Popup;
