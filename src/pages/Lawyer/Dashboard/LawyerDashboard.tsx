import React, { useEffect, useState } from 'react';
import AdminPageTitle from '../../../components/PageTitle/AdminPageTitle';
import { Bar } from 'react-chartjs-2';
import { LawyerDashboardFunctionalities } from '../../../services/Dashboard';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Briefcase, Calendar, DollarSign } from 'lucide-react';

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
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const caseChartData = {
    labels: data?.months,
    datasets: [
      {
        label: 'Completed Cases',
        data: data?.case_count,
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
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
    <div className="bg-gray-100 min-h-screen">
      <AdminPageTitle
        title="Lawyer Dashboard"
        description="Overview of your performance and growth."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Completed Cases</h3>
              <Briefcase className="text-blue-500 w-8 h-8" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mt-4">{data?.total_completed_cases}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Completed Sessions</h3>
              <Calendar className="text-green-500 w-8 h-8" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-4">{data?.total_completed_sessions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Total Revenue</h3>
              <DollarSign className="text-yellow-500 w-8 h-8" />
            </div>
            <p className="text-3xl font-bold text-yellow-600 mt-4">₹{data?.total_revenue}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Completed Sessions</h2>
            <div className="overflow-x-auto">
              <Bar data={sessionChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Completed Cases</h2>
            <div className="overflow-x-auto">
              <Bar data={caseChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;