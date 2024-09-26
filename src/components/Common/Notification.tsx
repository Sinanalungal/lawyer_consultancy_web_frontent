import React, { useEffect, useState } from "react";
import { getUserNotifications } from "../../services/Notifications";
import { useToast } from "../Toast/ToastManager";
import './Notification.css'
import { useAppSelector } from "../../redux/store";

interface Notification {
    id:number;
  title: string;
  description: string;
  notify_time: string;
}

interface NotificationLayerProps {
  open: boolean;
}

const NotificationLayer: React.FC<NotificationLayerProps> = ({ open = false }) => {
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
        console.log(response);
  
        if (response.results.length === 0) {
          setHasMore(false);
        } else {
          setNotifications((prev) => {
            const existingIds = new Set(prev.map((n) => n.id)); 
            const newNotifications = response.results.filter((notification:Notification) => !existingIds.has(notification.id));
  
            return [...prev, ...newNotifications];
          });
        }
      } catch (error) {
        console.log(error);
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
    <div className={`fixed z-50 top-[75px] max-sm:min-w-[220px] ${role!='user'&& 'max-sm:mt-11'} sm:w-[350px] no-scrollbar overflow-y-scroll h-[350px] right-0 sm:right-6 bg-white border border-gray-200 shadow-md py-2 rounded-lg overflow-hidden`}>
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">Notifications</h2>
        <div className="grid gap-2">
          {notifications.map((notificationObj, index) => (
            <div
              key={index}
              className="flex-grow border-b cursor-pointer pt-1 hover:bg-slate-100 p-3 transition duration-200"
            >
              <p className="font-bold text-sm text-gray-700">{notificationObj.title}</p>
              <p className="text-gray-600 text-xs">{notificationObj.description}</p>
              <p className="text-gray-400 text-[10px] mt-2">
              {new Date(notificationObj.notify_time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="loader"></div>
          </div>
        )}

        {hasMore && !loading && (
          <button
            onClick={loadMoreNotifications}
            className="mt-4 w-full text-xs bg-slate-700  text-white py-2 rounded hover:bg-slate-800 transition duration-200"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationLayer;
