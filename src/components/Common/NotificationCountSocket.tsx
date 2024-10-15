import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../redux/store";
import { getUserNotificationsCount } from "../../services/Notifications";
import { IconBellRingingFilled } from "@tabler/icons-react";

const NotificationCountSocket = ({ background = false }) => {
  const [notification_count, setNotificationCount] = useState<number>(0);
  const [_error, setError] = useState<string | null>(null);
  const { value } = useAppSelector((state) => state.login);
  const socketRef = useRef<WebSocket | null>(null); // WebSocket instance
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For reconnection timer
  const [shouldReconnect, setShouldReconnect] = useState<boolean>(true); // Control reconnect behavior

  // Function to fetch initial count
  const fetchCount = async () => {
    try {
      const response = await getUserNotificationsCount();
      setNotificationCount(response.unread_count);
    } catch {
      console.log("Failed to fetch the data");
    }
  };

  // Function to initialize WebSocket connection
  const initializeWebSocket = () => {
    if (value) {
      const socket = new WebSocket(`ws://localhost:8000/notification-count/${value}/`);
      socketRef.current = socket;

      socket.onopen = (event) => {
        console.log("WebSocket connection established:", event);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Notification count received:", data);
        setNotificationCount(data.notification_count);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket error occurred. Please try again.");
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
        // If closed unexpectedly and we should reconnect, attempt to reconnect
        if (shouldReconnect) {
          console.log("Attempting to reconnect...");
          reconnectTimeoutRef.current = setTimeout(() => {
            initializeWebSocket(); // Retry connection after delay
          }, 5000); // 5-second delay before reconnecting
        }
      };
    }
  };

  // Handle component mount and unmount
  useEffect(() => {
    // Fetch initial count when the component is mounted
    fetchCount();

    // Establish WebSocket connection
    initializeWebSocket();

    // Cleanup function to close WebSocket on component unmount
    return () => {
      setShouldReconnect(false); // Prevent reconnection on unmount
      if (socketRef.current) {
        socketRef.current.close(); // Close the WebSocket connection
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current); // Clear any reconnect timeout
      }
    };
  }, [value]);

  return (
    <>
      <button
        type="button"
        className={`relative inline-flex items-center p-1 text-sm font-medium text-center text-white rounded-full ${background ? 'bg-black' : ''}`}
      >
        <IconBellRingingFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        <span className="sr-only">Notifications</span>
        {notification_count !== 0 && (
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {notification_count}
          </div>
        )}
      </button>
    </>
  );
};

export default NotificationCountSocket;
