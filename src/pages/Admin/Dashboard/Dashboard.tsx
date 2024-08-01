// src/components/Dashboard.tsx
import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import AdminPageTitle from '../../../components/PageTitle/AdminPageTitle';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout selected='1'>
      {/* ------------------------------------- */}
      <AdminPageTitle title='Dashboard' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,'/>
      {/* <h1 className="w-full pb-1 max-[400px]:text-2xl  text-gray-700 font-semibold text-3xl">
        Dashboard
      </h1>
      <p className="mb-6 text-sm max-sm:text-xs text-gray-600">Here's an overview of your monthly transactions.</p> */}
      {/* --------------------------------- */}
      <div className="flex flex-wrap gap-x-4 gap-y-8 ">
        <div className="h-56 w-72 rounded-xl bg-slate-200 p-10 shadow-md"></div>
        <div className="h-56 w-72 rounded-xl bg-slate-200 p-10 shadow-md"></div>
        <div className="h-56 w-full rounded-xl bg-slate-200 p-10 shadow-md"></div>
        <div className="h-56 w-full rounded-xl bg-slate-200 p-10 shadow-md"></div>
        <div className="h-56 w-full rounded-xl bg-slate-200 p-10 shadow-md"></div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
