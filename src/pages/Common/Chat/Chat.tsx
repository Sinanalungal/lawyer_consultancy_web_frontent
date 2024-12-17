import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSmile, FiMic, FiSend, FiX } from "react-icons/fi";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { fetchThreadMessages, fetchThreads } from "../../../services/Chat";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { AppDispatch, RootState, useAppSelector } from "../../../redux/store";
import { fetchUserAsync } from "../../../redux/slice/UserDataFetch";
import { motion, AnimatePresence } from "framer-motion";
import { SyncLoader } from "react-spinners";
import './chat.css';

interface Message {
  id: number;
  message: string;
  audio: string;
  image: string;
  video: string;
  send_by: Number;
  timestamp?: string;
  thread: Number;
  content_type: string;
}

interface User {
  id: number;
  other_user: {
    full_name: string;
    id: number;
    profile_image: string;
  };
  last_message: {
    content_type: string;
    id: Number;
    message: string;
    send_by: Number;
    thread: Number;
    timestamp: string;
  };
  profile_image: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [audioRecordingState, setAudioRecordingState] = useState<"idle" | "recording" | "preview">("idle");
  const [audioPreview, setAudioPreview] = useState<string | undefined>(undefined);
  const [contentType, setContentType] = useState<"text" | "file" | "audio">("text");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Loading and error states
  const [isLoadingThreads, setIsLoadingThreads] = useState<boolean>(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [threadsError, setThreadsError] = useState<string | null>(null);
  const [messagesError, setMessagesError] = useState<string | null>(null);

  const { registered } = useSelector((state: any) => state.register);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const { isAuthenticated, value } = useSelector((state: any) => state.login);
  const navigate = useNavigate();
  const recorderControls = useAudioRecorder();
  const dispatch: AppDispatch = useDispatch();

  // Spinner and error styles
  const spinnerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const errorStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "red",
    textAlign: "center",
    padding: "20px",
  };

  // Authentication and routing effect
  useEffect(() => {
    if (registered) {
      navigate("/register");
    }
    const authTokens = localStorage.getItem("authTokens");
    if (!isAuthenticated && !authTokens) {
      navigate(-5);
    }
  }, [isAuthenticated, registered, navigate]);

  // Fetch messages for selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?.id) return;

      try {
        setIsLoadingMessages(true);
        setMessagesError(null);
        const result = await fetchThreadMessages(selectedUser.id);
        setMessages(result);
      } catch (error) {
        console.error("Error fetching thread messages:", error);
        setMessagesError("Failed to load messages. Please try again.");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  // WebSocket and threads setup
  useEffect(() => {
    let loc = window.location;
    const url = `${import.meta.env.VITE_WEBSOCKET_URL}`;
    let wsStart = "wss://";

    if (loc.protocol === "https:") {
      wsStart = "wss://";
    }

    const path = "/chat/";
    let endpoint = wsStart + url + `${path}${value}/`;

    const newSocket = new WebSocket(endpoint);
    setSocket(newSocket);

    newSocket.onopen = (e:any) => {
      console.log("WebSocket connected:", e);
    };

    newSocket.onmessage = (e:any) => {
      const receivedMessage = JSON.parse(e.data);
      if (receivedMessage.type == 'chat_message'){
        const receivedMessage_data = JSON.parse(receivedMessage.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage_data]);
      }else if(receivedMessage.type == 'add_thread'){
        const receivedThread_data = JSON.parse(receivedMessage.data);
        setUsers((prevUsers) => [...prevUsers, receivedThread_data]);
      }
    };

    newSocket.onerror = (e:any) => {
      console.error("WebSocket error:", e);
    };

    newSocket.onclose = (e:any) => {
      console.log("WebSocket closed:", e);
    };

    const ThreadFetching = async () => {
      try {
        setIsLoadingThreads(true);
        setThreadsError(null);
        const result = await fetchThreads();
        setUsers(result);
      } catch (error) {
        console.error("Something went wrong with thread fetching:", error);
        setThreadsError("Failed to load chat threads. Please try again.");
      } finally {
        setIsLoadingThreads(false);
      }
    };
    
    ThreadFetching();
    dispatch(fetchUserAsync());
    
    return () => {
      newSocket.close();
    };
  }, []);

