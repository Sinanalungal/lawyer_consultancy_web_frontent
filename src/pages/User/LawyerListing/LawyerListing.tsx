import React, { useEffect, useState } from "react";
import LawyerListingCard from "../../../components/LawyerListingCard/LawyerListingCard";
import Drawer from "../../../components/Drawer/Drawer";
import DepartmentSelector from "../../../components/Filter/FilterComponentDepartment";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { fetchUserSideLawyerList } from "../../../services/fetchLawyers";
import { Departments, Languages, Lawyer } from "../../../types";
import { fetchDepartmentsAndLanguages } from "../../../services/AddLawyerServices";
import LanguageSelector from "../../../components/Filter/FilterComponentLanguage";
import ExperienceSelector from "../../../components/Filter/FilterComponentExperience";
import SearchComponent from "./Search";
import { motion } from "framer-motion";


const experienceLevels: string[] = [
  "All",
  "Less than five",
  "In between five to ten",
  "Greater than ten",
];

interface LawyerListResponse {
  count?: number;
  next?: any;
  previous?: string | null;
  results: Lawyer[];
}
const ratings: string[] = ["All", "1 ⭐", "2 ⭐", "3 ⭐", "4 ⭐", "5 ⭐"];

const LawyerListing: React.FC = () => {
  const [departments, setDepartments] = useState<Departments[] | []>([]);
  const [languages, setLanguages] = useState<Languages[] | []>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedLanguages, setSelectedLanguages] = useState<number | null>(
    null
  );
  const [selectedRating, setSelectedRating] = useState<string>(ratings[0]);
  const [selectedExperience, setSelectedExperience] = useState<string>(
    experienceLevels[0]
  );
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerData, setDrawerData] = useState<Lawyer | null>(null);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const [currentPage, setCurrentPage] = useState<string>(); // For pagination
  const [next, setNext] = useState<string | null>(null); // Total number of pages
  console.log(searchQuery);
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const params = {
          department: selectedDepartment || "",
          experience: selectedExperience || "",
          language: selectedLanguages || "",
          search: searchQuery,
        };
        const fetchedLawyers: LawyerListResponse = await fetchUserSideLawyerList(
          "userside/lawyers/",
          params as any
        );
        
        // const newLawyers = fetchedLawyers.results.filter(
        //   (lawyer) => !lawyers.some((existing) => existing.pk === lawyer.pk)
        // );
  
        setLawyers(fetchedLawyers?.results); 
  
        // if (fetchedLawyers.next) {
          setNext(fetchedLawyers.next);
        // } 
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    };
  
    fetchLawyers();
  }, [
    selectedDepartment,
    selectedExperience,
    searchQuery,
    selectedLanguages,
  ]);
  

  useEffect(()=>{
    const fetchDepartmentAndLanguages = async () => {
      try {
        const fetchedData = await fetchDepartmentsAndLanguages();
        setDepartments(fetchedData?.departments);
        setLanguages(fetchedData?.languages);
      } catch (error) {
        console.error("Failed to fetch departments and languages:", error);
      }
    };

    fetchDepartmentAndLanguages();
  },[])

  const handleNextCalling = async() => {

    if (next!=null) {
      try {
        const params = {
          department: selectedDepartment || "",
          experience: selectedExperience || "",
          language: selectedLanguages || "",
          search: searchQuery,
        };
        const fetchedLawyers: LawyerListResponse = await fetchUserSideLawyerList(
          next,
          params as any
        );
      
        setLawyers([...lawyers,...fetchedLawyers?.results]); 
  
        // if (fetchedLawyers.next) {
        setNext(fetchedLawyers?.next);
        // }
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    }
  };
  const handleCancel = () => {
    setOpenFilter(false);
  };

  const handleUpdate = () => {
    console.log("Filters applied:", {
      selectedDepartment,
      selectedExperience,
      selectedRating,
    });
    setOpenFilter(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <section className="min-h-screen mx-auto">
      <PageTitle
        title="LAWYERS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />

      <div
        className={`w-full relative h-12 border-gray-300 flex items-center border-t border-b ${
          searchOpen ? "justify-end sm:pr-10 pr-2" : "justify-between px-10"
        }`}
      >
        {!searchOpen && (
          <div
            onClick={() => setOpenFilter(!openFilter)}
            className="flex text-xs items-center gap-1 h-full px-3 border-r cursor-pointer hover:bg-gray-200 rounded"
          >
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
        )}
        {searchOpen ? (
          <div className="absolute">
            <SearchComponent
              setSearchOpen={setSearchOpen}
              onSearch={handleSearch}
            />
          </div>
        ) : (
          <div
            onClick={() => setSearchOpen(true)}
            className="text-xs text-slate-600 items-center font-medium flex gap-1 cursor-pointer px-3 h-full hover:bg-gray-200 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>

            <p>Search</p>
          </div>
        )}
      </div>

      <div className="flex relative justify-center transform ">
        <motion.div
          className={
            openFilter
              ? "absolute p-10 pb-20 bg-white border-b max-sm:grid-cols-1 z-30 grid-cols-2 w-full sm:px-16 grid lg:grid-cols-3 xl:grid-cols-4"
              : "hidden"
          }
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: openFilter ? 1 : 0, y: openFilter ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-start">
            <DepartmentSelector
              title="Select Department"
              data={departments}
              name="department"
              selectedDepartment={selectedDepartment}
              onChange={setSelectedDepartment}
            />
          </div>
          <div className="flex items-start justify-start">
            <LanguageSelector
              title="Select Languages"
              data={languages}
              name="language"
              selectedlanguages={selectedLanguages}
              onChange={setSelectedLanguages}
            />
          </div>

          <div className="items-start flex justify-start">
            <ExperienceSelector
              title="Select Experience"
              data={experienceLevels}
              name="experienceLevels"
              selectedKey={selectedExperience}
              onChange={setSelectedExperience}
            />
          </div>

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
        </motion.div>
        <div className="grid pt-16 xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 3xl:grid-cols-7 gap-8">
          {lawyers && Array.isArray(lawyers) && lawyers.length > 0 ? (
            lawyers.map((lawyer, index) => (
              <div
                key={index}
                onClick={() => {
                  setIsDrawerOpen(true);
                  setDrawerData(lawyer);
                }}
              >
                <LawyerListingCard lawyer={lawyer} />
              </div>
            ))
          ) : (
            // <p className="flex justify-center items-center min-h-[200px] text-gray-500">No Lawyers available</p>
<div className="flex flex-auto xl:col-span-4 lg:col-span-3 col-span-1 sm:col-span-2 2xl:col-span-5 3xl:col-span-7 flex-col justify-center min-h-[200px] items-center p-4 md:p-5">
    <svg className="size-10 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" x2="2" y1="12" y2="12"></line>
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
      <line x1="6" x2="6.01" y1="16" y2="16"></line>
      <line x1="10" x2="10.01" y1="16" y2="16"></line>
    </svg>
    <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
      No data to show
    </p>
</div>
            // <p className="xl:col-span-4 lg:col-span-3 h-[200px] text-xs text-center flex items-center col-span-1 sm:col-span-2 2xl:col-span-5 3xl:col-span-7">No lawyers available</p>
          )}
        </div>
      </div>
      {next && (
        <div className="w-full flex mt-10 mb-6">
          <button
            onClick={() => handleNextCalling()}
            className="py-2 text-xs px-4 mx-auto  bg-slate-600 text-white font-semibold rounded-full  hover:bg-slate-700 focus:outline-none "
          >
            More Lawyers
          </button>
        </div>
      )}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        lawyer={drawerData}
      />
    </section>
  );
};

export default LawyerListing;
