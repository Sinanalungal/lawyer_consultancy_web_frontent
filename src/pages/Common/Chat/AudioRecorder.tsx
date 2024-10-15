import React, {  useRef, useState } from 'react';
import { FiMic, FiStopCircle, FiPauseCircle, FiPlayCircle } from 'react-icons/fi';

interface VoiceRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
  audioStart: (bool: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAudioRecorded, audioStart }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null); // Reference to the media stream

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const recordedBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        onAudioRecorded(recordedBlob);
        chunksRef.current = []; // Clear the chunks for the next recording
        // Stop the stream and release the microphone
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      audioStart(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Optionally add error handling UI/logic here
      alert('Microphone access is required to record audio.');
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      mediaRecorderRef.current?.resume();
      setIsPaused(false);
    } else {
      mediaRecorderRef.current?.pause();
      setIsPaused(true);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center space-x-2 justify-end w-full">
      {isRecording ? (
        <div className='w-full flex'>
          {isPaused ? (
            <FiPlayCircle size={24} onClick={handlePauseResume} />
          ) : (
            <FiPauseCircle size={24} onClick={handlePauseResume} />
          )}
          <FiStopCircle size={24} onClick={stopRecording} />
        </div>
      ) : (
        <FiMic
          size={22}
          className="text-gray-600"
          onClick={startRecording}
        />
      )}
    </div>
  );
};

export default VoiceRecorder;
