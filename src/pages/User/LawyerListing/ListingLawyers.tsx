import React, { useState } from "react";
import SearchForm from "../../../components/Search/Search";
import StarRating from "../../../components/StarRating/StarRating";
import PageTitle from "../../../components/PageTitle/PageTitle";

const doctors = [
  {
    name: "Dr. Nabilla Sp. PD",
    status: "Away",
    specialization: "Internist",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: false,
  },
  {
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },
  {
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },{
    name: "Dr. Ibrahim M. Kes, Sp. B",
    status: "Online",
    specialization: "Surgeon",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg",
    online: true,
  },
];

interface DoctorProps {
  doctor: {
    name: string;
    status: string;
    specialization: string;
    image: string;
    online: boolean;
  };
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor }) => (
  <div className={`  bg-white rounded-md p-4 ${doctor.online ? "" : ""}`}>
    <img
      src={doctor.image}
      alt={doctor.name}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h2 className="text-base font-bold">{doctor.name}</h2>
    <p className="text-sm">{doctor.specialization}</p>
    <span className={`block my-1 text-xs ${doctor.online ? "text-green-500" : "text-red-500"}`}>
      {doctor.online ? "Online" : "Offline"}
    </span>
    <StarRating rating={4} />
  </div>
);

const CheckboxFilter: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    // Handle filtering logic here based on isChecked state
  };

  return (
    <li>
      <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
        <div className="flex items-center h-5">
          <input
            id={id}
            name="filter-checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
        </div>
        <div className="ms-2 text-sm">
          <label htmlFor={id} className="font-medium text-gray-900 dark:text-gray-300">
            <div>{label}</div>
            <p className="text-xs font-normal text-gray-500 dark:text-gray-300">
              Some helpful instruction goes here.
            </p>
          </label>
        </div>
      </div>
    </li>
  );
};

const DepartmentFilter: React.FC<{ selectedOption: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ selectedOption, onChange }) => (
  <div className="bg-white max-xl:hidden rounded-xl px-4">
    <p className="text-xl py-3 font-medium">Department</p>
    <div className="py-6">
      <select
        value={selectedOption}
        onChange={onChange}
        className="border rounded-xl shadow-sm text-xs p-2 w-full"
      >
        <option value="">Select a department</option>
        <option value="individual">Individual</option>
        <option value="company">Company</option>
        <option value="nonprofit">Non profit</option>
      </select>
    </div>
  </div>
);

const RatingFilter: React.FC<{ rating: number }> = ({ rating }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    // Handle filtering logic here based on isChecked state and rating
  };

  return (
    <li>
      <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
        <div className="flex items-center h-5">
          <input
            id={`helper-checkbox-${rating}`}
            name="rating-checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
        </div>
        <div className="ms-2 text-sm">
          <label htmlFor={`helper-checkbox-${rating}`} className="font-medium text-gray-900 dark:text-gray-300">
            <div><StarRating rating={rating} /></div>
          </label>
        </div>
      </div>
    </li>
  );
};

const ListingLawyers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [checkboxSelectedOptions, setCheckboxSelectedOptions] = useState<string[]>([]);

  const handleChangeCheckbox = (id: string) => {
    setCheckboxSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(id)
        ? prevSelectedOptions.filter(option => option !== id)
        : [...prevSelectedOptions, id]
    );
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <section className="bg-gray-50 2xl:container mx-auto xl:px-10 py-10">
        <div className="w-full flex p-5 justify-center">
            <PageTitle title="Lawyers"/>
        </div>
      <div className="grid xl:grid-cols-5">
        <div className="bg-white  max-xl:hidden rounded-xl px-4 ">
          <p className="text-xl p-3 font-medium">Experience</p>
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHelperCheckboxButton">
            <CheckboxFilter id="helper-checkbox-4" label="Individual" />
            <CheckboxFilter id="helper-checkbox-5" label="Company" />
            <CheckboxFilter id="helper-checkbox-6" label="Non profit" />
          </ul>
          <DepartmentFilter selectedOption={selectedDepartment} onChange={handleDepartmentChange} />
          <p className="text-xl p-4 font-medium">Rating</p>
          <ul className="px-5 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHelperCheckboxButton">
            <RatingFilter rating={5} />
            <RatingFilter rating={4} />
            <RatingFilter rating={3} />
            <RatingFilter rating={2} />
            <RatingFilter rating={1} />
          </ul>
        </div>
        <div className="px-8 col-span-4">
          <div className="mb-4">
            {/* <h1 className="text-2xl font-bold">Doctor List</h1> */}
            <div className="flex justify-between max-sm:flex-col-reverse  sm:items-center mt-4">
              <div className="flex items-center gap-2 ">
                <div className="relative space-x-1">
                  <select className=" max-xl:bg-slate-50 rounded-xl ring-0 outline-none text-xs p-2">
                    <option value="all">All</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  <select className="bg-slate-50 xl:hidden rounded-xl ring-0 outline-none text-xs p-2">
                    <option value="all">Department</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  <select className=" xl:hidden bg-slate-50 rounded-xl ring-0 outline-none text-xs p-2">
                    <option value="all">Experience</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="relative text-sm max-sm:mb-4 max-sm:float-end">
                  <input
                    placeholder="Search..."
                    className="input border-b  focus:border text-xs max-sm:max-w-56  focus:rounded-xl border-gray-300 px-5 py-2  xl:w-[400px] max-xl:max-w-80 transition-all focus:w-64 xl:focus:w-[600px] outline-none"
                    name="search"
                    type="search"
                  />
                  <svg
                    className="size-6 absolute top-1 right-3 max-sm:left-38  text-gray-500"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingLawyers;
