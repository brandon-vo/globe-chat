import React from "react";

interface NavBarButtonProps {
  onClick: () => void;
  session?: string;
  icon: React.ReactNode;
}

function NavBarButton({
  onClick,
  session = "", // For styling the login and logout buttons with gradient colors
  icon,
}: NavBarButtonProps) {
  const commonButtonStyle =
    "text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500 " +
    "bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 sm:px-4 px-2 py-1 z-10 " +
    "rounded shadow-inner";

  const loginButtonStyle =
    "text-sm font-thin text-primary-500 hover:bg-green-200 tracking-wide hover:bg-primary-500 " +
    "bg-gradient-to-r from-green-500 to-green-200 dark:text-white sm:px-4 px-2 py-1 z-10 rounded " +
    "shadow-inner";

  const logoutButtonStyle =
    "text-sm font-thin text-primary-500 hover:bg-red-400 tracking-wide hover:bg-primary-500 " +
    "bg-gradient-to-r from-red-500 to-red-200 dark:text-white sm:px-4 px-2 py-1 z-10 rounded " +
    "shadow-inner";

  const buttonStyle =
    session === "login"
      ? loginButtonStyle
      : session === "logout"
        ? logoutButtonStyle
        : commonButtonStyle;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {icon}
    </button>
  );
}

export default NavBarButton;
