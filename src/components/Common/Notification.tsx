import React, { useEffect, useState } from "react";
import { getUserNotifications } from "../../services/Notifications";
import { useToast } from "../Toast/ToastManager";
import "./Notification.css";
import { useAppSelector } from "../../redux/store";
import { DatabaseBackup } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  notify_time: string;
  is_readed: boolean;
}

interface NotificationLayerProps {
  open: boolean;
  onClose:()=>void;
}

const NotificationLayer: React.FC<NotificationLayerProps> = ({ open = false ,onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { role } = useAppSelector((state) => state.login);
  const { addToast } = useToast();

  const fetchNotifications = async () => {
    if (open && hasMore) {
      setLoading(true);
      try {
        const response = await getUserNotifications(page);
        if (response.results.length === 0) {
          setHasMore(false);
        } else {
          setNotifications((prev) => {
            const existingIds = new Set(prev.map((n) => n.id));
            const newNotifications = response.results.filter(
              (notification: Notification) => !existingIds.has(notification.id)
            );
            return [...prev, ...newNotifications];
          });
        }
      } catch (error) {
        addToast("danger", "No more notifications");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [open, page]);

  const loadMoreNotifications = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div
        className={`fixed z-50 max-sm:min-w-[220px] ${
          role == "user" && "top-[75px] sm:right-6"
        } sm:w-[350px] no-scrollbar overflow-y-scroll right-0 bg-white border border-gray-200 shadow-lg py-4 rounded-lg transition-transform transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4">
          <h2 className="font-bold text-xl text-gray-800 mb-4 flex justify-between"><span>Notifications</span> <span className="cursor-pointer" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span></h2>
          {notifications.length > 0 && <div className="grid gap-4">
            {notifications.map((notificationObj, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100 shadow-sm transition duration-200"
              >
                <div
                  className={`w-4 h-2 rounded-full mr-3 ${
                    !(notificationObj.is_readed) && "bg-green-500" 
                  }`}
                ></div>
                <div className="flex-grow cursor-pointer">
                  <p className="font-semibold text-gray-700 text-sm">
                    {notificationObj.title}
                  </p>
                  <p className="text-gray-600 text-xs">{notificationObj.description}</p>
                  <p className="text-gray-400 text-[10px] mt-1">
                    {new Date(notificationObj.notify_time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>}
          {notifications.length == 0  && !loading && <div className="flex justify-center items-center gap-2"><DatabaseBackup /><div className="text-sm">No notifications</div></div>}

          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="loader"></div>
            </div>
          )}

          {hasMore && !loading && (
            <button
              onClick={loadMoreNotifications}
              className="mt-6 w-full text-xs bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationLayer;
