import React, { useState, useEffect } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import { Appointment } from "../../../types";
import {
  cancelAppointment,
  fetchBookedSessions,
} from "../../../services/ScheduleSession";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Toast/ToastManager";
import Modal from "../../../components/Modal/Modal";

const formatDate = (
  isoString: string,
  formatStr = "MMMM dd, yyyy HH:mm:ss"
) => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", isoString);
    return "Invalid date";
  }
  return format(date, formatStr);
};

const LawyerAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBookedSessions(
          activeTab as "upcoming" | "finished"
        );
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [activeTab]);

  const renderContent = () => {
    if (loading) return <p className="flex justify-center  text-xs min-h-[250px] items-center">Loading appointments...</p>;
    if (error) return <p>{error}</p>;

    switch (activeTab) {
      case "upcoming":
        return <Upcoming appointments={appointments} />;
      case "completed":
        return <Completed appointments={appointments} />;
      default:
        return null;
    }
  };

  return (
    <div className=" py-10 px-4">
      <AdminPageTitle
        title="APPOINTMENT"
        description="Manage your upcoming and completed appointments"
      />
      <div className="mb-8 flex justify-center">
        <nav className="flex space-x-2 border rounded-full p-1  shadow-md">
          {["upcoming", "completed"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
                activeTab === tab
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      {/* <div className="bg-white mx-auto md:max-w-[250px] shadow-md rounded-lg p-2">
        <div className="flex flex-wrap gap-2 md:flex-nowrap justify-between">
          {["upcoming", "completed"].map((tab) => (
            <button
              key={tab}
              className={`w-full md:w-auto py-3 text-xs px-4 text-center rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? "bg-slate-700 text-white font-semibold shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div> */}
      <div className="mt-6 bg-transparent rounded-lg">{renderContent()}</div>
    </div>
  );
};

const Upcoming: React.FC<{ appointments: Appointment[] }> = ({
  appointments,
}) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const cancelBookedSessions = async (uuid: string) => {
    try {
      await cancelAppointment(uuid);
      addToast("success", "Appointment cancelled successfully");
      // fetchAppointments("upcoming");
      window.location.reload();
    } catch (error) {
      addToast("danger", "could not cancel appointment");
      console.error("Error cancelling booked sessions:", error);
    }
  };
  return (
    <div className="py-5 rounded-xl">
      {appointments.length === 0 ? (
        <p className="flex justify-center text-xs min-h-[250px] items-center">
          No Upcoming appointments.
        </p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.uuid}
            className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
          >
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  User: {appointment.user_profile.full_name}
                </div>
                <p className="block mt-1 text-sm leading-tight font-medium text-gray-800">
                  Appointment Time: {formatDate(appointment.session_start)}
                </p>
                {new Date(appointment.session_start) > new Date() ? (
                  <button className="px-4 py-2 text-xs bg-gray-300 opacity-60 text-black border border-gray-400">
                    Join
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 text-xs bg-white text-black font-medium border border-gray-400"
                    onClick={() =>
                      navigate(`../../../../../video/${appointment.uuid}`)
                    }
                  >
                    Join
                  </button>
                )}
                <button
                  onClick={() => cancelBookedSessions(appointment.uuid)}
                  className="sm:mt-5 max-sm:w-full mt-2 sm:ml-3 px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-red-700 hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const Completed: React.FC<{ appointments: Appointment[] }> = ({
  appointments,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Appointment | null>(null);
  const OpenModal = (data: Appointment) => {
    setModalData(data);
    setIsOpen(true);
  };
  return (
    <div className="py-5 rounded-xl">
      {appointments.length === 0 ? (
        <p className="flex justify-center text-xs min-h-[250px] items-center">
          No completed appointments.
        </p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.uuid}
            className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
          >
            <div className="md:flex">
              <div className="p-8 flex max-md:flex-col justify-between w-full">
                <div>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    User: {appointment.user_profile.full_name}
                  </div>
                  <p className="block mt-1 text-sm leading-tight font-medium text-gray-800">
                    Appointment Time: {formatDate(appointment.booked_at)}
                  </p>
                  <p className="block mt-2 text-xs leading-tight font-medium text-gray-500">
                    UUID: {appointment.uuid}
                  </p>
                </div>
                <button
                  onClick={() => {
                    OpenModal(appointment);
                  }}
                  className="my-4 px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-slate-600 hover:bg-slate-500"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}
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
                  <strong>User Details:</strong>{" "}
                  {modalData.user_profile.full_name}
                </p>
              </div>
            )}
          </>
        }
      ></Modal>
    </div>
  );
};

export default LawyerAppointments;
