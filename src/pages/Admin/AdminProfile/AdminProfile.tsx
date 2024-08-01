import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import ProfileSection from '../../../components/ProfileSection/ProfileSection';
import Tab from '../../../components/TabComponents/Tab';
import EditPassword from '../../../components/ProfileForm/EditPassword';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';
import EditProfileTabs from '../../../components/TabComponents/EditProfileTab';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { RootState, useAppSelector } from '../../../redux/store';

const AdminProfile: React.FC = () => {
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const [selectedTab, setSelectedTab] = useState<string>("Edit Profile");
  const tabs = ["Edit Profile", "Change Password", "Settings", "Invoice"];
  return (
    <AdminLayout selected='1'>
      
      {/* ------------------------------------- */}
      <div className="w-full  min-h-screen">
        
      <div className="mb-16 ">
        
        {/* <PageTitle
          title="EDIT PROFILE"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        /> */}
        <div className='  sm:px-16 flex-wrap sm:flex mb-3  py-2 '>
                <h1 className="w-full text-center pb-1 max-[400px]:text-2xl  text-gray-700 font-semibold text-3xl">
              Profile
            </h1>
            <p className="mb-6 flex justify-center w-full text-sm max-sm:text-xs text-gray-600">
              Here's an overview of your monthly transactions.
            </p>
          </div>
        <div className="  sm:px-16  flex-wrap sm:flex mb-10 flex gap-4  ">
          
          <div className="bg-slate-300 w-[80px] max-sm:w-[50px] max-sm:h-[50px] h-[80px]  rounded-full">
            
            {userDetail?.profile_image ? (
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
                className="object-cover w-[80px] max-sm:w-[50px] max-sm:h-[50px] h-[80px] rounded-full"
              />
            ) : (
              <div className="bg-pink-800 w-[80px] max-sm:w-[50px] max-sm:h-[50px] h-[80px]  text-white text-3xl max-sm:text-base font-medium flex items-center justify-center rounded-full">
                {userDetail?.full_name && userDetail?.full_name.length > 0
                  ? userDetail?.full_name[0]
                  : ""}
              </div>
            )}
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
            {selectedTab === "Settings" && <div>Settings Content</div>}
            {selectedTab === "Invoice" && <div>Invoice Content</div>}
          </div>
        </div>
      </div>
        </div>
    
    </AdminLayout>
  );
};

export default AdminProfile;
