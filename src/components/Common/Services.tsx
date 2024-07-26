import React from 'react';
import FadeInWhenVisible from '../Animation/FadeInWhenVisible'; 
import PageTitle from '../PageTitle/PageTitle';

interface ServicesProps {
}

const Services: React.FC<ServicesProps> = () => {
  return (
    <section className="w-full  bg-white    border-gray-100  mb-6 text-gray-800 px-6 bg-cover bg-no-repeat bg-center" style={{
      backgroundImage: "url('./Curve Line.svg')"
    }}>
      <div className="container mx-auto w-full lg:px-20">
        <FadeInWhenVisible>
        {/* <div className="w-full "> 
        <h2 className=" text-3xl text-center font-bold text-blue-900 sm:text-4xl xl:text-5xl">
              Our Services
            </h2>         
             <p className="mx-auto mb-4 max-w-xl py-2 text-center text-gray-600 sm:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio reprehenderit accusamus incidunt.</p>
        </div> */}
        <PageTitle title='Our Services' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio reprehenderit accusamus incidunt.'/>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
        <div className="flex flex-col mb-10 lg:flex-row">
          <div className="w-full p-4 text-left lg:w-1/3">
            <hr className="mb-4 h-1.5 w-1/4 bg-slate-700" />
            <h3 className="font-sans max-sm:text-2xl font-medium text-3xl  leading-10">Legal Advice.</h3>
            <p className="my-5 sm:text-sm text-[14px] text-gray-600">Offer general or specific legal advice on various legal matters such as family law, business law, immigration law, etc.</p>
          </div>
          <div className="w-full p-4 text-left lg:w-1/3">
            <hr className="mb-4 h-1.5 w-1/4 bg-slate-700" />
            <h3 className="font-sans max-sm:text-2xl font-medium text-3xl  leading-10">Consultation.</h3>
            <p className="my-5 sm:text-sm text-[14px] text-gray-600">Facilitate one-on-one consultations between clients and lawyers via video calls or chat sessions to discuss legal issues and receive guidance.</p>
          </div>
          <div className="w-full p-4 text-left lg:w-1/3">
            <hr className="mb-4 h-1.5 w-1/4 bg-slate-700" />
            <h3 className="font-sans max-sm:text-2xl text-3xl font-medium leading-10">Legal Updates.</h3>
            <p className="my-5 sm:text-sm text-[14px] text-gray-600">Keep users informed about changes in laws, regulations, and legal precedents relevant to their areas of interest or other information through the blog.</p>
          </div>
        </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default Services;
