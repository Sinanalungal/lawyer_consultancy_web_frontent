import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout/AdminLayout';
import AdminPageTitle from '../../../components/PageTitle/AdminPageTitle';
import { Bar, Pie } from 'react-chartjs-2';
import { FetchTheUserAndLawyerGrowth } from '../../../services/Dashboard';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface DashboardData {
  total_users: number;
  total_lawyers: number;
  months: string[];
  user_growth: number[];
  lawyer_growth: number[];
  top_lawyers: { scheduling__lawyer_profile__user__full_name: string; completed_sessions: number }[];
  total_revenue:number
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const UserGrowthFetch = async () => {
      try {
        const response = await FetchTheUserAndLawyerGrowth();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    }
    UserGrowthFetch();
  }, []);

  const chartData = {
    labels: data?.months.map(month => month.slice(0, 3)),
    datasets: [
      {
        label: 'Users',
        data: data?.user_growth,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Lawyers',
        data: data?.lawyer_growth,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        ticks: {
          maxRotation: 0, 
          autoSkip: true,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Growth',
        },
      },
    },
  };

  const pieChartData = {
    labels: data?.top_lawyers.map(lawyer => lawyer.scheduling__lawyer_profile__user__full_name),
    datasets: [
      {
        label: 'Completed Sessions',
        data: data?.top_lawyers.map(lawyer => lawyer.completed_sessions),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <AdminLayout selected='1'>
      <AdminPageTitle
        title='Dashboard'
        description='Overview of growth of your website is in here.'
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <div className=" p-6 border border-gray-300 hover:border-gray-200 rounded-lg hover:bg-slate-600 hover:text-white text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h3 className="text-xl font-semibold ">Total Users</h3>
          <p className="text-3xl mt-4 font-bold ">{data?.total_users}</p>
        </div>
        <div className=" p-6 border border-gray-300 hover:border-gray-200 hover:bg-slate-600 hover:text-white rounded-lg  text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h3 className="text-xl font-semibold ">Total Lawyers</h3>
          <p className="text-3xl mt-4 font-bold ">{data?.total_lawyers}</p>
        </div>
        <div className=" p-6 border border-gray-300 hover:border-gray-200 hover:bg-slate-600 hover:text-white  rounded-lg  text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h3 className="text-xl font-semibold ">Total Revenue</h3>
          <p className="text-3xl mt-4 font-bold ">₹{data?.total_revenue}</p>
        </div>
      </div>
      <div className='xl:flex gap-2 space-y-2 '>
        <div className="bg-white lg:p-6 p-3  rounded-lg shadow-md xl:w-[50%] overflow-x-scroll no-scrollbar">
          <h1 className='font-bold text-center'><i>User Growth</i></h1>
          <Bar data={chartData} options={chartOptions} className='min-w-[400px] min-h-[300px]' />
        </div>
        <div className="bg-white  lg:p-6 p-3 rounded-lg shadow-md xl:w-[50%] overflow-x-scroll no-scrollbar max-h-[400px]">
  <h1 className='font-bold pl-3 my-3 text-center'><i>Top Lawyers by Completed Sessions</i></h1>
  <div className="w-[300px] h-[300px] mx-auto">
    <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
  </div>
</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
