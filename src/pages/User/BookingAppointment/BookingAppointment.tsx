import React, { useState } from 'react';
import DatePicker from '../../../components/DatePicker/DatePicker'; 

interface TimeButtonProps {
  time: string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ time }) => (
  <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">{time}</button>
);

interface ServiceRadioProps {
  id: string;
  label: string;
}

const ServiceRadio: React.FC<ServiceRadioProps> = ({ id, label }) => (
  <div className="relative">
    <input className="peer hidden" id={id} type="radio" name="radio" />
    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>
    <label
      className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
      htmlFor={id}
    >
      <span className="mt-2 font-medium">{label}</span>
      <span className="text-xs uppercase">1 Hour</span>
    </label>
  </div>
);

const BookAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-screen">
      <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-32 text-center shadow-xl shadow-gray-300">
        <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book an appointment</h1>
        <p className="mt-6 text-lg text-white">Get an appointment with our experienced accountants</p>
        <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
      </div>

      <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
        <div>
          <p className="font-serif text-xl font-bold text-blue-900">Select a service</p>
          <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
            <ServiceRadio id="radio_1" label="Financial Planning" />
            <ServiceRadio id="radio_2" label="Retirement Planning" />
            <ServiceRadio id="radio_3" label="Investment Advice" />
          </div>
        </div>

        <div>
          <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a date</p>
          <DatePicker onSelectDate={handleDateSelect} />
        </div>

        <div>
          <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a time</p>
          <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
            <TimeButton time="12:00" />
            <TimeButton time="14:00" />
            <TimeButton time="09:00" />
            <TimeButton time="15:00" />
          </div>
        </div>

        <button className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1">Book Now</button>
      </div>
    </div>
  );
};

export default BookAppointment;
