import React from "react";

interface TeamMemberProps {
  name: string;
  experience: string;
  language: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  experience,
  language,
  image,
}) => {
  return (
    <div className="relative">

      <div className="relative bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden xl:w-[400px] md:w-[300px] z-10 p-4">
        <div className="flex items-center space-x-4">
          <img
            className="h-12 z w-12 rounded-full object-cover"
            src={image}
            alt={name}
          />
          <div>
            <h3 className="text-base font-semibold text-blue-gray">{name}</h3>
            <p className="text-[13px] text-gray font-normal">
              <strong>Experience:</strong> {experience}
            </p>
            <p className="text-[13px] text-gray font-normal">
              <strong>Language:</strong> {language}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamMemberCard;
