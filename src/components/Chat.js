import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import Message from './Message';
import { UploadIcon, SubmitIcon } from './Icon';

const Chat = ({ user = null, db = null }) => {

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
                            className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white
                             dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 py-px focus:outline-none">
                            <UploadIcon />
                        </button>
                        <button type="submit"
                            disabled={!newMessage}
                            className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white
                             dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 py-px">
                            <SubmitIcon />
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

export default Chat;