import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PredictionBarChart = ({ data }) => {
  return (
    <div className="bg-white max-md:py-5 p-0 md:p-1 xl:p-3 2xl:p-5 w-full h-full rounded-lg min-[2200px]:text-2xl 2xl:text-xl text-sm max-[500px]:text-xs max-sm:h-full font-medium shadow font-OpenSans dark:bg-[#2c2c2c] dark:text-white">
      <h1 className="text-center font-bold text-xl mb-4">Next Week Predictions Bar Chart</h1>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toFixed(2)} units`} />
            <Bar dataKey="predicted_units" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">No prediction data available</p>
      )}
    </div>
  );
};

export default PredictionBarChart;
