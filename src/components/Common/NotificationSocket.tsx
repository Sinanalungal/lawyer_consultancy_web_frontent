import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../redux/store";

interface Notification {
  title: string;
  description: string;
  time: string;
}

const NotificationSocket: React.FC = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { value } = useAppSelector((state) => state.login);
  // console.log(value);

  useEffect(() => {
    if (value) {
      const socket = new WebSocket(
        `ws://localhost:8000/notifications/${value}/`
      );

      socket.onopen = (event) => {
        console.log("WebSocket connection established:", event);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Notification received:", data.notification);

        // Parse the notification string into an object
        const notificationData = JSON.parse(data.notification);
        const newNotification: Notification = {
          title: notificationData.title,
          description: notificationData.description,
          time: new Date(notificationData.time).toLocaleTimeString(),
        };

        setNotification(newNotification);

        setTimeout(() => {
          setNotification(null);
        }, 3000);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket error occurred. Please try again.");
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
      };

      return () => {
        socket.close();
      };
    }
  }, [value]);

  const onDismiss = () => {
    setNotification(null);
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {notification && (
        <motion.div
          className="fixed sm:top-3 z-50 sm:right-4 right-0 flex items-center bg-white border border-gray-200 shadow-md rounded-lg p-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-2xl mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-grow">
            <p className="font-bold text-sm text-gray-700">
              {notification.title}
            </p>
            <p className="text-gray-600 text-xs">{notification.description}</p>
            <p className="text-gray-400 text-[10px] mt-2">
              {notification.time}
            </p>
          </div>
          <button
            className="text-gray-500 text-xl hover:text-gray-800"
            onClick={onDismiss}
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("notification-root")!
  );
};

export default NotificationSocket;
