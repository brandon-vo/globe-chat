import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { formatRelative } from "date-fns";
import useSound from "use-sound";
import { admin } from "../constants/roles";
import verifiedUserIDs from "../constants/verifiedUserIDs";
import sounds from "../helpers/getSounds";
import { useVolumeStore } from "../store";

// Date formatting using the date-fns library
const formatDate = (date: Date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date()); // New formatted date
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalize first character
  }
  return formattedDate;
};

interface MessageProps {
  createdAt?: any;
  text?: string;
  displayName?: string;
  photoURL?: string;
  uid?: string;
  verified?: boolean;
  currentUserUid: string;
  confirmDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    messageID: string,
  ) => void;
  messageID: string;
}

// Message Format
const Message = ({
  createdAt,
  text,
  displayName,
  photoURL,
  uid,
  verified = false,
  currentUserUid,
  confirmDelete,
  messageID,
}: MessageProps) => {
  const { isMuted } = useVolumeStore();

  const [deleteSound] = useSound(sounds.button2, { volume: isMuted ? 0 : 0.5 });
  const [clickSound] = useSound(sounds.button3, { volume: isMuted ? 0 : 0.5 });

  if (uid && verifiedUserIDs.includes(uid)) {
    verified = true;
  }

  const isCurrentUserMessage = uid === currentUserUid;
  const isAdmin = admin.includes(currentUserUid);

  return (
    <div className="mx-2 px-4 py-4 rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 overflow-hidden flex items-start group">
      <img
        src={
          photoURL?.includes("/static/media/")
            ? "assets/images/avatars/avatar-1.jpg"
            : photoURL
        }
        alt="Avatar"
        className="rounded-full object-cover flex-shrink-0 w-12 h-12 mr-4"
      />
      <div className="w-full flex">
        <div className="w-full">
          <div className="flex items-center mb-1">
            {displayName && (
              <p className="text-primary-500 mr-2">{displayName}</p>
            )}
            {uid?.toLowerCase().includes("ai") && (
              <div className="text-xs px-2 py-1/2 rounded-md mr-2 bg-gradient-to-tl from-purple-400 to-red-300 shadow-sm text-white">
                AI
              </div>
            )}
            {verified && (
              <div className="-ml-1 mr-2">
                <img
                  src="assets/images/verifiedBadge.png"
                  width={15}
                  height={15}
                  alt="Verified"
                />
              </div>
            )}
            {createdAt?.seconds && (
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {formatDate(new Date(createdAt.seconds * 1000))}
              </span>
            )}
          </div>
          <div className="w-full pr-4">
            <p
              className={`break-words ${uid && admin.includes(uid) && "text-green-500"}`}
            >
              {text}
            </p>
          </div>
        </div>
        {(isCurrentUserMessage || isAdmin) && (
          <div className="flex items-center">
            <div className="w-8">
              <button
                onClick={(e) => {
                  e.shiftKey ? deleteSound() : clickSound();
                  confirmDelete(e, messageID);
                }}
                className="ml-auto mr-3 hidden group-hover:block"
              >
                <DeleteOutlineOutlined />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
