import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  cancelAppointment,
  fetchBookedSessions,
} from "../../../services/ScheduleSession";
import { Appointment } from "../../../types";
import { useToast } from "../../../components/Toast/ToastManager";
import Modal from "../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import isOnline from 'is-online';
import { BeatLoader } from "react-spinners";


interface AppointmentManipulated {
  uuid: string;
  session_start: string;
  session_end: string;
  booked_at:string;
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
  isJoinable?:boolean;
};
const UserAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentManipulated[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "finished">(
    "upcoming"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<AppointmentManipulated | null>(null);
  const [loading,setLoader] = useState<boolean>(false)
  // const { setLoader } = useLoader();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const fetchAppointments = async (tab: "upcoming" | "finished") => {
    setLoader(true);
    try {
      const fetchedAppointments: Appointment[] = await fetchBookedSessions(tab);
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoader(false);
    }
  };

  const cancelBookedSessions = async (uuid: string) => {
    try {
      await cancelAppointment(uuid);
      addToast("success", "Appointment cancelled successfully");
      fetchAppointments("upcoming");
    } catch (error) {
      addToast("danger", "Could not cancel appointment");
      console.error("Error cancelling booked sessions:", error);
    }
  };

  const OpenModal = (data: AppointmentManipulated) => {
    setModalData(data);
    setIsOpen(true);
  };

  const checkIfJoinable = (app: AppointmentManipulated) => {
    const now = new Date();
    const sessionStart = new Date(
      app.session_start.replace(" ", "T") + "+05:30"
    );
    const sessionEnd = new Date(app.session_end.replace(" ", "T") + "+05:30");
    return sessionStart <= now && sessionEnd >= now;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) => ({
          ...app,
          isJoinable: checkIfJoinable(app),

        }))
      );
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, [appointments]);

  useEffect(() => {
    fetchAppointments(activeTab);
  }, [activeTab]);
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:'90px'
  };
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
            <nav className="flex space-x-2 border rounded-full p-1 bg-white">
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
          {!loading?<motion.div
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
                          {new Date(app.session_start).toLocaleDateString()} at{" "}
                          {app.scheduling.start_time}
                        </p>
                        <p className="text-gray-600 max-sm:text-center text-xs">
                          ID: {app.uuid}
                        </p>
                      </div>
                    </div>

                    <div className="gap-2 flex max-sm:flex-wrap">
                      {activeTab === "upcoming" && (
                        <>
                          {app.isJoinable ? (
                            <button
                              onClick={async() => {
                                 await isOnline() ? navigate(`../../../../../video/${app.uuid}`) :addToast('info','check your internet connectivity')
                              }}
                              className="px-4 py-2 flex items-center justify-center gap-1 text-xs bg-white text-black font-medium border border-gray-400"
                            >
                              {"Join"}
                              <div className='bg-green-700 h-2 rounded-full w-2'></div>
                            </button>
                          ) : (
                            <>
                              <button className="px-4 py-2 text-xs bg-gray-300 opacity-60 text-black border border-gray-400">
                                {"Join"}
                              </button>
                              <button
                                onClick={() => cancelBookedSessions(app.uuid)}
                                className="px-4 py-2 text-xs bg-slate-800 text-white"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {activeTab === "finished" && (
                        <button
                          onClick={() => {
                            OpenModal(app);
                          }}
                          className="px-4 py-2 text-xs bg-white text-black border border-gray-400"
                        >
                          {"View Details"}
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
                </svg>{" "}
                <p className="text-center text-gray-500">
                  No appointments found
                </p>{" "}
              </div>
            )}{" "}
          </motion.div>:<div  style={spinnerStyle}>
              <BeatLoader color="#312e81" />
            </div>}
        </motion.div>{" "}
      </div>{" "}
      {modalData && (
       <Modal
       modalOpen={isOpen}
       setModalOpen={() => setIsOpen(!isOpen)}
       children={
         <>
           <h2 className="text-xl flex justify-center mb-4 font-bold underline underline-offset-4">
             Appointment Details
           </h2>
           {modalData && (
             <div className="flex flex-col items-center gap-2">
               <p>
                 <strong>Session Date:</strong> {modalData.session_start}
               </p>
               <p>
                 <strong>Session Time:</strong>{" "}
                 {modalData.scheduling.start_time} -{" "}
                 {modalData.scheduling.end_time}
               </p>
               <p>
                 <strong>Booked At:</strong> {modalData.booked_at}
               </p>

               <h3 className="text-sm font-semibold">Lawyer Details</h3>
               <p>
                 <strong>Selected Lawyer:</strong>{" "}
                 {modalData.scheduling.lawyer_profile.user.full_name}
               </p>
             </div>
           )}
         </>
       }
     ></Modal>
      )}{" "}
    </>
  );
};

export default UserAppointments;
