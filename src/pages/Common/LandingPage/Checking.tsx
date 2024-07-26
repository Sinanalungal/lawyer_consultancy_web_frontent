// HeroSection.tsx
import React from "react";
import { Link } from "react-router-dom";
import FadeInWhenVisible from "../../../components/Animation/FadeInWhenVisible";

interface HeroSectionProps {
  title: string;
  title1: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  borderText: string;
}

interface FeatureCardProps {
  iconPath: string;
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  title1,
  borderText,
}) => {
  return (
    <section className=" sm:pt-32  pt-24 pb-14 flex items-center  bg-gradient-to-b from-[#f7f8fb] to-[#ffffff] bg-center bg-cover">
      <div className="mx-auto  max-w-7xl  px-4 sm:px-6 lg:px-8 relative text-center">
        <FadeInWhenVisible>
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl max-sm:text-3xl sm:grid  text-gray-900 mb-5 md:text-5xl leading-[50px]">
            {title} <span className="text-indigo-600 mt-1">{title1}</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base max-sm:text-[13px] font-normal sm:leading-7 text-gray-500 mb-9">
            {subtitle}
          </p>
          <div className="-space-x-2 pb-5 mx-auto w-full  flex justify-center ">
            <img
              className="inline-block size-9 rounded-full ring-2 ring-white  dark:ring-neutral-900"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Image Description"
            />
            <img
              className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-neutral-900"
              src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Image Description"
            />
            <img
              className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-neutral-900"
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
              alt="Image Description"
            />
            <img
              className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-neutral-900"
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
              alt="Image Description"
            />
          </div>
          <Link
            to={buttonLink}
            className="sm:w-full md:w-auto  inline-flex items-center justify-center py-3 px-7  text-base max-sm:text-xs font-semibold text-center text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500"
          >
            {buttonText}
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className=" mx-auto  grid max-[400px]:grid-cols-1 grid-cols-2  sm:grid-cols-3 mt-8 gap-2">
            <FeatureCard
              iconPath="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z"
              title="Flexible Scheduling"
              description="Flexible time sessions"
            />
            <FeatureCard
              iconPath="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              title="Trusted"
              description="4.8 ★"
            />
            <FeatureCard
              iconPath="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              title="Security"
              description="Ensures security"
            />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default HeroSection;

const FeatureCard: React.FC<FeatureCardProps> = ({
  iconPath,
  title,
  description,
}) => (
  <div className="  sm:border-r-2 max-sm:bg-slate-50 rounded flex flex-col justify-center  items-center p-4">
    <p className="flex justify-center gap-1 text-gray-800 text-xs items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 "
      >
        <path d={iconPath} />
      </svg>
      {title}
    </p>
    <p className="text-[11px] flex items-center text-gray-600">{description}</p>
  </div>
);
