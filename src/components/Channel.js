import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import Message from './Message';
const Channel = ({ user = null, db = null }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessages] = useState('');

    const { uid, displayName, photoURL } = user;

    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection('messages')
                .orderBy('createdAt', 'desc')
                // .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMessages(data);
                })

            return unsubscribe;
        }
    }, [db]);

    const handleOnChange = e => {
        setNewMessages(e.target.value);
    };

    const handleOnSubmit = e => {
        // Check if message contains over 2000 characters
        if (newMessage.length > 2000) {
            return alert('You cannot send a message that is longer than 2000 characters')
        }
        e.preventDefault();

        // Adding to messages collection
        if (db) {
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        setNewMessages('') // Clear text after submit
    }

    const upload = () => {
        alert('This feature is not implemented')
    }

    return (
        <div className="py-4 max-w-screen-lg mx-auto">
            <>
                <div className="mb-6 mx-4">
                    <form
                        onSubmit={handleOnSubmit}
                        className="flex flex-row bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md px-6 py-3 z-10 max-w-screen-lg mx-auto shadow-md">
                        <input
                            ref={inputRef}
                            type="text"
                            value={newMessage}
                            onChange={handleOnChange}
                            placeHolder='type to send a message...'
                            className="flex-1 bg-transparent outline-none"
                        />
                        <button type="button"
                            onClick={upload}
                            className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 py-px focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </button>
                        <button type="submit"
                            disabled={!newMessage}
                            className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 py-px">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </form>
                </div>
                <ul>
                    {messages.map(message => (
                        <li key={message.id}>
                            <Message {...message} />
                        </li>
                    ))}
                </ul>
            </>
        </div>
    );
};

export default Channel;