import GlobeIcon from "../assets/GlobeIcon";
import GoogleIcon from "../assets/GoogleIcon";

function Brand() {
  return (
    <div className="flex items-center">
      <GlobeIcon />
      <span className="font-semibold text-lg font-body dark:text-white">
        Globe Chat
      </span>
    </div>
  );
}

function GoogleSignIn() {
  return (
    <div
      className="rounded shadow-button pl-6 pr-8 py-5
                bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500
                font-medium flex items-center justify-center overflow-y-hidden focus:outline-none
                focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md"
    >
      <GoogleIcon />
      Sign in with Google
    </div>
  );
}

export { Brand, GoogleSignIn };
