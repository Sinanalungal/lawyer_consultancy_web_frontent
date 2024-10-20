import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../redux/store";
import { cn } from "../../utils/cn";
import { AnimatedList } from "../Ui/animated-list-components";
import { HiMiniInboxArrowDown } from "react-icons/hi2";

interface Notification {
  title: string;
  description: string;
  time: string;
}

const NotificationSocket: React.FC = ({
  className,
}: {
  className?: string;
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const { value } = useAppSelector((state) => state.login);

  // Store notifications persistently
  useEffect(() => {
    const storedNotification = localStorage.getItem("latestNotification");
    if (storedNotification) {
      setNotification(JSON.parse(storedNotification));
    }
  }, []);

  useEffect(() => {
    if (value) {
      const connectWebSocket = () => {
        const socket = new WebSocket(
          `ws://${import.meta.env.VITE_WEBSOCKET_URL}/notifications/${value}/`
        );

        socket.onopen = (event) => {
          console.log("notification socket is opened ");

          console.log("WebSocket connection established:", event);
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("Notification received:", data.notification);

          const notificationData = JSON.parse(data.notification);
          const newNotification: Notification = {
            title: notificationData.title,
            description: notificationData.description,
            time: new Date(notificationData.time).toLocaleTimeString(),
          };

          // Persist the notification in localStorage
          localStorage.setItem(
            "latestNotification",
            JSON.stringify(newNotification)
          );
          setNotification(newNotification);

          // Clear notification after 3 seconds
          setTimeout(() => {
            setNotification(null);
            localStorage.removeItem("latestNotification");
          }, 3000);
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          // setError("WebSocket error occurred. Please try again.");
        };

        socket.onclose = () => {
          console.log(
            "WebSocket connection closed. Attempting to reconnect..."
          );
          setTimeout(connectWebSocket, 5000);
        };

        return () => {
          socket.close();
        };
      };

      const cleanUpSocket = connectWebSocket();
      return cleanUpSocket;
    }
  }, [value]);

  // const onDismiss = () => {
  //   setNotification(null);
  //   localStorage.removeItem("latestNotification");
  // };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {notification && (
        <motion.div
          className="fixed sm:top-3 z-50 sm:right-4 right-0 flex items-center bg-white border border-gray-200 shadow-md rounded-lg  gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={cn(
              "relative  flex   w-full flex-col  overflow-hidden ",
              className
            )}
          >
            <AnimatedList>
              {notification && <Notification {...notification} />}
            </AnimatedList>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("notification-root")!
  );
};

export default NotificationSocket;

const Notification = ({ title, description, time }: Notification) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: "#1e266e",
          }}
        >
          <span className="text-lg p-3">
            <HiMiniInboxArrowDown color="white" />
          </span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{title}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};
