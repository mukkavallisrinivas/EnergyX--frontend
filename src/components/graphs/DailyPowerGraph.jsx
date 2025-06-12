/* import React, { useEffect, useState } from "react";
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
import { format, startOfDay, endOfDay, addHours } from "date-fns";
import { useTheme } from "../ThemeContext";

const DailyPowerGraph = ({ date }) => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  const generateRandomDataForDate = (date) => {
    const generatedData = [];
    let currentTime = startOfDay(new Date(date)); // Start of the selected date
    const endTime = endOfDay(new Date(date)); // End of the selected date

    while (currentTime <= endTime) {
      generatedData.push({
        timestamp: currentTime.getTime(),
        Total_KVA_meter_1: Math.floor(Math.random() * 5) + 70.4, // Random value between 700 and 850
      });
      currentTime = addHours(currentTime, 1); // Increment by 1 hour
    }

    return generatedData;
  };

  useEffect(() => {
    const randomData = generateRandomDataForDate(date);
    setData(randomData); // Set the generated data for the given date
  }, [date]);

  // Function to generate timestamps for every hour
  const generateTimeTicks = () => {
    const ticks = [];
    let currentTime = startOfDay(new Date(date));
    const endTime = endOfDay(new Date(date));
    while (currentTime <= endTime) {
      ticks.push(currentTime.getTime()); // Convert to milliseconds for recharts
      currentTime = addHours(currentTime, 1);
    }
    return ticks;
  };

  return (
    <div className="bg-white max-md:py-5 p-0 md:p-1 xl:p-3 2xl:p-5 w-full h-full rounded-lg min-[2200px]:text-2xl 2xl:text-xl text-sm max-[500px]:text-xs max-sm:h-full font-medium shadow font-OpenSans dark:bg-[#2c2c2c]">
      <h2 className="p-2 m-2 font-semibold text-lg font-Montserrat dark:text-[#e4e2e2]">
        Real-Time Power vs. Time ({format(new Date(date), "yyyy-MM-dd")})
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
            tick={{ fill: theme == "light" ? "#000" : "#fff" }}
          />
          <YAxis
            tick={{ fill: theme == "light" ? "#000" : "#fff" }}
            className="2xl:text-xl text-sm max-[500px]:text-xs font-medium"
          />
          <Tooltip
            labelFormatter={(label) => format(new Date(label), "HH:mm")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total_KVA_meter_1"
            stroke="#8884d8"
            name="Power"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyPowerGraph; */

/* import React, { useEffect, useState } from "react";
import axios from "axios";
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

const DailyKvaGraph = ({ date }) => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  const fetchPowerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api1/daywise-graph/${date}`
      );
      const formattedData = response.data.map((entry) => ({
        timestamp: new Date(entry.timestamp).getTime(), // Convert UTC ISODate to milliseconds
        Total_KVA_meter: parseFloat(entry.Total_KVA_meter_70) + parseFloat(entry.Total_KVA_meter_40) + parseFloat(entry.Total_KVA_meter_69) + parseFloat(entry.Total_KVA_meter_41),
      }));
      console.log(formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching power data:", error);
    }
  };

  useEffect(() => {
    fetchPowerData(date); // Fetch data when the component mounts or date changes
    const intervalId = setInterval(() => fetchPowerData(date), 30000); // Refresh data every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [date]);

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
        Real-Time Power vs. Time (12 AM - 11:59 PM)
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
            dataKey="Total_KVA_meter"
            stroke="#8884d8"
            name="Kva"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyKvaGraph; */

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

const DailyPowerGraph = ({ date, data }) => {
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
        Real-Time Power vs. Time (12 AM - 11:59 PM)
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
            dataKey="Total_KW_meter"
            stroke="#8884d8"
            name="Power"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyPowerGraph;
