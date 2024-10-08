import React, { useState } from "react";
import EditPassword from "../../../components/ProfileForm/EditPassword";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import { RootState, useAppSelector } from "../../../redux/store";
import UserProfilePicture from "../../../components/ProfilePicManager/ProfilePicManager";
import EditProfileTabs from "../../../components/TabComponents/EditProfileTab";

const LawyerProfile: React.FC = () => {
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const [selectedTab, setSelectedTab] = useState<string>("Edit Profile");
  const tabs = ["Edit Profile", "Change Password"];
  return (
    <div className="w-full  min-h-screen">
      <div className="mb-16 ">
        <div className="  sm:px-16 flex-wrap sm:flex mb-3  py-2 ">
          <h1 className="w-full text-center pb-1 max-[400px]:text-2xl  text-gray-700 font-semibold text-3xl">
            Profile
          </h1>
          <p className="mb-6 flex justify-center w-full text-sm max-sm:text-xs text-gray-600">
            Here you can update your profile
          </p>
        </div>
        <UserProfilePicture
          profileImage={userDetail?.profile_image ?? ""}
          fullName={userDetail?.full_name ?? ""}
        />
        <div className="  sm:flex  ">
          <EditProfileTabs
            options={tabs}
            selected={selectedTab}
            onSelect={setSelectedTab}
          />
          <div className="max-sm:mt-6  p-3 w-full">
            {selectedTab === "Edit Profile" && (
              <div>
                <ProfileForm />
              </div>
            )}
            {selectedTab === "Change Password" && (
              <div>
                <EditPassword />
              </div>
            )}
            {/* {selectedTab === "Settings" && <div>Settings Content</div>}
            {selectedTab === "Invoice" && <div>Invoice Content</div>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
