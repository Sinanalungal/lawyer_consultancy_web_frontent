import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import { useFormik } from "formik";
import * as Yup from "yup";

const LawyerSessionManage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("scheduled");

  const renderContentPage = () => {
    switch (activeTab) {
      case "scheduling":
        return (
          <>
            <Scheduling />
          </>
        );
      case "scheduled":
        return (
          <>
            <Scheduled />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto  py-10 px-4">
      <AdminPageTitle
        title="SCHEDULES"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />
      <div className="mb-8 flex justify-center">
        <nav className="flex space-x-2 border rounded-full p-1 bg-white shadow-md">
          {["scheduled", "scheduling"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
                activeTab === tab
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6  bg-white  rounded-lg">{renderContentPage()}</div>
    </div>
  );
};

export default LawyerSessionManage;

import "react-calendar/dist/Calendar.css";
import {
  addSchedule,
  cancelSchedule,
  getActiveSchedules,
} from "../../../services/ScheduleSession";
import { useToast } from "../../../components/Toast/ToastManager";
import { Schedule } from "../../../types";

const Scheduling: React.FC = () => {
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      endTime: "",
      price: "",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required("Date is required")
        .min(
          new Date().toISOString().split("T")[0],
          "Date must be today or later"
        ),
      time: Yup.string()
        .required("Start time is required")
        .test(
          "is-not-past-time",
          "Start time must be in the future if the selected date is today",
          function (value) {
            const { date } = this.parent;
            if (date === new Date().toISOString().split("T")[0]) {
              const currentTime = new Date();
              const selectedTime = new Date();
              const [hours, minutes] = value.split(":");
              selectedTime.setHours(parseInt(hours), parseInt(minutes));
              return selectedTime > currentTime;
            }
            return true;
          }
        ),
      endTime: Yup.string()
        .required("End time is required")
        .test("is-greater", "End time must be after Start time", function (
          value
        ) {
          const { time } = this.parent;
          if (!time || !value) return false;
          const [startHours, startMinutes] = time.split(":").map(Number);
          const [endHours, endMinutes] = value.split(":").map(Number);
          const startTime = new Date();
          const endTime = new Date();
          startTime.setHours(startHours, startMinutes);
          endTime.setHours(endHours, endMinutes);

          return endTime > startTime;
        })
        .test(
          "min-difference",
          "End time must be at least 30 minutes after Start time",
          function (value) {
            const { time } = this.parent;
            if (!time || !value) return false;
            const [startHours, startMinutes] = time.split(":").map(Number);
            const [endHours, endMinutes] = value.split(":").map(Number);
            const startTime = new Date();
            const endTime = new Date();
            startTime.setHours(startHours, startMinutes);
            endTime.setHours(endHours, endMinutes);

            return endTime.getTime() - startTime.getTime() >= 30 * 60 * 1000;
          }
        ),
      price: Yup.number()
        .required("Price is required")
        .min(1, "Price must be greater than 0")
        .max(1000, "Price must be less than or equal to 1000"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("date", values.date);
      formData.append("start_time", values.time);
      formData.append("end_time", values.endTime);
      formData.append("price", values.price);

      try {
        const result = await addSchedule(formData);
        console.log("Schedule added successfully:", result);
        addToast("success", "Schedule added successfully");
        formik.resetForm();
      } catch (error:any) {
        console.error("Failed to add schedule:", error);
        if (error.response.data.detail) {
          addToast("danger", error.response.data.detail);
        }
      }
    },
  });

  return (
    <div className="flex mx-auto items-center max-w-2xl border rounded-xl justify-center p-12">
      <div className="mx-auto w-full bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="mb-3 block text-xs font-medium text-[#07074D]"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                    formik.touched.date && formik.errors.date
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.date}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-xs font-medium text-[#07074D]"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                    formik.touched.time && formik.errors.time
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.time}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="endTime"
                  className="mb-3 block text-xs font-medium text-[#07074D]"
                >
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                    formik.touched.endTime && formik.errors.endTime
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.endTime && formik.errors.endTime ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.endTime}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="mb-3 block text-xs font-medium text-[#07074D]"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-slate-700 py-3 px-8 text-center text-xs font-semibold text-white outline-none"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Scheduled: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getActiveSchedules();
        console.log(data);
        setSchedules(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedules();
  }, []);

  const handleCancel = async (uuid: number) => {
    try {
      console.log(uuid);

      await cancelSchedule(uuid);
      setSchedules((prev) => prev.filter((schedule) => schedule.id !== uuid));
      addToast("success", "Schedule canceled successfully.");
    } catch (error) {
      addToast("danger", "Failed to cancel the schedule.");
    }
  };

  return (
    <>
      <div className="py-5 rounded-xl">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.uuid}
              className="max-w-md mx-auto border bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
            >
              <div className="md:flex">
                <div className="p-8 w-full sm:flex justify-between items-center">
                  <div>
                    <p className="block mt-1 text-sm leading-tight font-medium text-gray-800">
                      Time: {schedule.start_time} - {schedule.end_time}
                    </p>

                    <p className="block mt-2 leading-tight font-bold text-gray-800">
                      ₹{schedule.price}
                    </p>
                    <p className="mt-2 text-gray-500 text-xs">
                      <i>Date:&nbsp;{schedule.date}</i>
                      {/* <i>{schedule.reference_until}</i> */}
                    </p>
                  </div>
                  <button
                    className="max-sm:mt-5 max-sm:w-full px-4 py-3 border border-transparent text-xs font-medium rounded-md text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      console.log(schedule.uuid, "this si the uuid");
                      handleCancel(schedule.id);
                    }}
                  >
                    Cancel Schedule
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xs justify-center w-full min-h-[150px] text-gray-500 items-center flex">
            <p>No Scheduled Session Available</p>
          </div>
        )}
      </div>
    </>
  );
};
