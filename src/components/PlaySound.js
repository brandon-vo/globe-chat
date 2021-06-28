import Sound from 'react-sound';
import MessageSound from '../assets/message.wav';

const PlaySound = (
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
) => {
    return (
        <div>
            <Sound
                url={MessageSound}
                playStatus={Sound.status.PLAYING}
                playFromPosition={0}
                onLoading={handleSongLoading}
                onPlaying={handleSongPlaying}
                onFinishedPlaying={handleSongFinishedPlaying} />

        </div>
    )
}

export {PlaySound}