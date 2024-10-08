import React from "react";
import Particles from "../../../components/Ui/Particles-ui";

interface Content {
  title: string;
  description: string;
}

interface LawyerFirmSectionProps {
  content: Content[];
}

const LawyerFirmSection: React.FC<LawyerFirmSectionProps> = ({ content }) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center max-sm:text-2xl sm:px-10  py-4 mb-5 text-[#1e266e]">
        Navigate Your Legal Journey with Us
      </h2>
      <div className="container mb-20 max-w-7xl mx-auto p-2">
        <img
          src="/lawyer-firm-image.jpg"
          alt="Lawyer Firm"
          className="h-[500px] w-full object-cover rounded-2xl"
          style={{
            maskImage: `linear-gradient(to top, transparent, black 20%)`,
          }}
        />
      </div>
      <div className="relative xl:px-32   mb-10">
        <Particles
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={"#000000"}
          refresh
        />
        <div className=" top-0 sm:px-24 md:px-4 left-0 -mt-60 right-0 grid grid-cols-1 md:flex justify-center gap-4 p-4">
          {content.map((item, index) => (
            <div
              key={index}
              className="bg-[#F5F5F7] shadow-md md:max-w-[400px] dark:bg-neutral-800 p-8 lg:p-14 rounded-3xl z-10"
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                  {item.title}
                </span>{" "}
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerFirmSection;
