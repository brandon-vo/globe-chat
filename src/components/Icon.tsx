function Logo() {
  return (
    <div className="flex items-center">
      {/* Globe Icon */}
      <a href="https://github.com/brandon-vo/globe-chat">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-green-600 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002
                        2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2
                        2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </a>
      <span className="font-semibold sm:text-lg text-sm font-body dark:text-white">
        Globe Chat
      </span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <div
      className="rounded shadow-button pl-6 pr-8 py-5 
                bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 
                font-medium flex items-center justify-center overflow-y-hidden focus:outline-none
                focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md"
    >
      <svg
        viewBox="5 -5 30 30"
        enableBackground="new 5 -5 30 30"
        className="w-6 h-6 mr-4 flex-shrink-0"
      >
        {/* Google Logo */}
        <path
          fill="#EA4335"
          d="M15.3-4.2c3.3-1.1 7-1.1 10.3.1 1.8.7 3.5 1.7 4.9 3-.5.5-1 1-1.5 1.5-.9.9-1.9 1.8-2.8 
                    2.8-.9-.9-2.1-1.5-3.3-1.9-1.4-.4-3-.5-4.5-.2-1.7.4-3.3 1.2-4.6 2.5-1 1-1.8 2.2-2.2 
                    3.5-1.7-1.3-3.3-2.5-5-3.8 1.8-3.5 5-6.2 8.7-7.5z"
        />
        <path
          fill="#FBBC05"
          d="M5.3 7c.3-1.3.7-2.6 1.3-3.7 1.7 1.3 3.3 2.5 5 3.8-.7 1.9-.7 4 0 5.8-1.7 1.3-3.3 2.5-5 3.8-1.5-2.9-2-6.4-1.3-9.7z"
        />
        <path
          fill="#4285F4"
          d="M20.3 7.2c4.8 0 9.6 0 14.4 0 .5 2.6.4 5.4-.4 8-.7 2.4-2 4.6-3.9 6.2-1.6-1.2-3.2-2.5-4.9-3.7
                     1.6-1.1 2.7-2.8 3.1-4.6-2.8 0-5.6 0-8.3 0 0-2 0-4 0-5.9z"
        />
        <path
          fill="#34A853"
          d="M6.6 16.7c1.7-1.3 3.3-2.5 5-3.8.6 1.8 1.9 3.5 3.5 4.6 1 .7 2.2 1.2 3.4 1.4 1.2.2 2.4.2 3.7 0
                    1.2-.2 2.4-.6 3.4-1.3 1.6 1.2 3.2 2.5 4.9 3.7-1.8 1.6-3.9 2.7-6.3
                    3.2-2.6.6-5.3.6-7.8-.1-2-.5-3.9-1.5-5.6-2.7-1.7-1.3-3.2-3-4.2-5z"
        />
      </svg>
      Sign in with Google
    </div>
  );
}

// TODO replace with a different icon from pack
function SubmitIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

export { Logo, GoogleIcon, SubmitIcon };
