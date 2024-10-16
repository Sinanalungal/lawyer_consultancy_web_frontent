import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSmile, FiPaperclip, FiMic, FiSend } from "react-icons/fi";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { fetchThreadMessages, fetchThreads } from "../../../services/Chat";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { AppDispatch, RootState, useAppSelector } from "../../../redux/store";
import { fetchUserAsync } from "../../../redux/slice/UserDataFetch";
import { motion, AnimatePresence } from "framer-motion";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioStart, setAudioStart] = useState<boolean>(false);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [contentType, setContentType] = useState<"text" | "file" | "audio">(
    "text"
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { registered } = useSelector((state: any) => state.register);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const { isAuthenticated, value } = useSelector((state: any) => state.login);
  const navigate = useNavigate();
  const recorderControls = useAudioRecorder();
  const dispatch: AppDispatch = useDispatch();
  console.log(userDetail, "this is the user detail");

  useEffect(() => {
    if (registered) {
      navigate("/register");
    }
    const authTokens = localStorage.getItem("authTokens");
    if (!isAuthenticated && !authTokens) {
      navigate(-5);
    }
  }, [isAuthenticated, registered, navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedUser?.id !== undefined) {
          const result = await fetchThreadMessages(selectedUser.id);
          console.log(result, "these are the user messages");
          setMessages(result);
        } else {
          console.warn("Selected user ID is undefined.");
        }
      } catch (error) {
        console.error("Something went wrong with thread fetching.");
      }
    };

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);
  useEffect(() => {
    let loc = window.location;
    const url = "localhost:8000";
    let wsStart = "ws://";

    if (loc.protocol === "https:") {
      wsStart = "wss://";
    }

    const path = "/chat/";

    let endpoint = wsStart + url + `${path}${value}/`;

    const newSocket = new WebSocket(endpoint);
    setSocket(newSocket);

    newSocket.onopen = (e) => {
      console.log("WebSocket connected:", e);
    };

    newSocket.onmessage = (e) => {
      const receivedMessage = JSON.parse(e.data);
      if (receivedMessage.type == 'chat_message'){
        const receivedMessage_data = JSON.parse(receivedMessage.data);
        console.log(receivedMessage_data, "latest received msg");
        setMessages((prevMessages) => [...prevMessages, receivedMessage_data]);
      }else if(receivedMessage.type == 'add_thread'){
        const receivedThread_data = JSON.parse(receivedMessage.data);
        console.log(receivedThread_data, "latest received thread");
        setUsers((prevUsers) => [...prevUsers, receivedThread_data]);
      }
    };

    newSocket.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    newSocket.onclose = (e) => {
      console.log("WebSocket closed:", e);
    };

    const ThreadFetching = async () => {
      try {
        const result = await fetchThreads();
        console.log(result, "these are the users");

        setUsers(result);
      } catch (error) {
        console.error("Something went wrong with thread fetching.");
      }
    };
    ThreadFetching();
    dispatch(fetchUserAsync());
    return () => {
      newSocket.close();
    };
  }, []);

  // useEffect()=>

  const handleSendMessage = () => {
    if (!selectedUser) return;

    // Handle text message
    if (inputText.trim() && contentType === "text" && socket) {
      let data = {
        sent_by: value,
        send_to: Number(selectedUser.other_user.id),
        text: inputText,
        thread: selectedUser.id,
        content_type: contentType,
      };
      let dataValue = JSON.stringify(data);
      socket.send(dataValue);
      setInputText("");
    }

    // Handle audio message
    if (contentType === "audio" && recorderControls.recordingBlob && socket) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result === "string") {
          // Convert the result to base64 and add to the data
          const base64Data = result.split(",")[1];
          let data = {
            sent_by: value,
            send_to: Number(selectedUser.other_user.id),
            thread: selectedUser.id,
            content_type: contentType,
            audio: base64Data, // Add the blob as base64
          };

          // Send the data with the base64-encoded blob
          let dataValue = JSON.stringify(data);
          socket.send(dataValue);
        } else {
          console.error("FileReader did not return a string result.");
        }
      };

      // Trigger the FileReader to read the blob as a Data URL
      reader.readAsDataURL(recorderControls.recordingBlob as Blob);
    }

    // Reset states
    setAudioStart(false);
    setAudioPreview(null);
    setShowEmojiPicker(false);
    setContentType("text");
  };

  const handleEmojiClick = (emojiObject: any) => {
    setInputText((prevInputText) => prevInputText + emojiObject.emoji);
    setShowEmojiPicker(false);
    setContentType("text");
  };

  const handleClose = () => {
    setAudioStart(false);
    setAudioPreview(null);
    recorderControls.recordingBlob = undefined;
    setContentType("text"); // Reset contentType
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      console.log("File selected:", file);
      setContentType("file"); // Set contentType to file
      // Handle file upload here
    }
  };

  const TimeDateFormate = (time: string) => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString();

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
                    : user.last_message.content_type || "Unknown content type"
                  : ""}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
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
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800"
                          }`}
                        >
                          {message.content_type === "audio" ? (
                            <audio
                              controls
                              src={message.audio}
                              className="max-w-full"
                            >
                              Your browser does not support the audio element.
                            </audio>
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
          </div>

          <div className="p-4 bg-white border-t border-gray-300">
            <AnimatePresence>
              {showEmojiPicker && !audioStart && (
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

            <div
              className={`flex items-center gap-3 border border-gray-300 py-2 px-4 rounded-full relative ${
                audioStart && "bg-red-50"
              }`}
            >
              {!audioStart ? (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FiPaperclip size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                  />

                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FiSmile size={20} />
                  </button>

                  {!audioPreview ? (
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
                  ) : (
                    <div className="flex flex-1 items-center">
                      <audio
                        controls
                        src={audioPreview}
                        className="w-full"
                      >
                        Your browser does not support the audio element.
                      </audio>
                      <button
                        onClick={handleClose}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  <button
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    onClick={handleSendMessage}
                  >
                    <FiSend size={20} />
                  </button>
                </>
              ) : (
                <div className="flex-1 flex justify-center items-center">
                  <AudioRecorder
                    onRecordingComplete={(blob) => {
                      setAudioPreview(URL.createObjectURL(blob));
                      setAudioStart(false);
                      setContentType("audio");
                    }}
                    recorderControls={recorderControls}
                    showVisualizer
                  />
                </div>
              )}

              {!audioStart && (
                <button
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => {
                    setAudioStart(true);
                    setContentType("audio");
                  }}
                >
                  <FiMic size={20} />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-700">
          <p className="text-lg">Select a user to start chatting</p>
        </div>
      )}
    </motion.div>
  </div>
  );
};

export default ChatComponent;
