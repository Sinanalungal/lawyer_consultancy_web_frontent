import React from 'react';
import FadeInWhenVisible from '../Animation/FadeInWhenVisible'; 

interface ServicesProps {
}

const Services: React.FC<ServicesProps> = () => {
  return (
    <section className="w-full bg-white py-10 mb-6 text-gray-800 px-6">
      <div className="container mx-auto w-full max-w-screen-xl">
        <FadeInWhenVisible>
        <div className="w-full my-10"> 
        <h2 className="mt-4 text-3xl text-center font-bold text-blue-900 sm:text-4xl xl:text-5xl">
              Our Services
            </h2>         
             <p className="mx-auto mb-4 max-w-xl py-2 text-center text-gray-600 sm:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio reprehenderit accusamus incidunt.</p>
        </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full p-4 text-left lg:w-1/3">
            <hr className="mb-4 h-1.5 w-1/4 bg-slate-700" />
            <h3 className="font-sans text-4xl font-light leading-10">Legal Advice.</h3>
            <p className="my-5 text-gray-600">Offer general or specific legal advice on various legal matters such as family law, business law, immigration law, etc.</p>
          </div>
          <div className="w-full p-4 text-left lg:w-1/3">
            <hr className="mb-4 h-1.5 w-1/4 bg-slate-700" />
            <h3 className="font-sans text-4xl font-light leading-10">Consultation.</h3>
            <p className="my-5 text-gray-600">Facilitate one-on-one consultations between clients and lawyers via video calls or chat sessions to discuss legal issues and receive guidance.</p>
          </div>
          <div className="w-full p-4 text-left lg:w-1/3">
            <hr className="mb-4 h-1.5 w-1/4 bg-slate-700" />
            <h3 className="font-sans text-4xl font-light leading-10">Legal Updates.</h3>
            <p className="my-5 text-gray-600">Keep users informed about changes in laws, regulations, and legal precedents relevant to their areas of interest or other information through the blog.</p>
          </div>
        </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default Services;
