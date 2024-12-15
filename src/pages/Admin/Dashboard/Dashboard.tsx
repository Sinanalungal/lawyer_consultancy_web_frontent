import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import { Bar, Pie } from "react-chartjs-2";
import { FetchTheUserAndLawyerGrowth } from "../../../services/Dashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Users, Scale, DollarSign, DatabaseBackup } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardData {
  total_users: number;
  total_lawyers: number;
  months: string[];
  user_growth: number[];
  lawyer_growth: number[];
  top_lawyers: {
    scheduling__lawyer_profile__user__full_name: string;
    completed_sessions: number;
  }[];
  total_revenue: number;
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
    };
    UserGrowthFetch();
  }, []);

  const chartData = {
    labels: data?.months.map((month) => month.slice(0, 3)),
    datasets: [
      {
        label: "Users",
        data: data?.user_growth,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
      {
        label: "Lawyers",
        data: data?.lawyer_growth,
        backgroundColor: "rgba(249, 115, 22, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
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
          text: "Month",
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Growth",
        },
      },
    },
  };

  const pieChartData = {
    labels: data?.top_lawyers.map(
      (lawyer) => lawyer.scheduling__lawyer_profile__user__full_name
    ),
    datasets: [
      {
        label: "Completed Sessions",
        data: data?.top_lawyers.map((lawyer) => lawyer.completed_sessions),
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)",
          "rgba(249, 115, 22, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(139, 92, 246, 0.6)",
          "rgba(251, 191, 36, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminPageTitle
        title="Dashboard"
        description="Overview of your website's growth and performance."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Users
              </h3>
              <Users className="text-blue-500 w-8 h-8" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mt-4">
              {data?.total_users}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Lawyers
              </h3>
              <Scale className="text-orange-500 w-8 h-8" />
            </div>
            <p className="text-3xl font-bold text-orange-600 mt-4">
              {data?.total_lawyers}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Revenue
              </h3>
              <DollarSign className="text-green-500 w-8 h-8" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-4">
              ₹{data?.total_revenue}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              User Growth
            </h2>
            <div className="overflow-x-auto">
              <Bar
                data={chartData}
                options={chartOptions}
                className="min-w-[400px] min-h-[300px]"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Top Lawyers by Completed Sessions
            </h2>

            {data?.top_lawyers && data.top_lawyers.length > 0 ? (
              <div className="w-full h-[300px] mx-auto">
                <Pie
                  data={pieChartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            ) : (
              <div className="px-6 sm:py-20 whitespace-nowrap text-sm text-gray-500 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <DatabaseBackup className="h-12 w-12 text-gray-400" />
                  <p>No data available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
