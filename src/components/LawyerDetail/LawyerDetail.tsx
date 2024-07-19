import React from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { IoCallSharp } from 'react-icons/io5';

interface LawyerDetailProps {
  setModalOpen: (open: boolean) => void;
}

const LawyerDetail: React.FC<LawyerDetailProps> = ({ setModalOpen }) => {
  return (
    <div>
      <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
        LAWYER DETAIL
      </h3>

      <div className="bg-white max-h-[550px] grid grid-cols-2 max-sm:grid-cols-1 rounded-xl p-10">
        <div>
          <div className="relative mx-auto max-w-36 rounded-md">
            <span className="absolute right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <img
              className="mx-auto h-auto w-full rounded-md"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <div className="flex w-full justify-center max-sm:hidden gap-2 my-3 h-10">
              <div className="w-10 h-full rounded-full bg-white border text-black flex hover:bg-blue-100 justify-center cursor-pointer hover:text-slate-700 items-center">
                <AiFillMessage size={25} />
              </div>
              <div className="w-10 h-full rounded-full bg-white border flex hover:bg-blue-100 justify-center hover:text-slate-700 cursor-pointer items-center">
                <IoCallSharp size={25} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl mt-3 font-semibold sm:text-start text-center leading-6 text-gray-600">
            John Doe
          </h3>
          <p className="text-[14px] sm:text-start mt-2 text-center text-gray-400">Lawyer</p>
          <p className="text-[14px] max-sm:text-[10px] mt-2 sm:text-start text-center leading-5 text-gray-400">
            Experience : <span className="font-medium">1yr</span>
          </p>
          <p className="text-[14px] max-sm:text-[10px] mt-2 sm:text-start text-center mb-4 text-gray-400">
            Language : <span className="font-medium">English</span>
          </p>

          <div className="flex w-full justify-center sm:hidden gap-2 my-3 h-10">
            <div className="w-10 h-full rounded-full bg-white border text-black flex hover:bg-blue-100 justify-center cursor-pointer hover:text-slate-700 items-center">
              <AiFillMessage size={25} />
            </div>
            <div className="w-10 h-full rounded-full bg-white border flex hover:bg-blue-100 justify-center hover:text-slate-700 cursor-pointer items-center">
              <IoCallSharp size={25} />
            </div>
          </div>

          <p className="text-center sm:text-start text-sm max-sm:text-xs leading-6 text-gray-500 hover:text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!
          </p>
        </div>
      </div>

      <div className="-mx-3 flex max-[400px]:flex-col max-[400px]:items-center max-[400px]:space-y-1 flex-wrap">
        <div className="w-1/2 px-3">
          <button
            onClick={() => setModalOpen(false)}
            className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
          >
            Cancel
          </button>
        </div>
        <div className="w-1/2 px-3">
          <button className="block w-full rounded-md border border-primary bg-blue-700 p-3 text-center text-base font-medium text-white transition hover:bg-blue-800">
            <a href={'/#'}> Book Session </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerDetail;
