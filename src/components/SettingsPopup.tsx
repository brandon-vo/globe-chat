import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDarkModeStore, useUserStore, useVolumeStore } from "../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import imageCompression from "browser-image-compression";
import { auth } from "../firebase";
import useSound from "use-sound";
import sounds from "../helpers/getSounds";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOffOutlined";

function SettingsPopup() {
  const { user, setUser } = useUserStore();
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
  const { isMuted, toggleMute } = useVolumeStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [switchSound] = useSound(sounds.switch, { volume: isMuted ? 0 : 1 });
  const [clickSound] = useSound(sounds.button2);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setEditorOpen(true);
  };

  const handleCropUpload = async () => {
    if (!editorRef.current) return;

    setEditorOpen(false);
    setLoading(true);
    setError(null);

    try {
      const canvas = editorRef.current.getImage();
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve),
      );

      if (!blob) {
        throw new Error("Failed to generate image blob");
      }

      const fileFromBlob = new File([blob], "profile_picture.jpg", {
        type: blob.type,
        lastModified: Date.now(),
      });

      const compressedImage = await imageCompression(fileFromBlob, {
        maxSizeMB: 1, // 1MB
        maxWidthOrHeight: 500,
        useWebWorker: true,
      });

      const storage = getStorage();
      const fileRef = ref(storage, `profile_pictures/${user?.uid}`);
      await uploadBytes(fileRef, compressedImage);

      const photoURL = await getDownloadURL(fileRef);

      if (user) {
        await updateProfile(auth.currentUser!, {
          photoURL,
        });

        setUser({
          ...user,
          photoURL,
        });
      }

      setLoading(false);
      setEditorOpen(false);
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
      setLoading(false);
    }
  };

  const darkModeToggle = () => {
    switchSound();
    toggleDarkMode();
  };

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
            </div>
          )}
        </>
      )}

      {/* Cropping Modal */}
      {editorOpen && file && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded-2xl shadow-lg">
            <h4 className="font-bold text-lg mb-4">Upload profile picture</h4>
            <AvatarEditor
              ref={editorRef}
              image={file}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
              scale={zoom}
            />
            <div className="mt-4 flex items-center">
              <label htmlFor="zoom-slider" className="mr-2">
                Zoom
              </label>
              <input
                id="zoom-slider"
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              {/* TODO: Make a button component */}
              <button
                onClick={() => setEditorOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCropUpload}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
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
