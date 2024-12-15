import React, { useRef, useEffect, useCallback } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface AboutProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children: React.ReactNode;
}

function Popup(props: AboutProps) {
  // Popup
  const popupRef = useRef<HTMLDivElement>(null);

  // Exiting popup menu by clicking out of region or pressing escape key
  const closePopUp = useCallback(
    (e: any) => {
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
          <button
            className="absolute top-5 right-5"
            onClick={() => props.setTrigger(false)}
          >
            <CloseOutlinedIcon />
          </button>
          {props.children}
        </div>
      </div>
    </div>
  ) : null;
}

export default Popup;
