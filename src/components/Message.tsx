import { formatRelative } from "date-fns";
import useSound from "use-sound";
import sounds from "../helpers/getSounds";
import verifiedIcon from "../assets/images/verifiedBadge.png";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
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

  const verifiedUserIDs: string[] = [
    "3y8XlQiLCscOR3uQ7UwrSCHgF932",
    "GJTtKYbJG8M2ag3rJdVSpHCGWMz2",
    "5n86oOReOGQX4M8b1Lb3jivjKRT2",
    "S8FGjp8ZmmRTnGbW87aN3S3RaVT2",
  ];
  if (uid && verifiedUserIDs.includes(uid)) {
    verified = true;
  }

  const isCurrentUserMessage = uid === currentUserUid;
  const isBrandon = currentUserUid === "3y8XlQiLCscOR3uQ7UwrSCHgF932";

  return (
    <div className="mx-2 px-4 py-4 rounded-md hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600 overflow-hidden flex items-start group">
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full mr-5"
        />
      ) : null}
      <div className="w-full flex">
        <div className="w-full">
          <div className="flex items-center mb-1">
            {displayName ? (
              <p className="mr-2 text-primary-500">{displayName}</p>
            ) : null}
            {verified ? (
              <div className="-ml-1 mr-2">
                <img src={verifiedIcon} width={15} height={15} alt="Verified" />
              </div>
            ) : null}
            {createdAt?.seconds ? (
              <span className="text-gray-600 dark:text-gray-400 text-xs">
                {formatDate(new Date(createdAt.seconds * 1000))}
              </span>
            ) : null}
          </div>
          <p
            className={`break-all ${uid === "3y8XlQiLCscOR3uQ7UwrSCHgF932" && "text-green-500"}`}
          >
            {text}
          </p>
        </div>
        {(isCurrentUserMessage || isBrandon) && (
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
