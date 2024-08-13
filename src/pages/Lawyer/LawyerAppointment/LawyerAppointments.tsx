import React, { useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";


const LawyerAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  const renderContent = () => {
    switch (activeTab) {

      case "upcoming":
        return (
          <>
            <Upcoming />
          </>
        );
      case "completed":
        return (
          <>
            <Completed />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto  py-10 px-4">
      <AdminPageTitle
        title="APPOINTMENT"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
      />
      <div className="bg-white mx-auto md:max-w-[250px]  shadow-md rounded-lg p-2">
        <div className="flex flex-wrap gap-2   md:flex-nowrap justify-between">
          {["upcoming", "completed"].map((tab) => (
            <button
              key={tab}
              className={`w-full md:w-auto py-3 text-xs px-4 text-center rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? "bg-slate-700 text-white font-semibold  shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6  bg-white  rounded-lg">{renderContent()}</div>
    </div>
  );
};

export default LawyerAppointments;

const Upcoming: React.FC = () => {
  return (
    <>
      <div className="py-5  rounded-xl">
        <div className="max-w-md mx-auto border  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Patient: Jane Doe
              </div>
              <p className="block mt-1 text-sm leading-tight font-medium text-gray-800">
                Appointment Time: 13:00 - 14:00
              </p>
              <p className="mt-2 text-gray-500 text-xs">
                Lawyer: Adv. John Doe
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
      </div>
    </>
  );
};

const Completed: React.FC = () => {
  return (
    <>
      <div className="py-5  rounded-xl">
        <div className="max-w-md mx-auto border  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
          <div className="md:flex ">
            <div className="p-8 flex  max-md:flex-col justify-between w-full ">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Patient: Jane Doe
                </div>
                <p className="block mt-1 text-sm leading-tight font-medium text-gray-800">
                  Appointment Time: 13:00 - 14:00
                </p>
                <p className="mt-2 text-gray-500 text-xs">
                  Lawyer: Adv. John Doe
                </p>
              </div>
              <button className="my-4 px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-slate-600 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
