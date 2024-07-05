import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import LawyerCard from "../../../components/LawyerCard/LawyerCard";
import { useDispatch, useSelector } from "react-redux";
// import { fetchLawyersAsync } from "../../../redux/slice/LawyerDataFetchingAction";
import { RootState } from "../../../redux/store";
import SearchForm from "../../../components/Search/Search";
import { AiFillMessage } from "react-icons/ai";
import { IoCallSharp } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

interface LawyerListingProps {}

const LawyerListing: React.FC<LawyerListingProps> = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [lawyerSelected, setLawyersSelected] = useState<boolean>(false);

  // useEffect(() => {
  //   dispatch(fetchLawyersAsync({ selectedDepartment, selectedExperience, searchQuery }));
  // }, [selectedDepartment, selectedExperience, searchQuery, dispatch]);

  return (
    <UserLayout>
      <section className="bg-gray-100 xl:container mx-auto xl:px-10 py-10">
        <div
          className={`w-full mt-5 px-4 gap-1  xl:gap-4   grid  ${
            lawyerSelected ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          <div className="col-span-2 rounded-xl ">
            <div className="max-xl:px-4">
              {/* left side div */}
              <div
                className={`flex   justify-between ${!searchOpen && "pb-4"}`}
              >
                <PageTitle title={"TAKE A CONSULTATION"} />
                {!searchOpen ? (
                  <div
                    onClick={() => setSearchOpen(true)}
                    className="h-10 cursor-pointer shadow-xl w-10 border bg-white border-gray-200 flex justify-center items-center rounded-full"
                  >
                    <svg
                      className="  h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={() => setSearchOpen(false)}
                    className="h-10 cursor-pointer shadow-xl w-10 border bg-white border-gray-200 flex justify-center  items-center rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#bbbbbb"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>{" "}
                  </div>
                )}
              </div>
              {searchOpen && (
                <div className="flex justify-end w-full">
                  <div className="flex-grow   w-full  pt-2 justify-end  pb-5">
                    <SearchForm />
                  </div>
                </div>
              )}
              <div
                className={`${
                  lawyerSelected ? "" : "grid lg:grid-cols-2 gap-1"
                }`}
              >
                <div
                  className={`w-full  bg-white border border-gray-100 shadow-xl px-5 py-3 mt-2 rounded-xl `}
                >
                  <div className="w-full mb-2 ">
                    <h2 className="xl:text-lg text-sm font-medium text-gray-500 dark:text-white ">
                      Choose Department
                    </h2>
                  </div>
                  <div className="w-full mb-4 flex flex-wrap gap-1">
                    <div className="flex-grow-0  py-1 px-2  text-[7px] rounded-full bg-blue-100 border border-blue-200 text-blue-400">
                      gdfgdfgfdg
                    </div>
                    <div className="flex-grow-0 bg-gray-200 py-1 px-2 text-slate-800 text-[7px] rounded-full">
                      another item
                    </div>
                    <div className="flex-grow-0 bg-gray-200 py-1 px-2 text-slate-800 text-[7px] rounded-full">
                      more items
                    </div>
                  </div>
                </div>
                <div className="w-full shadow-xl mt-2 bg-white border border-gray-100 px-5 py-3 rounded-xl">
                  <div className="w-full mb-2">
                    <h2 className="xl:text-lg text-sm font-medium text-gray-500 dark:text-white">
                      Choose Experience
                    </h2>
                  </div>
                  <div className="w-full mb-4 flex flex-wrap gap-1">
                    <div className="flex-grow-0 bg-gray-200 py-1 px-2 text-slate-800 text-[7px] rounded-full">
                      gdfgdfgfdg
                    </div>
                    <div className="flex-grow-0 bg-gray-200 py-1 px-2 text-slate-800 text-[7px] rounded-full">
                      another item
                    </div>
                    <div className="flex-grow-0 bg-gray-200 py-1 px-2 text-slate-800 text-[7px] rounded-full">
                      more items
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* lawyer Data listing Here */}
            <div className="max-xl:px-4">
              <div className="w-full shadow-xl  mt-2 bg-white border border-gray-100 px-5 py-3 rounded-xl">
                <h2 className="xl:text-lg flex justify-between text-sm font-medium  py-2 text-gray-500 dark:text-white">
                  <p>Choose Lawyer</p>
                  <div className="flex gap-2 items-center">
                    <IoArrowBack />
                    <IoArrowForwardOutline />
                  </div>
                </h2>
                <div className={`grid gap-1   my-3 ${lawyerSelected?'lg:grid-cols-2':'lg:grid-cols-3 sm:grid-cols-2'}`}>
                  <div onClick={()=>setLawyersSelected(true)} className="flex cursor-pointer items-center rounded-2xl border border-blue-400 bg-blue-200 px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div>
                  <div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div>
                  <div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div><div  onClick={()=>setLawyersSelected(true)}  className="flex cursor-pointer items-center rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-lg overflow-hidden trun">
                    <img
                      className="h-14  w-14 rounded-md object-cover"
                      src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/01/dileep-1641808836.jpg"
                      alt="Simon Lewis"
                    />
                    <p className="ml-4 overflow-hidden ">
                      <strong className="block w-full text-lg truncate font-medium ">
                        Dileepettan dsfsdflkdfldfkdlflkdlkfklddfdsfdfsdfdfdf
                      </strong>
                      <span className="text-xs text-gray-400">
                        Experience: 1yr
                      </span>
                      <div className="mt-1 flex items-center">
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-yellow-500 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                        <svg
                          className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            className=""
                          ></path>
                        </svg>
                      </div>
                    </p>
                  </div>
                  
           
                </div>

              </div>
            </div>
          </div>
          {lawyerSelected && (
            <div className=" bg-white shadow-xl max-h-[550px] border border-gray-100 rounded-xl p-10 ">
              <div className="relative mx-auto max-w-36 rounded-md ">
                <span className="absolute right-0  h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                <img
                  className="mx-auto h-auto w-full rounded-md"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <h3 className="text-xl mt-3 font-semibold text-center leading-6 text-gray-600">
                John Doe
              </h3>
              <p className="text-[14px]   text-center text-gray-400">Lawyer</p>
              <p className="text-[14px] max-sm:text-[10px]  text-center leading-5 text-gray-400">
                Experience : <span className="font-medium">1yr</span>
              </p>
              <p className="text-[14px] max-sm:text-[10px]  text-center mb-4 text-gray-400">
                Language : <span className="font-medium">English</span>
              </p>

              <div className="  flex w-full justify-center gap-2 my-3 h-10">
                <div className="w-10 h-full rounded-full bg-white border text-black flex hover:bg-blue-100 justify-center cursor-pointer hover:text-slate-700 items-center">
                  <AiFillMessage size={25} />{" "}
                </div>
                <div className="w-10 h-full rounded-full bg-white border flex hover:bg-blue-100 justify-center hover:text-slate-700 cursor-pointer items-center">
                  {" "}
                  <IoCallSharp size={25} />
                </div>
              </div>

              <p className="text-center text-sm max-sm:text-xs leading-6 text-gray-500 hover:text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto, placeat!
              </p>
            </div>
          )}
        </div>
      </section>
    </UserLayout>
  );
};

export default LawyerListing;
