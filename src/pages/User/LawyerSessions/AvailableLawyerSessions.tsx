import PageTitle from "../../../components/PageTitle/PageTitle";
import { useState, useEffect } from "react";
import {
  isToday,
  isBefore,
  isAfter,
  format,
  addDays,
  endOfMonth,
  startOfMonth,
  getDaysInMonth,
  getDay,
} from "date-fns";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  bookAppointment,
  bookAppointmentUsingWallet,
  getAvailableSchedulesForUser,
} from "../../../services/ScheduleSession";
import Modal from "../../../components/Modal/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Toast/ToastManager";
import { AxiosResponse } from "axios";
import { useLoader } from "../../../components/GlobelLoader/GlobelLoader";
import { WalletBalanceApi } from "../../../services/Wallet";

interface AvailableLawyerSessionsProps {}

const SessionScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [lawyerId, setLawyerId] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [walletPayment, setWalletPayment] = useState<number>(0);
  const { setLoader } = useLoader();
  const { addToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successParam = queryParams.get("success");
  const cancelParam = queryParams.get("cancel");
  const state = location.state as { id: number };
  const lawyer_Id = state?.id;

  console.log(cancelParam, "this is the cancel param");

  useEffect(() => {
    if (successParam) {
      setModalOpen(true);
    }
    if (cancelParam && cancelParam.toLowerCase() === "true") {
      console.log("Entered into this: Cancel param is true");
      addToast("danger", "Payment is canceled!");
      console.log("Toast triggered properly");
    }

    if (lawyer_Id) {
      setLawyerId(lawyer_Id);
    }
  }, [successParam, cancelParam]);

  useEffect(() => {
    setLawyerId(lawyer_Id);
  }, [lawyer_Id]);

  const fetchWalletBalance = async () => {
    try {
      const response = await WalletBalanceApi();
      setWalletPayment(response.balance);
    } catch (err) {
      console.error("Error fetching wallet balance:", err);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, [paymentModal]);

  useEffect(() => {
    const fetchAvailableSchedules = async () => {
      if (selectedDate && lawyerId) {
        setLoader(true);
        try {
          const dateStr = format(selectedDate, "yyyy-MM-dd");
          const schedules = await getAvailableSchedulesForUser(
            dateStr,
            lawyerId
          );
          console.log("Fetched schedules:", schedules);
          console.log(schedules?.times);

          setAvailableTimes(schedules?.times || []);
        } catch (error) {
          console.error("Error fetching available schedules:", error);
          setAvailableTimes([]);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchAvailableSchedules();
  }, [selectedDate, lawyerId]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    const selectedSessionDetails = availableTimes.find(
      (session) => session.start_time === time
    );
    setSelectedSession(selectedSessionDetails);
  };

  const handleConfirm = async () => {
    if (selectedSession && selectedDate) {
      try {
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        const result = await bookAppointment(
          selectedSession.uuid,
          selectedDateStr
        );
        if (!process?.env.VITE_CLIENT_ID) {
          throw new Error("Something wrong with stripe key");
        }
        const stripe = await loadStripe(
          "pk_test_51PMjrqSD4LlFpJPegNLUNIVDRjJmeaF1jW7lBzhnEQHgvmchbzkNn4pVdStSwROBEnbXvF2BpC4reOqUvHS1L3Yb00sfPbm63y"
        );
        if (!stripe) {
          throw new Error("Failed to load Stripe.");
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
          alert("Failed to redirect to checkout. Please try again.");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      }
    } else {
      alert("Please select a session and date.");
    }
  };

  interface WalletApiResponse {
    success?: string;
    checkout_id: string;
  }

  const handleWalletPayment = async () => {
    if (selectedSession && selectedDate) {
      try {
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

        // Specify the type for Axios response
        const result: AxiosResponse<WalletApiResponse> = await bookAppointmentUsingWallet(
          selectedSession.uuid,
          selectedDateStr
        );

        console.log(result, "this is the result");

        // Check if the status is 202
        if (result.status === 202) {
          addToast("success", "idea is working");

          // Check Stripe Client ID
          if (!process?.env.VITE_CLIENT_ID) {
            throw new Error("Something wrong with Stripe key");
          }

          // Initialize Stripe with your public key
          const stripe = await loadStripe(
            "pk_test_51PMjrqSD4LlFpJPegNLUNIVDRjJmeaF1jW7lBzhnEQHgvmchbzkNn4pVdStSwROBEnbXvF2BpC4reOqUvHS1L3Yb00sfPbm63y"
          );

          if (!stripe) {
            throw new Error("Failed to load Stripe.");
          }

          // Redirect to checkout
          const { error } = await stripe.redirectToCheckout({
            sessionId: result.data.checkout_id, // Accessing checkout ID correctly
          });

          if (error) {
            console.error("Error redirecting to checkout:", error);
            alert("Failed to redirect to checkout. Please try again.");
          }
        } else {
          navigate(
            `../../../../user/available-sessions/success?checkout_id=${result.data.checkout_id}`
          );
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        addToast("danger", "Error booking Appointment");
      }
    } else {
      addToast("info", "Please select a session and date.");
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(startOfMonth(addDays(currentMonth, -1)));
  };

  const renderCalendarDays = () => {
    const daysInCurrentMonth = getDaysInMonth(currentMonth);
    const startDate = startOfMonth(currentMonth);
    const startDayOfWeek = getDay(startDate);
    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let i = 0; i < daysInCurrentMonth; i++) {
      const day = addDays(startDate, i);
      const isSelected =
        selectedDate &&
        format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

      const buttonClassName = isSelected
        ? "bg-slate-600 text-white"
        : isBefore(day, new Date()) && !isToday(day)
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "hover:bg-slate-200";

      days.push(
        <motion.button
          key={i}
          onClick={() => {
            // Allow selection for today and future dates only
            if (!isBefore(day, new Date()) || isToday(day)) {
              handleDateSelect(day);
            } else {
              addToast("info", "select valid dates");
            }
          }}
          className={`w-full h-10 rounded-full text-xs flex items-center justify-center ${buttonClassName}`}
          whileHover={{ scale: isBefore(day, new Date()) ? 1 : 1.1 }} // Only scale up on non-past dates
          whileTap={{ scale: 0.9 }}
          animate={{ scale: isSelected ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          disabled={isBefore(day, new Date()) && !isToday(day)} // Disable button for past dates, but allow today
        >
          {format(day, "d")}
        </motion.button>
      );
    }

    return days;
  };

  return (
    <>
      <motion.div
        className="flex flex-col lg:flex-row bg-white rounded-lg shadow overflow-hidden border xl:max-w-9xl lg:max-w-6xl max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Calendar */}
        <motion.div
          className="p-6 lg:p-8 w-full lg:w-1/2 xl:w-1/3 bg-gray-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between my-5 items-center">
            <button onClick={handlePreviousMonth}>&lt;</button>
            <h2 className="text-xs sm:text-base font-bold mb-4 text-center">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-xs text-center ">
            <div className="">Tu</div>
            <div className="">Mo</div>
            <div className="">We</div>
            <div className="">Th</div>
            <div className="">Fr</div>
            <div className="">Sa</div>
            <div className="">Su</div>
            {renderCalendarDays()}
          </div>
        </motion.div>

        <motion.div
          className="p-6 lg:p-8 w-full lg:w-1/2 xl:w-2/3 flex flex-col justify-between"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence>
            <div
              key={selectedDate ? format(selectedDate, "yyyy-MM-dd") : "none"}
            >
              <div className="grid max-[400px]:grid-cols-1 min-w-[300px]  grid-cols-2 xl:grid-cols-3 gap-2">
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <motion.button
                      key={time.start_time}
                      onClick={() => {
                        handleTimeSelect(time.start_time);
                        setSelectedSession(time);
                      }}
                      className={`w-full py-4 gap-1 grid space-y-2 transform ease-in-out rounded-lg text-xs ${
                        selectedTime === time.start_time
                          ? "bg-slate-800 text-white"
                          : "text-gray-700 border border-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {time.start_time} - {time.end_time}
                      <span className="text-gray-400">Fee - {time.price}</span>
                    </motion.button>
                  ))
                ) : (
                  <p className="max-[400px]:col-span-1 min-h-[250px] flex justify-center items-center text-sm text-gray-600 col-span-2 xl:col-span-3 h-">
                    No available times for this date.
                  </p>
                )}
              </div>
            </div>
          </AnimatePresence>
          {selectedSession && (
            <motion.button
              className="w-full mt-6 py-3 px-6 bg-slate-800 text-white rounded-lg text-sm font-bold tracking-wide uppercase hover:bg-slate-600 transition-colors ease-in-out"
              onClick={() => setPaymentModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Confirm &amp; Pay
            </motion.button>
          )}
        </motion.div>
      </motion.div>
      <Modal
        modalOpen={paymentModal}
        setModalOpen={() => setPaymentModal(!paymentModal)}
        children={
          <>
            <h2 className="text-xl font-bold text-center mb-6">
              Select Payment Method
            </h2>
            <p className="text-center my-4 gap-2">
              <span>Wallet Balance: </span>
              <span className="font-semibold"> ₹{walletPayment}</span>
            </p>
            <div className="flex max-sm:grid justify-center gap-3">
              <button
                onClick={() => {
                  handleConfirm();
                }}
                className="px-6 py-3 shadow  bg-[#1e266e]  text-white font-semibold rounded-md"
              >
                Pay with Stripe
              </button>

              <button
                onClick={() => {
                  handleWalletPayment();
                }}
                className="px-6 py-3 border border-gray-200  text-black shadow font-semibold rounded-md"
              >
                Pay with Wallet
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setPaymentModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Cancel
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

const AvailableLawyerSessions: React.FC<AvailableLawyerSessionsProps> = () => {
  return (
    <motion.div
      className="my-5 sm:px-10 mb-10 lg:px-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle
        title="AVAILABLE SLOTS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />
      <SessionScheduler />
    </motion.div>
  );
};

export default AvailableLawyerSessions;
