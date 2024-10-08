// HeroSection.tsx
import React from "react";

interface HeroSectionProps {}


const HeroSection: React.FC<HeroSectionProps> = ({}) => {
  return (
    <div className="relative  pb-0 p-4 max-lg:m-3  max-lg:rounded-lg max-lg:pt-20 max-lg:bg-black flex items-end  justify-center">
      {/* <div className="absolute top-0 left-0 right-0 h-full bg-black opacity-30"></div> */}

      <div
        className="text-white xl:w-[1700px] grid-cols-1 lg:bg-black lg:p-10 lg:pb-0  rounded-2xl max-lg:gap-3 lg:grid-cols-2 grid  text-center z-10"
        style={{
          maskImage: `linear-gradient(to top, transparent 0%, black 1%, black 99%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to top, transparent 0%, black 1%, black 99%, transparent 100%)`,
        }}
      >
        <div className="flex flex-col justify-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl max-sm:text-2xl mb-5 md:text-4xl xl:text-5xl leading-[50px]">
            {"Legal Advice Online"}
            <span className="block text-blue-500 mt-1">
              {"From Online Top Lawyers"}
            </span>
          </h1>
          <p className="mt-2 text-sm max-sm:text-[10px]">
            Expert legal guidance at your fingertips, anytime, anywhere.
          </p>
          <button className="mt-8 px-6 mx-auto max-sm:w-36 w-44 py-3 max-sm:text-xs bg-blue-600 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300">
            Find Lawyers
          </button>
        </div>

        <div className="">
          <img
            src="/3d-cartoon-portrait-person-practicing-law-profession.png"
            className="xl:h-[600px] object-cover min-[400px]:h-[300px] sm:h-[400px] mx-auto sm:w-[400px] xl:w-[600px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
