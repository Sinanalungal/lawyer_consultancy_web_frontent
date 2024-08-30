import React from "react";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";
import Tab from "../../../components/TabComponents/Tab";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <>
        <div className="w-full min-h-[400px]">
          <ProfileSection />
          <Tab />
        </div>
    </>
  );
};

export default Profile;
