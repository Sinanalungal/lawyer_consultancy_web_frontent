// Profile.tsx
import React from "react";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import ProfileSection from "../../../components/ProfileSection/ProfileSection";
import Tab from "../../../components/TabComponents/Tab";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <>
      {/* <UserLayout> */}
        <div className="w-full min-h-screen">
          <ProfileSection />
          <Tab />
        </div>
      {/* </UserLayout> */}
    </>
  );
};

export default Profile;
