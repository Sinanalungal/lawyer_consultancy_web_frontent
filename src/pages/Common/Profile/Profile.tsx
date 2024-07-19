// Profile.tsx
import React from 'react';
import UserLayout from '../../../layouts/UserLayout/UserLayout';
import ProfileSection from '../../../components/ProfileSection/ProfileSection';
import Tab from '../../../components/TabComponents/Tab';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <>
    <UserLayout>
      <div className='w-full min-h-screen'>
      <ProfileSection
        name="Emma Smith"
        avatarImage="https://pagedone.io/asset/uploads/1705471668.png"
      />
      <Tab/>
      </div>
      </UserLayout>
    </>
  );
};

export default Profile;

// <div className='flex max-[400px]:flex-col  2xl:container mx-auto min-h-screen'>
//         <div className='bg-slate-50 flex max-md:flex-col max-md:items-center md:justify-center p-4 sm:p-10'>
//           <h2 className="mb-2 text-3xl md:hidden font-semibold text-dark max-sm:text-2xl py-[20px] dark:text-white">
//             PROFILE
//           </h2>
//           <div className='w-[150px] border h-[150px] relative bg-white rounded-lg'>
//             <div className='p-1 bg-gray-500 inline-block rounded-full right-0 text-white absolute -mr-2 -mt-2'>
//               <MdEdit />
//             </div>
//           </div>
//         </div>
//         <div className='max-[400px]:h-[500px] px-10 w-full'>
//           <section className="bg-white py-[20px] md:py-[50px] dark:bg-dark">
//             <div className="mx-auto sm:container max-md:flex max-md:justify-end">
//               <div className="items-center justify-between border-stroke dark:border-dark-3 md:flex">
//                 <div className="w-full max-md:hidden">
//                   <h2 className="mb-2 text-3xl font-semibold text-dark max-sm:text-2xl dark:text-white">
//                     PROFILE
//                   </h2>
//                 </div>
//                 <div className="">
//                   <button className="inline-flex gap-1 items-center bg-slate-700 justify-center whitespace-nowrap rounded bg-primary px-5 py-[7px] text-sm font-medium text-white hover:bg-opacity-90">
//                     <FaUserEdit size={17} /> Edit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <ProfileForm />
//         </div>
//       </div>