  // Enhanced message sending method
  const handleSendMessage = () => {
    if (!selectedUser || !socket) return;

    // Handle text message
    if (inputText.trim() && contentType === "text") {
      const data = {
        sent_by: value,
        send_to: Number(selectedUser.other_user.id),
        text: inputText,
        thread: selectedUser.id,
        content_type: contentType,
      };
      socket.send(JSON.stringify(data));
      setInputText("");
    }

    // Handle audio message
    if (contentType === "audio" && audioPreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const result = reader.result;
          if (typeof result !== "string") {
            throw new Error("Invalid audio file format");
          }

          const base64Data = result.split(",")[1];
          if (!base64Data) {
            throw new Error("Failed to convert audio to base64");
          }

          const data = {
            sent_by: value,
            send_to: Number(selectedUser.other_user.id),
            thread: selectedUser.id,
            content_type: "audio",
            audio: base64Data, 
          };

          socket.send(JSON.stringify(data));

          // Reset audio-related states
          setAudioRecordingState("idle");
          setAudioPreview(undefined);
          setContentType("text");
        } catch (error) {
          console.error("Error sending audio message:", error);
          alert("Failed to send audio message. Please try again.");
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        alert("Error processing audio file.");
      };

      // Convert blob to base64
      reader.readAsDataURL(recorderControls.recordingBlob as Blob);
    }
  };

  // Emoji handling
  const handleEmojiClick = (emojiObject: any) => {
    setInputText((prevInputText) => prevInputText + emojiObject.emoji);
    setShowEmojiPicker(false);
    setContentType("text");
  };

  // Date and time formatting
  const TimeDateFormate = (time: string) => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  // Scroll to bottom ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Audio recording and preview handlers
  const handleStartAudioRecording = () => {
    setAudioRecordingState("recording");
    setContentType("audio");
    recorderControls.startRecording();
  };

  const handleCancelAudioRecording = () => {
    setAudioRecordingState("idle");
    setAudioPreview(undefined);
    recorderControls.stopRecording();
    setContentType("text");
  };
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col ${
          selectedUser
            ? "max-md:hidden md:w-1/3 lg:w-1/4"
            : "w-full md:w-1/3 lg:w-1/4"
        } bg-white border-r border-gray-300 shadow-md`}
      >
        <div className="p-4 border-b border-gray-300 bg-gray-50">
          <h3 className="text-xl font-semibold px-2 text-gray-800">Chats</h3>
        </div>

        {isLoadingThreads ? (
          <div style={spinnerStyle} >
          <SyncLoader  color="#808080"  size={4}/>
        </div>
        ) : threadsError ? (
          <div style={errorStyle}>
            <p>{threadsError}</p>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto">
            {users?.map((user) => (
              <motion.li
                key={user?.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                  selectedUser?.id === user.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={
                    user?.other_user.profile_image ??
                    "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                  }
                  alt={user?.other_user.full_name}
                  className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200"
                />
                <div className="grid">
                  <h4 className="text-sm font-medium text-gray-800">
                    {user?.other_user.full_name.toUpperCase()}
                  </h4>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {user?.last_message
                      ? user.last_message.content_type === "text"
                        ? user.last_message.message ||
                          "No message content available"
                        : user.last_message.content_type ||
                          "Unknown content type"
                      : ""}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col ${
          selectedUser
            ? "w-full md:w-2/3 lg:w-3/4"
            : "max-md:hidden md:w-2/3 lg:w-3/4"
        } bg-gray-100`}
      >
        {selectedUser ? (
          <>
            <div className="flex items-center p-4 border-b border-gray-300 bg-white shadow-sm">
              {selectedUser && (
                <>
                  <img
                    src={
                      selectedUser?.other_user.profile_image ??
                      "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                    }
                    alt={selectedUser?.other_user.full_name}
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {selectedUser?.other_user.full_name.toUpperCase()}
                    </h4>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {isLoadingMessages ? (
                <div style={spinnerStyle}>
                  <SyncLoader  color="#312e81" size={7} />
                </div>
              ) : messagesError ? (
                <div style={errorStyle}>
                  <p>{messagesError}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages?.map((message, index) => {
                    const { formattedDate, formattedTime } = TimeDateFormate(
                      message.timestamp as string
                    );
                    const showDate =
                      index === 0 ||
                      formattedDate !==
                        new Date(
                          messages[index - 1].timestamp as string
                        ).toLocaleDateString();

                    return (
                      <React.Fragment key={index}>
                        {showDate && (
                          <div className="text-center my-2">
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700 text-xs">
                              {formattedDate}
                            </span>
                          </div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex gap-2.5 ${
                            message.send_by === value
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {message.send_by === selectedUser.other_user.id && (
                            <img
                              src={
                                selectedUser.other_user.profile_image ??
                                "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                              }
                              alt="Second User"
                              className="w-8 h-8 object-cover rounded-full"
                            />
                          )}
                          <div
                            className={`flex flex-col max-w-[70%] ${
                              message.send_by === value
                                ? "items-end"
                                : "items-start"
                            }`}
                          >
                            <div
                              className={`px-4 py-2 rounded-lg shadow-sm ${
                                message.send_by === value
                                  ? "bg-gray-200  text-gray-800"
                                  : "bg-white text-gray-800"
                              }`}
                            >
                              {message.content_type === "audio" ? (
                                ( message.send_by === value ?<audio
                                  controls
                                  src={message.audio}
                                  className="max-w-full audio-player-sender "
                                >
                                  Your browser does not support the audio
                                  element.
                                </audio>:<audio
                                  controls
                                  src={message.audio}
                                  className="max-w-full audio-player-reciever "
                                >
                                  Your browser does not support the audio
                                  element.
                                </audio>)
                              ) : message.content_type === "" ? (
                                <a
                                  href={message.image}
                                  download
                                  className="text-blue-300 hover:underline"
                                >
                                  Download File
                                </a>
                              ) : (
                                <p className="text-sm break-words">
                                  {message.message}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              {formattedTime}
                            </span>
                          </div>
                          {message.send_by === value && (
                            <img
                              src={
                                userDetail?.profile_image ??
                                "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                              }
                              alt="User Avatar"
                              className="w-8 h-8 object-cover rounded-full"
                            />
                          )}
                        </motion.div>
                      </React.Fragment>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            <div className="p-4 bg-white border-t border-gray-300">
        <AnimatePresence>
          {showEmojiPicker && audioRecordingState === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-4 z-10"
            >
              <EmojiPicker
                emojiStyle={EmojiStyle.APPLE}
                onEmojiClick={handleEmojiClick}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 py-1 px-4 rounded-full">
          {audioRecordingState === "idle" && (
            <>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiSmile size={20} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setContentType("text");
                }}
                className="flex-1 text-sm border-none outline-none text-gray-800 bg-transparent placeholder-gray-400"
                placeholder="Type a message..."
              />

              <button
                className="bg-[#312e81] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                onClick={handleSendMessage}
              >
                <FiSend size={20} />
              </button>

              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleStartAudioRecording}
              >
                <FiMic size={20} />
              </button>
            </>
          )}

          {audioRecordingState === "recording" && (
            <div className="flex-1 flex justify-center items-center">
              <AudioRecorder
                onRecordingComplete={(blob) => {
                  const audioUrl = URL.createObjectURL(blob);
                  setAudioPreview(audioUrl);
                  setAudioRecordingState("preview");
                }}
                recorderControls={recorderControls}
                showVisualizer
              />
            </div>
          )}

          {audioRecordingState === "preview" && (
            <div className="flex flex-1 items-center space-x-2">
              <audio controls src={audioPreview} className="w-full audio-playback">
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={handleCancelAudioRecording}
                className="text-red-500 hover:text-red-700"
              >
                <FiX size={24} />
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-[#312e81]  p-2 rounded-full text-white"
              >
                <FiSend size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-700">
            <p className="sm:text-base text-xs">Select a user to start chatting</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatComponent;
