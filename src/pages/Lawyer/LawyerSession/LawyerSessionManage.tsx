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
        title="APPOINTMENT"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
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

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  addSchedule,
  cancelSchedule,
  getActiveSchedules,
  getSchedules,
} from "../../../services/ScheduleSession";
import { useToast } from "../../../components/Toast/ToastManager";
import { Schedule } from "../../../types";
import { AxiosError } from "axios";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Schedules: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const { addToast } = useToast();
  
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedules();
        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          console.error("Unexpected data format:", data);
          addToast("danger", "Unexpected data format.");
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
        addToast("danger", "Failed to fetch schedules.");
      }
    };
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (value) {
      const selectedDate = (Array.isArray(value)
        ? value[0]
        : value
      )?.toLocaleDateString("en-CA");

      if (selectedDate) {
        const filtered = schedules.filter((schedule) => {
          const startDate = new Date(schedule.date).toISOString().split("T")[0];
          const endDate = schedule.reference_until
            ? new Date(schedule.reference_until).toISOString().split("T")[0]
            : startDate;

          return selectedDate >= startDate && selectedDate <= endDate;
        });
        setFilteredSchedules(filtered);
      }
    }
  }, [value, schedules]);

  const getColorForSchedule = (schedule: Schedule) => {
    const hash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    };

    const colorIndex = Math.abs(hash(String(schedule.uuid))) % 5; // Use modulus for variety
    const colors = [
      { background: "bg-blue-100", border: "border-blue-300" },
      { background: "bg-green-100", border: "border-green-300" },
      { background: "bg-yellow-100", border: "border-yellow-300" },
      { background: "bg-red-100", border: "border-red-300" },
      { background: "bg-purple-100", border: "border-purple-300" },
    ];

    return colors[colorIndex];
  };

  return (
    <div className="mx-auto max-w-3xl">
      <section className="relative border rounded-xl py-24">
        <div className="w-full max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex flex-col lg:flex-row max-lg:gap-3 items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                {/* SVG Path */}
              </svg>
              <h6 className="text-sm leading-5 font-semibold text-gray-900">
                Appointment based on date
              </h6>
            </div>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="mx-auto flex max-lg:grid gap-1">
              <div>
                <Calendar
                  onChange={onChange}
                  value={value}
                  className="rounded-lg border mx-auto border-gray-300 shadow-md"
                />
              </div>
              <div className="flex rounded-xl w-full border-gray-200 items-w-full">
                <div className="w-full">
                  <div className="w-full space-y-1 border-gray-200 p-1.5">
                    {filteredSchedules.map((schedule) => {
                      const { background, border } = getColorForSchedule(
                        schedule
                      );
                      return (
                        <div
                          key={schedule.uuid}
                          className={`w-full h-full rounded p-2.5 ${background} ${border} border-l-4`}
                        >
                          <p className="text-xs font-normal text-gray-900 mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            Session at {schedule.start_time} -{" "}
                            {schedule.end_time}
                          </p>
                          <p className="text-xs font-semibold text-gray-600">
                            Price: {schedule.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Scheduling: React.FC = () => {
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      endTime: "",
      price: "",
      // referenceUntil: "",
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

            return endTime.getTime() - startTime.getTime() >= 30 * 60 * 1000; // 30 minutes in milliseconds
          }
        ),
      price: Yup.number()
        .required("Price is required")
        .min(1, "Price must be greater than 0")
        .max(1000, "Price must be less than or equal to 1000"),
      // referenceUntil: Yup.date()
      //   .required("Reference Until date is required")
      //   .when(
      //     "date",
      //     (date, schema) =>
      //       date &&
      //       schema.min(date, "Reference Until date must be after Start date")
      //   ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("date", values.date);
      formData.append("start_time", values.time);
      formData.append("end_time", values.endTime);
      formData.append("price", values.price);
      // formData.append("reference_until", values.referenceUntil);

      try {
        const result = await addSchedule(formData);
        console.log("Schedule added successfully:", result);
        addToast("success", "Schedule added successfully");
        formik.resetForm();
      } catch (error: any) {
        console.error("Failed to add schedule:", error);
        if (error.response.data.detail){
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
            {/* <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="referenceUntil"
                  className="mb-3 block text-xs font-medium text-[#07074D]"
                >
                  Reference Until
                </label>
                <input
                  type="date"
                  name="referenceUntil"
                  id="referenceUntil"
                  value={formik.values.referenceUntil}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                    formik.touched.referenceUntil &&
                    formik.errors.referenceUntil
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.referenceUntil &&
                formik.errors.referenceUntil ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.referenceUntil}
                  </div>
                ) : null}
              </div>
            </div> */}
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
        // addToast('danger', 'Failed to fetch schedules.');
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
        {schedules.map((schedule) => (
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
                  onClick={() =>{console.log(schedule.uuid,'this si the uuid');
                   handleCancel(schedule.id )}}
                >
                  Cancel Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
