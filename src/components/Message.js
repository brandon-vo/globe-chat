import React from 'react';
import { formatRelative } from 'date-fns';

// Date formatting using the date-fns library
const formatDate = date => {
    let formattedDate = '';
    if (date) {
        formattedDate = formatRelative(date, new Date()); // New formatted date
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalize first character
    }
    return formattedDate;
};

// Message Format
const Message = ({
    createdAt = '',
    text = '',
    displayName = '',
    photoURL = '',
}) => {

    return (
        <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600 overflow-hidden flex items-start">
            {photoURL ? (
                <img src={photoURL}
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="rounded-full mr-5" />
            ) : null}
            <div>
                <div className="flex items-center mb-1">
                {displayName ? (
                    <p className="mr-2 text-primary-500">{displayName}</p>
                ) : null}
                {createdAt?.seconds ? (
                    <span className="text-gray-600 dark:text-gray-400 text-xs">
                        {formatDate(new Date(createdAt.seconds * 1000))}
                    </span>
                ) : null}
                </div>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Message;