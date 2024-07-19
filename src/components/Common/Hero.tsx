import React from "react";
import LawyerImg from "/landing_page_lawyer_image.webp";
import { TypewriterEffectSmooth } from "../Ui/typewritter-effect";


const Hero: React.FC = () => {
  const words = [
    {
      text: "Legal",
    },
    {
      text: "Advice",
    },
    {
      text: "Online",
    },
    
  ];

  const second = [
    {
      text: "From",
      className: "text-blue-600 dark:text-blue-600",
    },
    {
      text: "Top",
      className: "text-blue-600 dark:text-blue-600",
    },
    {
      text: "Lawyers",
      className: "text-blue-600 dark:text-blue-600",
    },
   
  ];
  return (
    <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 xl:px-8 lg:px-16 ">
        <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
          <div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl max-xl:hidden font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-5xl xl:text-6xl font-pj">
                <TypewriterEffectSmooth words={words} isFirst={true} />
                <TypewriterEffectSmooth words={second} />
              </h1>
              <h1 className="text-4xl xl:hidden font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-5xl xl:text-6xl font-pj">
                Legal Advice Online From Top Lawyers
              </h1>
              <p className="mt-2 text-base text-gray-600 sm:mt-8 xl:mt-4 font-inter">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
              <button
                      type="submit"
                      className="inline-flex px-6 py-3 mt-10 xl:mt-6 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-gray-600 font-pj hover:bg-gray-600"
                    >
                      Get Free Card
                    </button>
            </div>

            
          </div>

          <div>
            <img className="w-full xl:h-auto lg:h-[600px] object-cover rounded-lg" src={LawyerImg} alt="Lawyer_Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
