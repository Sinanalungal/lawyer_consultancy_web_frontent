import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';

const AdminSubscription: React.FC = () => {
  return (
    <AdminLayout selected='5'>
      {/* ------------------------------------- */}
      <h1 className="w-full pb-1 max-[400px]:text-2xl  text-gray-700 font-semibold text-3xl">
        Subscription
      </h1>
      <p className="mb-6 text-sm max-sm:text-xs text-gray-600">
        Here's an overview of your monthly transactions.
      </p>
      {/* --------------------------------- */}
    
    </AdminLayout>
  );
};

export default AdminSubscription;
