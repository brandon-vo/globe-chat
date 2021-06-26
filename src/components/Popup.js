import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function About(props) {

    const popupRef = useRef()

    // Popup animation
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: props.trigger ? 1 : 0,
    })

    // Exiting popup menu by clicking out of region or pressing escape key
    // eslint-disable-next-line
    const closePopUp = e => {
        if (popupRef.current === e.target) {
            props.setTrigger(false)
        }
        else if (e.key === 'Escape') {
            props.setTrigger(false)
        }
    }

    // Reading escape key
    useEffect(() => {
        document.addEventListener('keydown', closePopUp);
        return () => document.removeEventListener('keydown', closePopUp)
    }, [closePopUp])

    return (props.trigger) ? (
        <animated.div style={animation}>
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50" ref={popupRef} onClick={closePopUp}>
                <div className="p-6 relative text-black bg-white dark:text-white dark:bg-gray-700 max-w-xl rounded-2xl">
                    <button className="absolute top-5 right-5" onClick={() => props.setTrigger(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {props.children}
                </div>
            </div>
        </animated.div>
    ) : "";
}

export default About
