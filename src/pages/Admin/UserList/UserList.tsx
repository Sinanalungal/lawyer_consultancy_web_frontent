import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import AdminPageTitle from '../../../components/PageTitle/AdminPageTitle';
import ItemTable from '../../../components/Table/ItemTable';

const UserList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [pageNum, setPageNum] = useState(1);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'image', label: 'Image' },
    { key: 'email', label: 'Email' },
  ];

  const data = [
    { id: 1, image: <div className='flex items-center gap-2'><img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"  className='w-12 h-12 object-cover' alt="" /><p>Alice</p></div>, email: 'alice@example.com' },
    { id: 2, image: <div className='flex items-center gap-2'><img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"  className='w-12 h-12 object-cover' alt="" /><p>Bob</p></div> , email: 'bob@example.com' },
  
  ];

  const totalItems = data.length; // Assuming you have a way to get the total number of items

  const itemsPerPage = 10;

  const handleNextPage = () => {
    if (pageNum * itemsPerPage < totalItems) {
      setPageNum(pageNum + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };
  return (
    <AdminLayout selected='3'>
      <AdminPageTitle title='Users' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s,'/>
      <ItemTable
        columns={columns}
        data={data}
        itemsPerPage={itemsPerPage}
        search={search}
        setSearch={setSearch}
        nextButton={handleNextPage}
        previousButton={handlePreviousPage}
        pageNum={pageNum}
        total={totalItems}
      />
    
    </AdminLayout>
  );
};

export default UserList;
