/* import React, { useState } from "react";
import { format } from "date-fns";
import DailyPowerGraph from "../components/graphs/DailyPowerGraph";
import DailyEnergyGraph from "../components/graphs/DailyEnergyGraph";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeContext";
import { dark, green_fusion, light } from "../constants";
import DailyKvaGraph from "../components/graphs/DailyKvaGraph";

const DatewiseGraphs = () => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <section className="h-fit flex md:flex-row flex-col bg-[#F1F4FC] dark:bg-[#1e1e1e] ">
        <Sidebar />
        <section className="w-full">
          <header className="justify-between flex items-center p-4 mx-2">
          <h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
        Green Fusion IoT Solutions<img src={green_fusion} className="w-20" alt="" />
        </h1>
            <span className="flex flex-row justify-center items-center md:gap-4 gap-2">
              <img
                className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
                src={theme === "light" ? dark : light}
                alt="add"
                onClick={toggleTheme}
              />
              <p className="md:text-sm 2xl:text-2xl text-xs text-center text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
                <input
                  className="bg-white rounded-sm shadow dark:bg-[#2c2c2c] dark:drop-shadow-2xl"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </p>
            </span>
          </header>
          <section className="md:mx-5 mx-2 my-2 flex flex-col gap-4">
            <DailyPowerGraph date={date} />
            <DailyEnergyGraph date={date} />
            <DailyKvaGraph date={date} />
          </section>
        </section>
      </section>
    </div>
  );
};

export default DatewiseGraphs;
 */

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import DailyPowerGraph from "../components/graphs/DailyPowerGraph";
import DailyEnergyGraph from "../components/graphs/DailyEnergyGraph";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeContext";
import { dark, green_fusion, light } from "../constants";
import DailyKvaGraph from "../components/graphs/DailyKvaGraph";
import { API_URL2 } from "../data/api";
import { Link } from "react-router-dom";

const DatewiseGraphs = () => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [graphData, setGraphData] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchGraphData = async (selectedDate) => {
    try {
      const response = await axios.get(
        `${API_URL2}/daywise-graph/${selectedDate}`
      );
      const formattedData = response.data.map((entry) => ({
        timestamp: new Date(entry.timestamp).getTime(),
        Total_KVA_meter:
          parseFloat(entry.Total_KVA_meter_6) +
          parseFloat(entry.Total_KVA_meter_108) +
          parseFloat(entry.Total_KVA_meter_201) +
          parseFloat(entry.Total_KVA_meter_227),
        Total_KW_meter:
          parseFloat(entry.Total_KW_meter_6) +
          parseFloat(entry.Total_KW_meter_108) +
          parseFloat(entry.Total_KW_meter_201) +
          parseFloat(entry.Total_KW_meter_227),
        Total_Energy_meter:
          parseFloat(entry.TotalNet_KWH_meter_6) +
          parseFloat(entry.TotalNet_KWH_meter_108) +
          parseFloat(entry.TotalNet_KWH_meter_201) +
          parseFloat(entry.TotalNet_KWH_meter_227),
      }));
      setGraphData(formattedData);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  useEffect(() => {
    fetchGraphData(date); // Fetch data initially and on date change
  }, [date]);

  return (
    <div>
      <section className="h-fit flex md:flex-row flex-col bg-[#F1F4FC] dark:bg-[#1e1e1e]">
        <Sidebar />
        <section className="w-full">
          <header className="justify-between flex items-center p-4 mx-2">
            <Link to='/'><h1 className="md:text-2xl 2xl:text-5xl text-xl p-4 flex md:gap-3 font-Audiowide font-bold dark:text-[#e4e2e2]">
              Green Fusion IoT Solutions
              <img src={green_fusion} className="w-20" alt="" />
            </h1></Link>
            <span className="flex flex-row justify-center items-center md:gap-4 gap-2">
              <img
                className="w-[30px] h-[30px] cursor-pointer 2xl:w-[42px] 2xl:h-[42px]"
                src={theme === "light" ? dark : light}
                alt="add"
                onClick={toggleTheme}
              />
              <p className="md:text-sm 2xl:text-2xl text-xs text-center text-gray-500 font-Audiowide font-medium dark:text-[#eae8e8]">
                <input
                  className="bg-white rounded-sm shadow dark:bg-[#2c2c2c] dark:drop-shadow-2xl"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </p>
            </span>
          </header>
          <section className="md:mx-5 mx-2 my-2 flex flex-col gap-4">
            {graphData && (
              <>
                <DailyPowerGraph date={date} data={graphData} />
                <DailyEnergyGraph date={date} data={graphData} />
                <DailyKvaGraph date={date} data={graphData} />
              </>
            )}
          </section>
        </section>
      </section>
    </div>
  );
};

export default DatewiseGraphs;
