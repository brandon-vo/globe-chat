import { useDarkModeStore, useUserStore, useVolumeStore } from "../store";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import useSound from "use-sound";
import sounds from "../helpers/getSounds";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOffOutlined";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function SettingsPopup() {
  const { user, setUser } = useUserStore();
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
  const { isMuted, toggleMute } = useVolumeStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [switchSound] = useSound(sounds.switch, { volume: isMuted ? 0 : 1 });
  const [clickSound] = useSound(sounds.button2);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB. Please select a smaller file.");
      return;
    }

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const storage = getStorage();
      const fileRef = ref(storage, `profile_pictures/${user?.uid}`);

      // Upload the file
      await uploadBytes(fileRef, file);

      const photoURL = await getDownloadURL(fileRef);

      if (user) {
        await updateProfile(auth.currentUser!, {
          photoURL: photoURL,
        });

        setUser({
          ...user,
          photoURL: photoURL,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to update profile picture.");
      setLoading(false);
    }
  };

  // Toggle between dark mode and light mode
  const darkModeToggle = () => {
    switchSound();
    toggleDarkMode();
  };

  // Toggle mute state
  const muteToggle = () => {
    clickSound();
    toggleMute();
  };

  return (
    <div className="m-2">
      <h3 className="font-bold text-2xl mb-4">Settings</h3>
      {user && (
        <>
          <div className="flex items-center space-x-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl text-white">?</span>
              </div>
            )}
            <p className="font-semibold">{user?.displayName}</p>
          </div>
          {user?.isAnonymous ? (
            <p className="text-gray-500 dark:text-gray-200 mt-4">
              Sign in with Google to change your profile picture
            </p>
          ) : (
            <div className="mt-4">
              <label className="block font-medium">
                Change Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {fileName && !error && !loading && (
                <p className="text-gray-500 mt-2">Selected file: {fileName}</p>
              )}
            </div>
          )}
        </>
      )}
      {/* Dark mode */}
      <div className="flex items-center justify-between mt-6">
        <p className="font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
        <button onClick={darkModeToggle}>
          {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </div>

      {/* Mute toggle */}
      <div className="flex items-center justify-between mt-6">
        <p className="font-medium">{isMuted ? "Volume Off" : "Volume On"}</p>
        <button onClick={muteToggle}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </button>
      </div>
    </div>
  );
}

export default SettingsPopup;
