import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import PageTitle from "../../../components/PageTitle/PageTitle";
import FadeInWhenVisible from "../../../components/Animation/FadeInWhenVisible";

const items = [
  <div className="w-full rounded-xl h-full bg-red-500 flex items-center justify-center">
    <img
      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2031"
      className="object-cover rounded-xl h-full w-full"
      alt="User 1"
    />
  </div>,
  <div className="w-full rounded-xl h-full bg-blue-500 flex items-center justify-center">
    <img
      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2031"
      className="object-cover rounded-xl h-full w-full"
      alt="User 2"
    />
  </div>,
  <div className="w-full rounded-xl h-full bg-green-500 flex items-center justify-center">
    <img
      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2031"
      className="object-cover rounded-xl h-full w-full"
      alt="User 3"
    />
  </div>,
];

const ThirdLayer: React.FC = () => {
  return (
    <>
    <FadeInWhenVisible>
      <PageTitle
        title="Experienced Lawyers"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s"
      />
      <div className=" mx-auto max-sm:grid max-sm:grid-cols-1 container min-[400px]:px-6 px-3 xl:px-16 2xl:px-40 ">
        <div className="sm:flex max-sm:space-y-3 max-sm:px-10 shadow max-[400px]:px-3   sm:gap-4  p-3 rounded-2xl items-center justify-center ">
          <Carousel items={items} />
          <div className=" 2xl:px-20 md:px-10 max-sm:h-auto p-3 py-5 3xl:text-lg   text-gray-600 overflow-hidden max-sm:text-sm  sm:text-sm  w-full sm:h-[520px]  lg:h-[400px] flex items-center rounded-xl sm:p-4 ">
            <p className="p-1 line-clamp-[20]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
              
            </p>
          </div>
        </div>
      </div>
      </FadeInWhenVisible>
    </>
  );
};

export default ThirdLayer;
