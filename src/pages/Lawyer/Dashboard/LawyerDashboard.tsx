import React, { useEffect, useState } from 'react';
import AdminPageTitle from '../../../components/PageTitle/AdminPageTitle';
import { Bar } from 'react-chartjs-2';
import { LawyerDashboardFunctionalities } from '../../../services/Dashboard';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardData {
  total_completed_cases: number;
  total_completed_sessions: number;
  months: string[];
  sessions_count: number[];
  case_count: number[];
  total_revenue: number;
}

const LawyerDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await LawyerDashboardFunctionalities();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardData();
  }, []);

  const sessionChartData = {
    labels: data?.months,
    datasets: [
      {
        label: 'Booked Sessions',
        data: data?.sessions_count,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const caseChartData = {
    labels: data?.months,
    datasets: [
      {
        label: 'Completed Cases',
        data: data?.case_count,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <>
      <AdminPageTitle
        title="Dashboard"
        description="Overview of growth of your website is in here."
      />
      <div className="grid px-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        <div className="p-6 border-2 border-gray-200 hover:border-gray-100 rounded-lg hover:bg-slate-600 hover:text-white text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h3 className="text-xl font-semibold"><i>Total Completed Cases</i></h3>
          <p className="text-3xl mt-4 font-bold"><i>{data?.total_completed_cases}</i></p>
        </div>
        <div className="p-6 border-2 border-gray-200 hover:border-gray-100 hover:bg-slate-600 hover:text-white rounded-lg text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h3 className="text-xl font-semibold"><i>Total Completed Sessions</i></h3>
          <p className="text-3xl mt-4 font-bold"><i>{data?.total_completed_sessions}</i></p>
        </div>
        <div className="p-6 border-2 border-gray-200 hover:border-gray-100 hover:bg-slate-600 hover:text-white rounded-lg text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h3 className="text-xl font-semibold"><i>Total Revenue</i></h3>
          <p className="text-3xl mt-4 font-bold"><i>₹{data?.total_revenue}</i></p>
        </div>
      </div>
      <div className="xl:flex max-xl:flex-col">
        <div className="px-2 xl:w-[50%] overflow-x-scroll no-scrollbar gap-6 my-6">
          <h1 className="font-bold pl-3 my-3 text-center"><i>Completed Sessions</i></h1>
          <div className="col-span-2">
            <Bar data={sessionChartData} options={chartOptions} />
          </div>
        </div>
        <div className="px-2 xl:w-[50%] overflow-x-scroll no-scrollbar gap-6 my-6">
          <h1 className="font-bold pl-3 my-3 text-center"><i>Completed Cases</i></h1>
          <div className="col-span-2">
            <Bar data={caseChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerDashboard;
