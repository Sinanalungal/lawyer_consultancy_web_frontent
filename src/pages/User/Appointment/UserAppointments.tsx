import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchBookedSessions } from "../../../services/ScheduleSession";

interface Appointment {
  uuid: string;
  session_date: string;
  scheduling: {
    start_time: string;
    end_time: string;
    lawyer_profile: {
      user: {
        full_name: string;
        profile_image: string | null;
      };
    };
  };
  booked_at: string;
}

const UserAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "finished">("upcoming");

  const fetchAppointments = async (tab: "upcoming" | "finished") => {
    try {
      const fetchedAppointments: Appointment[] = await fetchBookedSessions(tab);
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="relative sm:px-6 px-2 mx-auto w-full min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-semibold pb-6 pt-10 max-sm:text-xl text-gray-800 text-center">
            MY APPOINTMENTS
          </h2>

          <div className="mb-8 flex justify-center">
            <nav className="flex space-x-2 border rounded-full p-1 bg-gray-100">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
                  activeTab === "upcoming"
                    ? "bg-slate-800 text-white"
                    : "text-gray-600"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("finished")}
                className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
                  activeTab === "finished"
                    ? "bg-slate-800 text-white"
                    : "text-gray-600"
                }`}
              >
                Finished
              </button>
            </nav>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px]"
          >
            {appointments.length > 0 ? (
              <ul className="space-y-4">
                {appointments.map((app) => (
                  <motion.li
                    key={app.uuid}
                    className="p-4 border mx-auto max-sm:max-w-md max-w-2xl border-gray-200 flex max-sm:flex-col max-sm:gap-5 items-center sm:justify-between bg-white hover:shadow rounded"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex max-sm:flex-col items-center gap-4">
                      <img
                        src={
                          app.scheduling.lawyer_profile.user.profile_image ||
                          "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                        }
                        alt={app.scheduling.lawyer_profile.user.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div className="grid gap-2">
                        <p className="max-sm:text-sm max-sm:text-center font-semibold text-slate-800">
                          {app.scheduling.lawyer_profile.user.full_name}
                        </p>
                        
                        <p className="text-gray-600 max-sm:text-center text-xs">
                          {new Date(app.session_date).toLocaleDateString()}{" "}
                          at {app.scheduling.start_time}
                        </p>
                        <p className="text-gray-600 max-sm:text-center text-xs">
                        ID: {app.uuid}
                        </p>
                      </div>
                    </div>

                    <div className="gap-2 flex max-sm:flex-wrap">
                      <button className="px-4 py-2 text-xs bg-white text-black border border-gray-400">
                        {activeTab === "upcoming" ? "Attend" : "View Details"}
                      </button>
                      {activeTab === "upcoming" && (
                        <button className="px-4 py-2 text-xs bg-slate-800 text-white">
                          Cancel
                        </button>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <svg
                  className="size-10 text-gray-500 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" x2="2" y1="12" y2="12"></line>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  <line x1="6" x2="6.01" y1="16" y2="16"></line>
                  <line x1="10" x2="10.01" y1="16" y2="16"></line>
                </svg>
                <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
                  No {activeTab} appointments
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default UserAppointments;
