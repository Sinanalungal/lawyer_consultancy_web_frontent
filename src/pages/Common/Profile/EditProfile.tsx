import React, { useState } from "react";
import EditProfileTabs from "../../../components/TabComponents/EditProfileTab";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import PageTitle from "../../../components/PageTitle/PageTitle";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import EditPassword from "../../../components/ProfileForm/EditPassword";

const EditProfilePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Edit Profile");
  const tabs = ["Edit Profile", "Change Password", "Settings", "Invoice"];

  return (
    <UserLayout>
      <div className="mb-16 ">
        <PageTitle
          title="EDIT PROFILE"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        />
        <div className="sm:px-32 px-12 max-w-8xl mx-auto flex-wrap sm:flex mb-10 flex gap-4  ">
          <div className="bg-slate-300 w-[80px] max-sm:w-[50px] max-sm:h-[50px] h-[80px]  rounded-full">
            <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className="object-cover w-[80px] max-sm:w-[50px] max-sm:h-[50px] h-[80px] rounded-full"/>
          </div>
          <div className=" inline-flex items-center text-xs">
            <p className=" px-3 py-2 rounded-full ring-1 text-slate-800 font-medium ring-gray-300">
              Upload new picture
            </p>
          </div>
          <div className=" inline-flex items-center text-xs">
            <p className=" px-3 py-2 rounded-full ring-1 bg-gray-300 text-slate-800 font-medium ring-gray-300">
              Delete
            </p>
          </div>
        </div>
        <div className="px-10 max-w-8xl mx-auto  sm:flex  ">
          <EditProfileTabs
            options={tabs}
            selected={selectedTab}
            onSelect={setSelectedTab}
          />
          <div className="max-sm:mt-6  p-3 w-full">
            {selectedTab === "Edit Profile" && <div><ProfileForm/></div>}
            {selectedTab === "Change Password" && <div><EditPassword/></div>}
            {selectedTab === "Settings" && <div>Settings Content</div>}
            {selectedTab === "Invoice" && <div>Invoice Content</div>}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default EditProfilePage;
