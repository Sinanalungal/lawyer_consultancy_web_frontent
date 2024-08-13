import React from "react";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";
import Tab from "../../../components/TabComponents/Tab";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <>
        <div className="w-full min-h-screen">
          <ProfileSection />
          <Tab />
        </div>
    </>
  );
};

export default Profile;
