import React, { useRef, useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

interface CustomAudioPlayerProps {
  recordedAudio: Blob | null;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({
  recordedAudio,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (recordedAudio) {
      const url = URL.createObjectURL(recordedAudio);
      setAudioUrl(url);

      // Clean up the URL object after the component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [recordedAudio]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateProgress = () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      };

      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [audioRef]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = (audio.duration / 100) * parseFloat(e.target.value);
      audio.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className="flex w-full items-center">
      <div className="w-full flex items-center space-x-2">
        <button
          className={`p-2  text-black rounded-full`}
          onClick={handlePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={progress}
          className="w-full h-1 bg-gray-300 rounded-full cursor-pointer"
          onChange={handleSeek}
        />
      </div>
      <audio ref={audioRef} src={audioUrl} className="hidden" />
    </div>
  );
};

export default CustomAudioPlayer;
