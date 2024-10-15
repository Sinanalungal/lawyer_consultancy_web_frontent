import React, { useState } from "react";
import { HoverEffect } from "../Ui/card-hover-effect";
import Particles from "../Ui/Particles-ui";

const services = [
  {
    title: "Legal Advice.",
    description:
      "Offer general or specific legal advice on various legal matters such as family law, business law, immigration law, etc.",
  },
  {
    title: "Consultation",
    description:
      "Facilitate one-on-one consultations between clients and lawyers via video calls or chat sessions to discuss legal issues and receive guidance.",
  },
  {
    title: "Legal Updates.",
    description:
      "Keep users informed about changes in laws, regulations, and legal precedents relevant to their areas of interest or other information through the blog.",
  },
  {
    title: "Case Allocation.",
    description:
      "Users can find and connect with the best-fit lawyers for their cases based on expertise, experience, and user ratings.",
  },
];

const ServicesGrid: React.FC = () => {
  const [color, _setColor] = useState("#000000");

  return (
    <div className="relative">
      <Particles
        className="absolute inset-0"
        quantity={700}
        ease={80}
        color={color}
        refresh
      />
      <div className="container max-w-7xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center max-sm:text-2xl sm:px-10  py-4 mb-5 text-[#1e266e]">
          Comprehensive Legal Solutions Tailored to Your Needs
        </h2>
        <div className="max-w-6xl mx-auto sm:px-8  ">
          <HoverEffect items={services} />
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
