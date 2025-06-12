import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PredictionChart1 = () => {
  // Generate mock data for 7 days
  const generateEnergyData = () => {
    const today = new Date();
    const data = [];
    for (let i = 7; i > 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      data.push({
        date: formattedDate,
        actual: Math.floor(Math.random() * (900 - 700 + 1)) + 700, // Random actual values between 700 and 900 kWh
        predicted: Math.floor(Math.random() * (900 - 700 + 1)) + 700, // Random predicted values between 700 and 900 kWh
      });
    }
    return data;
  };

  const energyData = generateEnergyData();

  return (
    <div className="bg-white max-md:py-5 p-0 md:p-1 xl:p-3 2xl:p-5 w-full h-full rounded-lg min-[2200px]:text-2xl 2xl:text-xl text-sm max-[500px]:text-xs max-sm:h-full font-medium shadow font-OpenSans dark:bg-[#2c2c2c]">
      <h1 className="text-center font-bold text-xl mb-4">Predicted vs Consumed Bar Chart</h1>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={energyData}
        className="dark:text-black"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="actual" fill="#82ca9d" name="Consumed Energy (kWh)" />
        <Bar dataKey="predicted" fill="#8884d8" name="Predicted Energy (kWh)" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart1;
