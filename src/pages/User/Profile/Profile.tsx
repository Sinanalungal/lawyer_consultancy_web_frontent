import React from "react";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <>
      <div className="w-full min-h-[400px] bg-white">
        <ProfileSection />
      </div>
    </>
  );
};

export default Profile;
