import React, { useState } from "react";
import EditProfileTabs from "../../../components/TabComponents/EditProfileTab";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import PageTitle from "../../../components/PageTitle/PageTitle";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import EditPassword from "../../../components/ProfileForm/EditPassword";
import { RootState, useAppSelector } from "../../../redux/store";
import UserProfilePicture from "../../../components/ProfilePicManager/ProfilePicManager";

const EditProfilePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Edit Profile");
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const tabs = ["Edit Profile", "Change Password", "Settings", "Invoice"];

  return (
    // <UserLayout>
      <div className="mb-16 max-w-7xl mx-auto">
        <PageTitle
          title="EDIT PROFILE"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        />
        <div className="max-sm:px-10">
        <UserProfilePicture
          profileImage={userDetail?.profile_image ?? ""}
          fullName={userDetail?.full_name ?? ""}
          // onUploadClick={handleUploadClick}
          // onDeleteClick={handleDeleteClick}
        />
        </div>
        <div className="px-10 max-w-8xl mx-auto  sm:flex  ">
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
            {selectedTab === "Settings" && <div>Settings Content</div>}
            {selectedTab === "Invoice" && <div>Invoice Content</div>}
          </div>
        </div>
      </div>
    // </UserLayout>
  );
};

export default EditProfilePage;
