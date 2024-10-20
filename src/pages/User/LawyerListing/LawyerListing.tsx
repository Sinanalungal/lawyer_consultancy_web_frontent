import React, { useEffect, useState } from "react";
import LawyerListingCard from "../../../components/LawyerListingCard/LawyerListingCard";
import Drawer from "../../../components/Drawer/Drawer";
import DepartmentSelector from "../../../components/Filter/FilterComponentDepartment";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { fetchUserSideLawyerList } from "../../../services/fetchLawyers";
import { Departments, Languages, Lawyer, States } from "../../../types";
import { fetchDepartmentsAndLanguagesAndStates } from "../../../services/AddLawyerServices";
import LanguageSelector from "../../../components/Filter/FilterComponentLanguage";
import ExperienceSelector from "../../../components/Filter/FilterComponentExperience";
import SearchComponent from "./Search";
import { AnimatePresence, motion } from "framer-motion";
import { useLoader } from "../../../components/GlobelLoader/GlobelLoader";
import { BlurFade } from "../../../components/Ui/blur-fade";

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
  const [_states, _setStates] = useState<States[] | []>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedLanguages, setSelectedLanguages] = useState<number | null>(
    null
  );
  const [selectedRating, _setSelectedRating] = useState<string>(ratings[0]);
  const [selectedExperience, setSelectedExperience] = useState<string>(
    experienceLevels[0]
  );
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerData, setDrawerData] = useState<Lawyer | null>(null);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [next, setNext] = useState<string | null>(null);
  const { setLoader } = useLoader();

  console.log(searchQuery);
  useEffect(() => {
    const fetchLawyers = async () => {
      setLoader(true);
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

        setLawyers(fetchedLawyers?.results);

        setNext(fetchedLawyers.next);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchLawyers();
  }, [selectedDepartment, selectedExperience, searchQuery, selectedLanguages]);

  useEffect(() => {
    const fetchDepartmentAndLanguages = async () => {
      try {
        const fetchedData = await fetchDepartmentsAndLanguagesAndStates();
        setDepartments(fetchedData?.departments);
        setLanguages(fetchedData?.languages);
      } catch (error) {
        console.error("Failed to fetch departments and languages:", error);
      }
    };

    fetchDepartmentAndLanguages();
  }, []);

  const handleNextCalling = async () => {
    if (next != null) {
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

        setLawyers([...lawyers, ...fetchedLawyers?.results]);

        setNext(fetchedLawyers?.next);
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
    <section className="min-h-screen mx-auto max-w-7xl relative">
      <PageTitle
        title="LAWYERS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />

      <div className="relative z-30">
        <div
          className={`sm:w-[98%] border-2 bg-white mx-auto rounded-full mb-10 h-12 flex items-center shadow ${
            searchOpen ? "justify-end sm:pr-10 pr-2" : "justify-between px-10"
          }`}
        >
          {!searchOpen && (
            <div
              onClick={() => setOpenFilter(!openFilter)}
              className="flex text-xs items-center gap-1 h-full px-3 cursor-pointer hover:bg-gray-200 rounded"
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
                  clipRule="evenodd"
                />
              </svg>
              <p>Search</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {openFilter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute z-20 left-0 right-0 bg-white shadow-md rounded-xl mx-auto sm:w-[99%] overflow-hidden"
            >
              <div className="p-10 pb-20 mt-1 max-sm:grid-cols-1 grid-cols-2 w-full sm:px-16 grid lg:grid-cols-3 xl:grid-cols-4">
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
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-8 pt-20">
        <BlurFade delay={0.25} inView>
          <div className="flex flex-wrap justify-center gap-3 py-6 px-3">
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
              <div className="flex flex-auto col-span-1 sm:col-span-2 lg:col-span-3 flex-col justify-center min-h-[200px] items-center p-4 md:p-5">
                <svg
                  className="size-10 text-gray-500 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" x2="2" y1="12" y2="12"></line>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  <line x1="6" x2="6.01" y1="16" y2="16"></line>
                  <line x1="10" x2="10.01" y1="16" y2="16"></line>
                </svg>
                <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
                  No data to show
                </p>
              </div>
            )}
          </div>
        </BlurFade>

        {next && (
          <div className="w-full flex mt-10 mb-6">
            <button
              onClick={() => handleNextCalling()}
              className="py-2 text-xs px-4 mx-auto bg-slate-600 text-white font-semibold rounded-full hover:bg-slate-700 focus:outline-none"
            >
              More Lawyers
            </button>
          </div>
        )}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        lawyer={drawerData}
      />
    </section>
  );
};

export default LawyerListing;
