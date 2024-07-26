import React from "react";

interface StatisticProps {
  stats: {
    value: string;
    label: string;
  }[];
}

const Statistic: React.FC<StatisticProps> = ({ stats }) => {
  return (
    <div className="px-4 max-sm:hidden py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-2xl md:px-24 lg:px-8 lg:py-5">
      <div className="grid row-gap-8 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="text-center max-sm:py-2">
            <h6 className="text-5xl font-bold text-gray-400">
              {stat.value}
            </h6>
            <p className="font-bold text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistic;
