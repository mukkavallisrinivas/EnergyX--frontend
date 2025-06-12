import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, startOfDay, endOfDay, addMinutes } from "date-fns";
import { useTheme } from "../ThemeContext";

const DailyEnergyGraph = ({ date, data }) => {
  const { theme } = useTheme();

  // Function to generate timestamps for every 30 minutes
  const generateTimeTicks = () => {
    const ticks = [];
    let currentTime = startOfDay(new Date(date));
    const endTime = endOfDay(new Date(date));
    while (currentTime <= endTime) {
      ticks.push(currentTime.getTime()); // Convert to milliseconds for Recharts
      currentTime = addMinutes(currentTime, 30);
    }
    return ticks;
  };

  return (
    <div className="bg-white max-md:py-5 p-0 md:p-1 xl:p-3 2xl:p-5 w-full h-full rounded-lg min-[2200px]:text-2xl 2xl:text-xl text-sm max-[500px]:text-xs max-sm:h-full font-medium shadow font-OpenSans dark:bg-[#2c2c2c]">
      <h2 className="p-2 m-2 font-semibold text-lg font-Montserrat dark:text-white">
        Real-Time Energy vs. Time (12 AM - 11:59 PM)
      </h2>
      <ResponsiveContainer
        width="100%"
        height={400}
        className="font-semibold text-lg font-OpenSans"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={[
              startOfDay(new Date(date)).getTime(),
              endOfDay(new Date(date)).getTime(),
            ]}
            tickFormatter={(unixTime) => format(new Date(unixTime), "HH:mm")}
            ticks={generateTimeTicks()}
            className="2xl:text-xl text-sm max-[500px]:text-xs font-medium"
            tick={{ fill: theme === "light" ? "#000" : "#fff" }}
          />
          <YAxis
            tick={{ fill: theme === "light" ? "#000" : "#fff" }}
            className="2xl:text-xl text-sm max-[500px]:text-xs font-medium"
          />
          <Tooltip
            labelFormatter={(label) => format(new Date(label), "HH:mm")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total_Energy_meter"
            stroke="#8884d8"
            name="Energy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyEnergyGraph;
