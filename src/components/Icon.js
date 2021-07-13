function Logo() {
    return (
        <div className="flex items-center">
            {/* Globe Icon */}
            <a href='https://github.com/brandon-vo/globe-chat'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600 dark:text-blue-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002
                        2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2
                        2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </a>
            <span class="font-semibold text-lg font-body dark:text-white">
                Globe Chat
            </span>
        </div>
    )
}

function GoogleIcon() {
    return (
        <div
            className="rounded shadow-button pl-6 pr-8 py-5 
                bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 
                font-medium flex items-center justify-center overflow-y-hidden focus:outline-none
                focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md">
            <svg viewBox="5 -5 30 30" enableBackground="new 5 -5 30 30" className="w-6 h-6 mr-4 flex-shrink-0">
                {/* Google Logo */}
                <path
                    fill="#EA4335"
                    d="M15.3-4.2c3.3-1.1 7-1.1 10.3.1 1.8.7 3.5 1.7 4.9 3-.5.5-1 1-1.5 1.5-.9.9-1.9 1.8-2.8 
                    2.8-.9-.9-2.1-1.5-3.3-1.9-1.4-.4-3-.5-4.5-.2-1.7.4-3.3 1.2-4.6 2.5-1 1-1.8 2.2-2.2 
                    3.5-1.7-1.3-3.3-2.5-5-3.8 1.8-3.5 5-6.2 8.7-7.5z"/>
                <path
                    fill="#FBBC05"
                    d="M5.3 7c.3-1.3.7-2.6 1.3-3.7 1.7 1.3 3.3 2.5 5 3.8-.7 1.9-.7 4 0 5.8-1.7 1.3-3.3 2.5-5 3.8-1.5-2.9-2-6.4-1.3-9.7z" />
                <path
                    fill="#4285F4"
                    d="M20.3 7.2c4.8 0 9.6 0 14.4 0 .5 2.6.4 5.4-.4 8-.7 2.4-2 4.6-3.9 6.2-1.6-1.2-3.2-2.5-4.9-3.7
                     1.6-1.1 2.7-2.8 3.1-4.6-2.8 0-5.6 0-8.3 0 0-2 0-4 0-5.9z" />
                <path
                    fill="#34A853"
                    d="M6.6 16.7c1.7-1.3 3.3-2.5 5-3.8.6 1.8 1.9 3.5 3.5 4.6 1 .7 2.2 1.2 3.4 1.4 1.2.2 2.4.2 3.7 0
                    1.2-.2 2.4-.6 3.4-1.3 1.6 1.2 3.2 2.5 4.9 3.7-1.8 1.6-3.9 2.7-6.3
                    3.2-2.6.6-5.3.6-7.8-.1-2-.5-3.9-1.5-5.6-2.7-1.7-1.3-3.2-3-4.2-5z"/>
            </svg>
            Sign in with Google
        </div>
    )
}

function AnonymousIcon() {
    return (
        <div
            className="rounded shadow-button pl-6 pr-8 py-5 bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-gray-600
                dark:text-white dark:hover:bg-gray-500 font-medium flex items-center justify-center overflow-y-hidden
                focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 shadow-md">
            {/* Anonymous User Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sign in Anonymously
        </div>
    )
}

function AboutIcon() {
    return (
        <button
            className="text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500
                bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 px-4 py-1 z-10 rounded transition-all shadow-inner">
            {/* Information Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    )
}

const MoonIcon = () => {
    return (
        <div
            className="text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500
                bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 px-4 py-1 z-10 rounded transition-all shadow-inner">
            {/* Moon Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646
           3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </div>
    )
}

const SunIcon = () => {
    return (
        <div
            className="text-sm font-thin text-primary-500 hover:bg-gray-300 tracking-wide hover:bg-primary-500
                bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 px-4 py-1 z-10 rounded transition-all shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4
                 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
            </svg>
        </div>
    )
}

function SignInIcon() {
    return (
        <div
            className="text-sm font-thin text-primary-500 hover:bg-green-200 tracking-wide hover:bg-primary-500
                bg-gradient-to-r from-green-500 to-green-200 dark:text-white px-4 py-1 z-10 rounded transition-all shadow-inner">
            {/* Sign In Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5
                4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
        </div>
    )
}

function SignOutIcon() {
    return (
        <div
            className="text-sm font-thin text-primary-500 hover:bg-red-400 tracking-wide hover:bg-primary-500
                bg-gradient-to-r from-red-500 to-red-200 dark:text-white px-4 py-1 z-10 rounded transition-all shadow-inner">
            {/* Sign Out Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3
                3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        </div>
    )
}

function CloseIcon() {
    return (
        <div>
            {/* X Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    )
}

function EmojiIcon() {
    return (
        <div>
            {/* Emoji Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4
                 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    )
}

function SubmitIcon() {
    return (
        <div>
            {/* Submit Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </div>

    )
}

export { Logo, GoogleIcon, AnonymousIcon, AboutIcon, MoonIcon, SunIcon, SignInIcon, SignOutIcon, CloseIcon, EmojiIcon, SubmitIcon };