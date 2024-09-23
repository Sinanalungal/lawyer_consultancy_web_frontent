import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSmile, FiPaperclip } from "react-icons/fi";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { fetchThreadMessages, fetchThreads } from "../../../services/Chat";
import ClipLoader from "react-spinners/ClipLoader";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { AppDispatch, RootState, useAppSelector } from "../../../redux/store";
import { fetchUserAsync } from "../../../redux/slice/UserDataFetch";

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

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div
        className={`flex flex-col ${
          selectedUser
            ? "max-md:hidden md:w-1/3 lg:w-1/4"
            : "w-full md:w-1/3 lg:w-1/4"
        } bg-white border-r border-gray-300`}
      >
        <div className="p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold px-2">Chats</h3>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {users?.map((user) => (
            <li
              key={user?.id}
              className={`flex items-center p-3 px-6 cursor-pointer hover:bg-gray-100 ${
                selectedUser?.id === user.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={
                  user?.other_user.profile_image ??
                  "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                }
                alt={user?.other_user.full_name}
                className="w-10 h-10 rounded-full mr-3 "
              />
              <div className="grid">
                <h4 className="text-sm font-medium">
                  {user?.other_user.full_name.toUpperCase()}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {user?.last_message
                    ? user.last_message.content_type === "text"
                      ? user.last_message.message ||
                        "No message content available"
                      : user.last_message.content_type || "Unknown content type"
                    : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`flex flex-col ${
          selectedUser
            ? "w-full md:w-2/3 lg:w-3/4"
            : "max-md:hidden md:w-2/3 lg:w-3/4"
        } bg-gray-100`}
      >
        {selectedUser ? (
          <>
            <div className="flex items-center p-4 border-b border-gray-300 bg-white">
              {selectedUser && (
                <>
                  <img
                    src={
                      selectedUser?.other_user.profile_image ??
                      "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                    }
                    alt={selectedUser?.other_user.full_name}
                    className="w-10 h-10 rounded-full mr-3 "
                  />
                  <h4 className="text-lg font-semibold">
                    {selectedUser?.other_user.full_name.toUpperCase()}
                  </h4>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
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
                    <>
                      {" "}
                      {showDate && (
                        <div className="text-center my-2">
                          <span className="bg-slate-200 px-2 text-gray-700 text-[9px] py-1 rounded-lg">
                            {formattedDate}
                          </span>
                        </div>
                      )}
                      <div
                        key={index}
                        className={`flex  gap-2.5 ${
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
                            className="w-10 max-sm:h-8 max-sm:w-8 h-10 object-cover rounded-full"
                          />
                        )}
                        <div
                          className={`flex flex-col  max-w-[80%] ${
                            message.send_by === value
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <div
                            className={`px-3 ws  py-2 rounded ${
                              message.send_by === value
                                ? "bg-slate-300 rounded text-gray-800"
                                : "bg-gray-300 text-gray-900"
                            }`}
                          >
                            {message.content_type == "audio" ? (
                              <audio
                                controls
                                src={message.audio}
                                className="max-sm:w-[150px] "
                                typeof="audio/mp3"
                              >
                                Your browser does not support the audio element.
                              </audio>
                            ) : message.content_type == "" ? (
                              <a
                                href={message.image}
                                download
                                className="text-blue-500"
                              >
                                {/* Download File */}
                              </a>
                            ) : message.content_type == "text" ? (
                              <h2 className="text-sm font-normal leading-snug max-sm:text-xs break-words">
                                {message.message}
                              </h2>
                            ) : (
                              <h2 className="text-sm font-normal leading-snug max-sm:text-xs">
                                {/* {message.text} */}
                              </h2>
                            )}
                          </div>
                          <div className="justify-end items-center inline-flex">
                            <h6 className="text-[9px] font-normal leading-4 py-1 text-gray-500">
                              {formattedTime}
                            </h6>
                          </div>
                        </div>
                        {message.send_by === value && (
                          <img
                            src={
                              userDetail?.profile_image ??
                              "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                            }
                            alt="User Avatar"
                            className="w-10 max-sm:h-8 max-sm:w-8 h-10 object-cover rounded-full"
                          />
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="p-3 relative">
              {showEmojiPicker && !audioStart && (
                <div className="absolute bottom-16 max-[400px]:hidden max-h-screen  overflow-scroll  max-md:left-0 ">
                  <EmojiPicker
                    emojiStyle={EmojiStyle.APPLE}
                    // theme="light"
                    onEmojiClick={handleEmojiClick}
                  />
                </div>
              )}

              <div
                className={`flex items-center gap-3  border-gray-300 py-1 sm:px-3 px-2 rounded-full relative ${
                  (!audioStart || audioPreview) && "border"
                }`}
              >
                <>
                  <div
                    className=""
                    onClick={() => {
                      setAudioStart(true);
                      setContentType("audio");
                    }}
                  >
                    <AudioRecorder
                      onRecordingComplete={() => {
                        setAudioPreview(
                          URL.createObjectURL(
                            recorderControls?.recordingBlob as Blob
                          )
                        );
                        setAudioStart(false);
                        setContentType("audio");
                      }}
                      recorderControls={recorderControls}
                      showVisualizer
                    />
                  </div>
                  {!audioStart && (
                    <>
                      {/* implement later */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xl hidden text-gray-400"
                      >
                        <FiPaperclip />
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
                        className="text-xl max-[400px]:hidden text-gray-400"
                      >
                        <FiSmile />
                      </button>

                      {!audioPreview ? (
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => {
                            setInputText(e.target.value);
                            setContentType("text");
                          }}
                          className="w-full text-sm h-full max-sm:text-xs py-1 border-none outline-none text-gray-900 bg-transparent placeholder:text-gray-500"
                          placeholder="Type a message..."
                        />
                      ) : (
                        <div className="flex w-full justify-center items-center">
                          <audio
                            controls
                            src={audioPreview}
                            className="w-full text-xs"
                          >
                            Your browser does not support the audio element.
                          </audio>
                          <p onClick={() => handleClose()}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-4 text-gray-600 sm:size-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>
                        </div>
                      )}

                      <button
                        className="bg-slate-800 text-white max-sm:px-2 px-4 py-2 rounded-full"
                        onClick={handleSendMessage}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 max-sm:size-4"
                        >
                          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-700 text-sm">
            {/* <ClipLoader size={50} color={"#123abc"} loading={true} /> */}
            Select an user to view messages
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
