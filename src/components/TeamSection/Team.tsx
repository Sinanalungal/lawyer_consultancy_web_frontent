import React from "react";
import { CardStack } from "../Ui/card-stack";
import FadeInWhenVisible from '../Animation/FadeInWhenVisible'; 

interface TeamMember {
  name: string;
  experience: string;
  language: string;
  image: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const Team: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  return (
    <div className="container mx-auto rounded-lg px-2  py-4 sm:py-8 md:py-16">
      <FadeInWhenVisible>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 xl:py-28  bg-gradient-to-l from-[#dfe9f3] to-[#ffffff] xl:px-16 px-4 py-8 rounded-lg">
        <div className="w-full flex justify-center items-center">
          <section className="dark:bg-gray-900">
            <div className="p-2 rounded-xl flex justify-center items-center">
              <div className="w-full md:max-w-[40rem]">
                <CardStack items={teamMembers} />
              </div>
            </div>
          </section>
        </div>
        <div className="w-full flex justify-center items-center md:pr-12">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Find your career path
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero
              aliquid sint distinctio iure ipsum cupiditate? Quis, odit
              assumenda? Deleniti quasi inventore, libero reiciendis minima
              aliquid tempora. Obcaecati, autem.
            </p>
            <a
              href="#"
              className="mt-8 inline-block rounded bg-slate-700 px-12 py-3 text-sm font-medium text-white transition hover:bg-slate-600 focus:outline-none"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
      </FadeInWhenVisible>
    </div>
  );
};

export default Team;
