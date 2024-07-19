import React, { useState } from "react";
import LawyerListingCard from "../../../components/LawyerListingCard/LawyerListingCard";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import Drawer from "../../../components/Drawer/Drawer";
import DepartmentSelector from "../../../components/Filter/FilterComponent";
import PageTitle from "../../../components/PageTitle/PageTitle";

interface Lawyer {
  name: string;
  status: string;
  specialization: string;
  image: string;
  online: boolean;
}

const lawyers: Lawyer[] = [
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
  },
  // Add additional lawyer data as needed
];

const departments: string[] = [
  'All',
  'Family Lawyer',
  'Criminal Defense Lawyer',
  'Corporate Lawyer',
  'Intellectual Property Lawyer',
  'Immigration Lawyer',
];

const experienceLevels: string[] = [
  'All',
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Expert',
];

const ratings: string[] = [
  'All',
  '1 ⭐',
  '2 ⭐',
  '3 ⭐',
  '4 ⭐',
  '5 ⭐',
];

const LawyerListing: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0]);
  const [selectedRating, setSelectedRating] = useState<string>(ratings[0]);
  const [selectedExperience, setSelectedExperience] = useState<string>(experienceLevels[0]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpenFilter(false); // Close the filter without applying changes
  };

  const handleUpdate = () => {
    // Implement the logic to apply the filters, e.g., updating state or making an API call
    console.log('Filters applied:', {
      selectedDepartment,
      selectedExperience,
      selectedRating,
    });
    setOpenFilter(false); // Optionally close the filter after applying changes
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <UserLayout>
      <section className="2xl:container min-h-screen mx-auto">
        <PageTitle
        title="LAWYERS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />

        <div className="w-full h-12 border-gray-300 flex justify-between items-center border-t border-b px-10">
          <div onClick={() => setOpenFilter(!openFilter)} className="flex text-xs items-center gap-1 h-full px-3 border-r cursor-pointer hover:bg-gray-200 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 text-gray-500"
            >
              <path d="M14 2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2.172a2 2 0 0 0 .586 1.414l2.828 2.828A2 2 0 0 1 6 9.828v4.363a.5.5 0 0 0 .724.447l2.17-1.085A2 2 0 0 0 10 11.763V9.829a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 0 14 4.172V2Z" />
            </svg>
            <p className="text-slate-600 font-medium">Filters</p>
          </div>
          {/* <div className="text-sm text-slate-600 items-center font-medium flex gap-1 cursor-pointer px-3 h-full hover:bg-gray-200 rounded">
            <p>Sort</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div> */}
        </div>

        <div className="flex relative justify-center">
          <div className={openFilter ? "absolute p-10 pb-20 bg-white border-b max-sm:grid-cols-1 grid-cols-2 w-full sm:px-16 grid lg:grid-cols-3" : 'hidden'}>
            <div className="sm:border-r-2 flex justify-start">
              <DepartmentSelector
                title="Select Department"
                data={departments}
                name="department"
                selectedDepartment={selectedDepartment}
                onChange={setSelectedDepartment}
              />
            </div>
            <div className="lg:border-r-2 flex justify-start">
              <DepartmentSelector
                title="Select Experience"
                data={experienceLevels}
                name="experienceLevels"
                selectedDepartment={selectedExperience}
                onChange={setSelectedExperience}
              />
            </div>
            <div className="flex justify-start">
              <DepartmentSelector
                title="Select Rating"
                data={ratings}
                name="ratings"
                selectedDepartment={selectedRating}
                onChange={setSelectedRating}
              />
            </div>

            {/* Buttons for cancel and update */}
            <div className="flex absolute bottom-0 right-0 p-4 col text-xs xl:text-sm justify-end gap-1 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800"
              >
                Update
              </button>
            </div>
          </div>
          <div className="grid pt-16 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 3xl:grid-cols-7 gap-8">
            {lawyers.map((lawyer, index) => (
              <div
                key={index}
                onClick={() => setIsDrawerOpen(true)}
              >
                <LawyerListingCard lawyer={lawyer} />
              </div>
            ))}
          </div>
        </div>
        <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      </section>
    </UserLayout>
  );
};

export default LawyerListing;
