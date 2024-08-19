import React, { useState, useEffect } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import { Appointment } from "../../../types";
import { fetchBookedSessions } from "../../../services/ScheduleSession";
import { format } from 'date-fns';

const formatDate = (isoString: string) => {
  console.log("Formatting date:", isoString);
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", isoString);
    return "Invalid date";
  }
  return format(date, 'MMMM dd, yyyy HH:mm:ss'); // Adjust the format as needed
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
        console.log(`Fetching appointments for tab: ${activeTab}`);
        const data = await fetchBookedSessions(activeTab as "upcoming" | "finished");
        console.log("Fetched data:", data);
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
    if (loading) {
      return <p>Loading appointments...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

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
    <div className="mx-auto py-10 px-4">
      <AdminPageTitle
        title="APPOINTMENT"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
      />
      <div className="bg-white mx-auto md:max-w-[250px] shadow-md rounded-lg p-2">
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
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg">{renderContent()}</div>
    </div>
  );
};

const Upcoming: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => {
  return (
    <>
      <div className="py-5 rounded-xl">
        {appointments.length === 0 ? (
          <p className="flex justify-center min-h-[250px] items-center">No Upcoming appointments.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.uuid} className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
              <div className="md:flex">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    User: {appointment.user_profile.full_name}
                  </div>
                  <p className="block mt-1 text-sm leading-tight font-medium text-gray-800">
                    Appointment Time: {formatDate(appointment.session_date + 'T' + appointment.scheduling.start_time)}
                  </p>
                  <button className="mt-5 max-sm:w-full px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-slate-600 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    View Details
                  </button>
                  <button className="sm:mt-5 max-sm:w-full mt-2 sm:ml-3 px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

const Completed: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => {
  return (
    <>
      <div className="py-5 rounded-xl">
        {appointments.length === 0 ? (
          <p className="flex justify-center min-h-[250px] items-center">No completed appointments.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.uuid} className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
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
                  <button className="my-4 px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-slate-600 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LawyerAppointments;