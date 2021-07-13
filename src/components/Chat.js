import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Message from './Message';
import { EmojiIcon, SubmitIcon } from './Icon';
import useSound from 'use-sound';
import messageSfx from '../assets/message.wav';
import clickSfx from '../assets/click.wav';

const Chat = ({ user = null, db = null }) => {

    // Messages
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState('');

    // Sounds
    const [messageSound] = useSound(messageSfx, { volume: 0.4 });
    const [playbackRate, setPlaybackRate] = useState(0.75);
    const [emojiSound] = useSound(clickSfx, {
        playbackRate,
        volume: 0.5,
    });

    // User
    const { uid, displayName, photoURL } = user;

    // Listen to all messages
    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(50)
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

    // Sending a message
    const sendMessage = async (e) => {
        // Check if message contains over 1000 characters
        if (formValue.length > 1000) return alert('You cannot send a message that is longer than 1000 characters')

        // Check if message is empty
        if (!formValue.trim().length) return alert('You cannot send an empty message')

        e.preventDefault();

        // Adding to messages collection
        if (db) {
            await db.collection('messages').add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        setFormValue('') // Clear text after submit
        messageSound()
    }

    // Clicking the emoji button
    const emojiClick = () => {
        setPlaybackRate(playbackRate + 0.1);
        emojiSound();
    }

    return (
        <div className="py-4 max-w-screen-lg mx-auto">
            <div className="mb-6 mx-4">
                <form
                    onSubmit={sendMessage}
                    className="flex flex-row bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md px-6 py-3 z-10 max-w-screen-lg mx-auto shadow-md">
                    <input
                        type="text"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeHolder='type to send a message...'
                        className="flex-1 bg-transparent outline-none"
                    />
                    <button type="button"
                        onClick={emojiClick}
                        className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white
                             dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 py-px focus:outline-none">
                        <EmojiIcon />
                    </button>
                    <button type="submit"
                        disabled={!formValue}
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
        </div>
    );
};

export default Chat;